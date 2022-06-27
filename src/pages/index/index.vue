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
    <CategoryTab />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TopicList from './components/TopicList.vue';
import Notice from './components/Notice.vue';
import UniRow from '@dcloudio/uni-ui/lib/uni-row/uni-row.vue';
import UniCol from '@dcloudio/uni-ui/lib/uni-col/uni-col.vue';
import GoodsRanking from './components/GoodsRanking.vue';
import DdqGoods from './components/DdqGoods.vue';
import CategoryTab from './components/CategoryTab.vue';

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
    padding: 0 10rpx 10rpx 10rpx;
  }
}
</style>
