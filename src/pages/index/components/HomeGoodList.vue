<template>
  <!-- 首页商品列表 -->
  <view class="home-good-list" v-if="goodList.length > 0">
    <view class="good-left">
      <HomeGoodItem v-for="goodItem in leftGoodList" :key="goodItem.id" :goodItem="goodItem" />
    </view>
    <view class="good-right">
      <HomeGoodItem v-for="goodItem in rightGoodList" :key="goodItem.id" :goodItem="goodItem" />
    </view>
  </view>
  <view class="home-good-list" v-else-if="isFetching">
    <view class="good-left">
      <HomeGoodItemSketelon v-for="sketelonItem in 5" :key="sketelonItem" />
    </view>
    <view class="good-right">
      <HomeGoodItemSketelon  v-for="sketelonItem in 5" :key="sketelonItem" />
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
import HomeGoodItemSketelon from './Sketelon/HomeGoodItemSketelon.vue';

const props = defineProps({
  goodList: {
    type: Array,
    default: () => [],
  },
  isFetching: {
    type: Boolean,
    default: () => false,
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

// // 加载更多 滚动到底部触发 注意：子组件中使用不生效时，需要在父组件中调用onReachBottom
// onReachBottom(async () => {
//   loadMore();
// })


</script>

<style lang="scss" scoped>
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
