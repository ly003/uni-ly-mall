<template>
  <NavBar class="navbar" fixed statusBar left-icon="left" leftWidth="16px" rightWidth="60px" @clickLeft="goBack">
    <view class="search">
      <input type="text" confirm-type="search" class="search-input" />
      <icon type="clear" class="search-icon" size="16" />
      <view class="search-btn"> 搜索 </view>
    </view>
  </NavBar>

  <view class="search-content">
    <!-- 历史搜索 -->
    <view>
      <HistorySearch />
    </view>
    <!-- 分割线 -->
    <SplitLine />
    <!-- 搜索发现 -->
    <view>
      <SearchDiscover />
    </view>
    <!-- 热搜榜 -->
    <view></view>
    <!-- 联想词 -->
    <view></view>
    <!-- 搜索商品列表 -->
    <view></view>
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

.content {
  background: #f6f6f6;
  min-height: calc(100vh - 44px);
}

</style>
