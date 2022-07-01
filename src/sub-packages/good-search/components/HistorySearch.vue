<template>
  <view class="history-search" v-if="historySearch.length > 0">
    <view class="history-title">
      <view class="title-text"> 历史搜索 </view>
      <view>
        <text class="iconfont" style="color: #666">&#xe645;</text>
      </view>
    </view>
    <view class="history-content">
      <span class="history-word" v-for="word, index in historySearch" :key="index">
        {{ word }}
      </span>
    </view>
  </view>
</template>

<script setup>
defineProps({
  historySearch: {
    type: Array,
    default: () => ['鞋子女', '连衣裙']
  }
});

</script>


<style lang="scss" scoped>
.history-search {
  background: #fff;
  padding: 20rpx;
  .history-title {
    display: flex;
    justify-content: space-between;
    line-height: 48rpx;
    font-size: 28rpx;
    .title-text {
      font-weight: 700;
      color: #333;
    }
  }
  .history-content {
    display: flex;
    flex-flow: wrap;
    overflow: hidden;
    .history-word {
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
