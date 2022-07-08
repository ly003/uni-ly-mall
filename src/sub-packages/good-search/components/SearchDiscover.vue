<template>
  <view class="search-discover" v-if="searchDiscoverList.length > 0">
    <view class="discover-title">
      <view class="discover-text"> 搜索发现 </view>
      <view>
        <text class="iconfont" style="color: #A9A9A9" @click="changeWords">&#xe65d;</text>
      </view>
    </view>
    <view class="discover-content">
      <span class="discover-word" v-for="word, index in searchDiscoverList" :key="index" @click="submitSearch(word)">
        {{ word }}
      </span>
    </view>
  </view>
</template>

<script setup>
defineProps({
  searchDiscoverList: {
    type: Array,
    default: () => []
  }
});

const emits = defineEmits(['change', 'submit'])
const changeWords = () => {
  emits('change')
}

const submitSearch = (word) => {
  emits('submit', word)
}

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
    padding: 0 40rpx 0 0;
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
