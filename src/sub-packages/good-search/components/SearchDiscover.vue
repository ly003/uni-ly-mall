<template>
  <view class="search-discover" v-if="searchDiscoverList.length > 0">
    <view class="discover-title">
      <view class="discover-text"> 搜索发现 </view>
      <view>
        <text class="iconfont" style="color: #666">&#xe65d;</text>
      </view>
    </view>
    <view class="discover-content">
      <span class="discover-word" v-for="word, index in searchDiscoverList" :key="index">
        {{ word }}
      </span>
    </view>
  </view>
</template>

<script setup>
defineProps({
  searchDiscoverList: {
    type: Array,
    default: () => ['螺狮粉', '麻辣香锅']
  }
});

</script>


<style lang="scss" scoped>
.search-discover {
  background: #fff;
  padding: 20rpx;
  .discover-title {
    display: flex;
    justify-content: space-between;
    line-height: 48rpx;
    font-size: 28rpx;
    .discover-text {
      font-weight: 700;
      color: #333;
    }
  }
  .discover-content {
    display: flex;
    flex-flow: wrap;
    overflow: hidden;
    .discover-word {
      color: #565656;
      font-size: 24rpx;
      padding: 8rpx 16rpx;
      border-radius: 24rpx;
      max-width: 80%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      height: 32rpx;
      background: #f6f6f6;
      margin: 10rpx;
    }
  }
}
</style>
