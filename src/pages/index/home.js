import request from '@/utils/request';
import { ref, unref, watch } from 'vue';

export const useGoodList = () => {
  const pageId = ref(1);
  const pageSize = ref(10);
  const cid = ref(0);
  const goodList = ref([]);

  const fetchGoodList = async () => {
    uni.showLoading();
    try {
      const { data } = await request({
        url: '/api/goods/get-goods-list',
        data: {
          version: 'v1.2.4',
          pageId: pageId.value,
          pageSize: pageSize.value,
          cids: cid.value > 0 ? cid.value : undefined,
        }
      });
      uni.hideLoading()

      if(pageId.value === 1) {
        goodList.value = data.list;
      } else if(pageId.value > 1 && data.list.length > 0) {
        goodList.value.push(...data.list);
      }

    } catch (error) {
      console.log(error);
    }
  }

  // 监听pageId变化及cid变化
  watch(
    () => [unref(pageId), unref(cid)],
    () => fetchGoodList(),
    { deep: true }
  )
  fetchGoodList();

  // 加载更多
  const loadMore = () => {
    pageId.value++;
  }

  // 切换分类
  const changeCategory = index => {
    if(cid.value !== index) {
      cid.value = index;
      goodList.value = [];
      pageId.value = 1;
    }
  }

  return {
    cid,
    goodList,
    changeCategory,
    loadMore,
  }
}
