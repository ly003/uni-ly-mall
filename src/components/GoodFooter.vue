<template>
  <view class="footer">
    <view class="footer-left">
      <text class="iconfont" style="font-size: 44rpx; color: #888">&#xe612;</text>
      <p class="share">分享</p>
    </view>
    <view class="footer-right" @click="copyToClipboard">
      <text class="actuel-price">￥{{ good.actualPrice }}</text>
      <text class="origin-price">￥{{ good.originalPrice }}</text>
      <p class="buy">复制淘口令</p>
    </view>
  </view>
</template>
<script>
export default {
  name: 'GoodFooter',
};
</script>

<script setup>
import { ref } from 'vue';
import request from '../utils/request';

const props = defineProps({
  good: {
    type: Object,
    default: () => { },
  },
});

const gotoExternalUrl = () => {
  uni.navigateTo({
    url: `/sub-packages/external/index?externalUrl=${encodeURI(props.good.couponLink)}`,
  });
};

const getPrivilegeLink = () => {
  return request({
    url: `/api/tb-service/get-privilege-link`,
    data: {
      version: 'v1.3.1',
      goodsId: props.good.goodsId,
    },
  });
};

const copyToClipboard = async () => {
  const { data } = await getPrivilegeLink();
  console.log(data.tpwd);
  uni.setClipboardData({
    data: data.tpwd,
    showToast: false,
    success: () => {
      uni.showToast({
        title: "淘口令已复制到剪切板",
        icon: "success",
        duration: 2000
      })
    }
  });
};
</script>
<style lang="scss" scoped>
.footer {
  min-width: 750rpx;
  display: flex;
  justify-content: space-between;
  padding: 14rpx 20rpx 14rpx 40rpx;
  box-sizing: border-box;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  border-top: 1rpx solid #DCDCDC;
  z-index: 10;

  .footer-left {
    //display: flex;
    justify-content: center;
    align-items: center;

    .left-icon {
      color: rgb(136, 136, 136);
      width: 34rpx;
    }

    .share {
      color: #888;
      font-size: 24rpx;
    }
  }

  .footer-right {
    height: 80rpx;
    background-image: linear-gradient(270deg, #fe3c35, #ff1f4c);
    text-align: center;
    color: #fff;
    width: 500rpx;
    border-radius: 80rpx;

    .actuel-price {
      font-size: 30rpx;
    }

    .origin-price {
      font-size: 22rpx;
      color: rgba(255, 255, 255, 0.6);
      text-decoration: line-through;
    }

    .buy {
      font-size: 22rpx;
      margin: 0;
    }
  }
}
</style>
