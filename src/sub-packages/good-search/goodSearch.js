import { computed, isRef, reactive, ref, unref, watch, watchEffect } from 'vue';
import request from '../../utils/request';
import { debounce, isEmpty } from 'lodash';

export const useHistorySearch = () => {
  const historySearch = ref(uni.getStorageSync('historySearch') || []);

  // 保存搜索历史
  const saveHistorySearch = payload => {
    if(payload) {
      uni.getStorage({
        key: 'historySearch',
        success: res => {
          let history = res.data || [];
          if (history.includes(payload)) {
            return;
          }
          history.unshift(payload); // 从头部插入数据
          uni.setStorage({
            key: 'historySearch',
            data: history,
          });
        },
        fail: () => {
          uni.setStorage({
            key: 'historySearch',
            data: [payload],
          });
        },
        complete: () => {
          // 更新搜索历史，触发视图更新
          historySearch.value = uni.getStorageSync('historySearch') || [];
        }
      })
    }
  };

  // 清空历史记录
  const clearHistorySearch = () => {
    uni.removeStorage({
      key: 'historySearch',
      success: () => {
        // 更新搜索历史，触发视图更新
        historySearch.value = [];
      }
    })
  }

  return {historySearch, saveHistorySearch, clearHistorySearch};
}

export const useSearchDiscover = () => {
  const searchDiscoverList = ref([]);
  const page = ref(1);
  const pageSize = ref(10);

  const fetchHotWords = async () => {
    searchDiscoverList.value = [];
    try {
      const { data } = await request({
        url: `/api/category/get-top100`,
        data: {
          version: '1.0.1',
        },
      });
      return data.hotWords;
    } catch (e) {
      return [];
    }
  };

  const init = async () => {
    searchDiscoverList.value = await fetchHotWords();
  }

  init();

  // 刷新热搜词
  const changeHotWords = () => {
    page.value ++;
  }

  // 获取当前页面的热搜词
  const presentHotWords = computed(() => {
    let start = (page.value - 1) * pageSize.value;
    let end = page.value * pageSize.value;
    // 判断是否超过最大页数
    if (start >= searchDiscoverList.value.length) {
      page.value = 1;
      start = 0;
      end = pageSize.value;
    } else if (end > searchDiscoverList.value.length && start < searchDiscoverList.value.length) {
      end = searchDiscoverList.value.length;
    }
    return searchDiscoverList.value.slice(start, end);
  })

  return {presentHotWords, changeHotWords};
}

export const useSearchSuggestion = keywords => {
  const searchSuggestionList = ref([]);

  const fetchSuggestion = async keywords => {
    searchSuggestionList.value = [];
    const keyWordValue = unref(keywords);
    // 判断是否为空，为空不查询
    if (isEmpty(keyWordValue)) {
      return;
    }

    const { data } = await request({
      url: `/api/goods/search-suggestion`,
      data: {
        version: 'v1.0.2',
        keyWords: keyWordValue,
        type: 3,
      },
    });

    searchSuggestionList.value = data;
  }

  if (isRef(keywords)) {
    watch(keywords, debounce(fetchSuggestion, 200));
  } else {
    fetchSuggestion(keywords);
  }

  return {searchSuggestionList};
}

export const useSuperSearch = (keywords, sort) => {
  const searchGoodList = ref([]);


  const fetchGoods = async (keywords, sort) => {
    searchGoodList.value = [];
    const keyWordValue = unref(keywords);
    const sortValue = unref(sort);
    // 判断是否为空，为空不查询
    if (isEmpty(keyWordValue)) {
      return;
    }

    try {
      const { data } = await request({
        url: `/api/goods/list-super-goods`,
        data: {
          version: 'v1.3.0',
          keyWords: keyWordValue,
          sort: sortValue,
          type: 0,
          pageId: 1,
          pageSize: 100,
        },
      });
      if(data && data.list && data.list.length > 0) {
        searchGoodList.value = data.list;
      } else {
        searchGoodList.value = [];
      }
    } catch (e) {
      searchGoodList.value = [];
    }
  }

  if (isRef(sort)) {
    watchEffect(() => {
      fetchGoods(keywords, sort);
    })
  } else {
    fetchGoods(keywords, sort);
  }

  return {searchGoodList};
}
