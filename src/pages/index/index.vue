<template>
  <view class="content">
    <TopicList />
    <Notice />
    <UniRow class="home-uni-row">
      <UniCol :span="12">
        <GoodsRanking />
      </UniCol>
      <UniCol :span="12">
        <DdqGoods />
      </UniCol>
    </UniRow>
    <CategoryTab :cid="cid" @change="changeCategory" />
    <HomeGoodList :goodList="goodList" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onReachBottom } from '@dcloudio/uni-app';
import TopicList from './components/TopicList.vue';
import Notice from './components/Notice.vue';
import UniRow from '@dcloudio/uni-ui/lib/uni-row/uni-row.vue';
import UniCol from '@dcloudio/uni-ui/lib/uni-col/uni-col.vue';
import GoodsRanking from './components/GoodsRanking.vue';
import DdqGoods from './components/DdqGoods.vue';
import CategoryTab from './components/CategoryTab.vue';
import HomeGoodList from './components/HomeGoodList.vue';

import { useGoodList } from './home.js';

const { cid, goodList, changeCategory, loadMore } = useGoodList();

onReachBottom(() => {
  // 加载更多
  loadMore();
});

</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .home-uni-row {
    background: #f7f7f7;
    display: block;
    width: 750rpx;
    padding: 0 10rpx 15rpx 10rpx;
  }
}
</style>
