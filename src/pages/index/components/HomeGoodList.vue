<template>
  <!-- 首页商品列表 -->
  <view></view>
  <view class="home-good-list" v-if="goodList.length > 0">
    <view class="good-left">
      <HomeGoodItem v-for="goodItem in leftGoodList" :key="goodItem.id" :goodItem="goodItem" />
    </view>
    <view class="good-right">
      <HomeGoodItem v-for="goodItem in rightGoodList" :key="goodItem.id" :goodItem="goodItem" />
    </view>
  </view>
  <view v-else>
    暂无数据
  </view>
</template>

<script>
export default {
  name: 'HomeGoodList',
}
</script>


<script setup>
//import { onReachBottom } from '@dcloudio/uni-app';
import { computed } from 'vue';
// import { useGoodList } from '../home.js';
import HomeGoodItem from './HomeGoodItem.vue';
const props = defineProps({
  goodList: {
    type: Array,
    default: () => [],
  },
});

// 左边商品
const leftGoodList = computed(() => {
  return props.goodList.filter((_, index) => index % 2 == 0);
});
// 右边商品
const rightGoodList = computed(() => {
  return props.goodList.filter((_, index) => index % 2 == 1);
});

// // 加载更多
// onReachBottom(async () => {
//   loadMore();
// })


</script>

<style scoped lang="scss">
.home-good-list {
  background: #f7f7f7;
  box-sizing: border-box;
  display: flex;
  width: 100vw;
  justify-content: center;
  padding: 10rpx;
  .good-left {
    box-sizing: border-box;
    display: block;
    width: 50%;
  }
  .good-right {
    box-sizing: border-box;
    display: block;
    width: 50%;
  }
}
</style>
