<template>
  <view>
    <HomeNavBar />
    <view class="content">
      <!-- 精选专题 -->
      <TopicList />
      <!-- 优惠线报滚动通知 -->
      <Notice />
      <!--UniRow和UniCol组件在微信小程序中不生效 <UniRow class="home-uni-row">
        <UniCol :span="12">
          <GoodsRanking />
        </UniCol>
        <UniCol :span="12">
          <DdqGoods />
        </UniCol>
      </UniRow> -->
      <view class="home-row">
        <view class="home-col-left">
          <GoodsRanking />
        </view>
        <view class="home-col-right">
          <DdqGoods />
        </view>
      </view>

      <CategoryTab :cid="cid" @change="changeCategory" />
      <HomeGoodList :goodList="goodList" :isFetching="isFetching" />
      <view class="home-topbtn" @click="gotoTop" :style="{ display: showBtn ? 'block' : 'none' }">
        <view class="home-topbtn-text">
          <view>
            <text class="iconfont" style="font-size: 24rpx">&#xe646;</text>
          </view>
          <text> 顶部 </text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onReachBottom, onPageScroll } from '@dcloudio/uni-app';
import TopicList from './components/TopicList.vue';
import Notice from './components/Notice.vue';
import UniRow from '@dcloudio/uni-ui/lib/uni-row/uni-row.vue'; // 微信小程序中不生效
import UniCol from '@dcloudio/uni-ui/lib/uni-col/uni-col.vue'; // 微信小程序中不生效
import GoodsRanking from './components/GoodsRanking.vue';
import DdqGoods from './components/DdqGoods.vue';
import CategoryTab from './components/CategoryTab.vue';
import HomeGoodList from './components/HomeGoodList.vue';
import HomeNavBar from './components/HomeNavBar.vue';

import { useGoodList } from './home.js';

const { cid, goodList, changeCategory, loadMore, isFetching } = useGoodList();

onReachBottom(() => {
  // 加载更多
  loadMore();
});

const showBtn = ref(false);

const gotoTop = async () => {
  uni.pageScrollTo({
    scrollTop: 0,
    duration: 300,
  });
};

// 根据距离顶部距离是否显示回到顶部按钮
onPageScroll((event) => {
  if (event.scrollTop > 350) {
    //当距离大于400时显示回到顶部按钮
    showBtn.value = true;
  } else {
    showBtn.value = false;
  }
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
  .home-row {
    background: #f7f7f7;
    box-sizing: border-box;
    display: flex;
    width: 100vw;
    justify-content: center;
    padding: 0 10rpx 15rpx 10rpx;
    .home-col-left {
      box-sizing: border-box;
      display: block;
      width: 50%;
    }
    .home-col-right {
      box-sizing: border-box;
      display: block;
      width: 50%;
    }
  }
  .home-topbtn {
    position: fixed;
    right: 20rpx;
    bottom: 200rpx;
    width: 120rpx;
    z-index: 990;

    .home-topbtn-text {
      margin: 0 auto;
      width: 80rpx;
      height: 80rpx;
      background: #fff;
      box-shadow: 0 4rpx 16rpx 0 rgb(0 0 0 / 18%);
      //display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 200rpx;
      text-align: center;
      font-size: 22rpx;
    }
  }
}
</style>
