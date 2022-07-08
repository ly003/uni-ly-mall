<template>
  <NavBar class="navbar" fixed statusBar left-icon="left" leftWidth="16px" rightWidth="60px" @clickLeft="goBack">
    <view class="search">
      <input type="text" confirm-type="search" v-model="inputValue" @focus="onFocus" class="search-input" />
      <icon type="clear" class="search-icon" size="16" @click="onClear" />
      <view class="search-btn" @click="onSearch"> 搜索 </view>
    </view>
  </NavBar>

  <view class="search-content">
    <!-- 历史搜索 -->
    <view v-if="!inputValue">
      <HistorySearch @submit="submitSearch" :historySearch="historySearch" @clear="clearHistorySearch" />
    </view>
    <!-- 分割线 -->
    <SplitLine  v-if="!inputValue" />
    <!-- 搜索发现 -->
    <view  v-if="!inputValue">
      <SearchDiscover @submit="submitSearch" :searchDiscoverList="presentHotWords" @change="changeHotWords" />
    </view>
    <!-- 热搜榜 -->
    <view  v-if="!inputValue"></view>
    <!-- 联想词 -->
    <view v-if="showAssociate && inputValue">
      <view class="search-associate" v-for="words,index in searchSuggestionList" :key="index">
        <view class="associate-list" @click="submitSearch(words.kw)">
          <text class="search-associate-text">{{ words.kw }}</text>
        </view>
        <SplitLine class="search-line" />
      </view>
    </view>
    <!-- 搜索商品列表 -->
    <view v-if="!showAssociate">
      <SearchGoodFilter :sort="sorter" @sort="changeSort" />
      <view class="search-good-list">
        <SearchGoodItem v-for="goodItem,index in searchGoodList" :key="index" :goodItem="goodItem" />
      </view>
    </view>
    <!-- 品牌推荐 -->
    <view></view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import NavBar from '@dcloudio/uni-ui/lib/uni-nav-bar/uni-nav-bar.vue';
import HistorySearch from './components/HistorySearch.vue';
import SearchDiscover from './components/SearchDiscover.vue';
import SplitLine from '../../components/SplitLine.vue';
import SearchGoodFilter from './components/SearchGoodFilter.vue';
import SearchGoodItem from './components/SearchGoodItem.vue';
import { useHistorySearch, useSearchDiscover, useSearchSuggestion, useSuperSearch } from './goodSearch.js';

// 搜索框输入值
const inputValue = ref('');

// 是否显示联想词
const showAssociate = ref(true);

// 排序方式
const sorter = ref(0);

const { historySearch, saveHistorySearch, clearHistorySearch } = useHistorySearch();

const { presentHotWords, changeHotWords } = useSearchDiscover();

const { searchSuggestionList } = useSearchSuggestion(inputValue);

const { searchGoodList } = useSuperSearch(inputValue, sorter);

const onFocus = () => {
  showAssociate.value = true;
  console.log('onFocus')
};

const onClear = () => {
  console.log('onClear')
  inputValue.value = '';
  showAssociate.value = true;
};

// 触发搜索
const onSearch = () => {
  console.log('onSearch')
  showAssociate.value = false;
  saveHistorySearch(inputValue.value);
};

const submitSearch = (word) => {
  inputValue.value = word;
  onSearch();
  console.log('submitSearch')
};

const changeSort = (sort) => {
  sorter.value = sort;
  console.log('changeSort')
};

// 返回
const goBack = () => {
  uni.navigateBack({
    delta: 1,
  });
};

</script>

<style lang="scss" scoped>
.navbar {

  .search {
    border: 1px solid #fe3738;
    width: 100%;
    height: 50rpx;
    background: #fff;
    border-radius: 30rpx;
    margin: 16rpx;
    display: flex;
    padding: 4rpx 10rpx 4rpx 20rpx;

    .search-input {
      font-size: 28rpx;
      margin-top: 4rpx;
      width: 280rpx;
    }

    .search-icon {
      margin: 8rpx 16rpx;
    }

    .search-btn {
      background: #fe3738;
      color: #fff;
      border-radius: 30rpx;
      width: 100rpx;
      padding: 8rpx;
      align-items: center;
      display: flex;
      justify-content: center;
    }
  }
}

.search-content {
  background: #f6f6f6;
  min-height: calc(100vh - 44px);
  .search-associate {
    background: #fff;
    padding-top: 20rpx;
    .associate-list {
      padding: 0 30rpx 30rpx 30rpx;
      .search-associate-text {
        font-size: 28rpx;
        color: #333;
      }
    }
    .search-line {
      margin: 0 30rpx;
    }
  }
}

.search-good-list {
  padding-top: 16rpx;
}

</style>
