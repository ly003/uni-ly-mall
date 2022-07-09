<template>
  <view class="search-good" @click="gotoGoodDetail(goodItem.id, goodItem.goodsId)">
    <view class="good-img">
      <image class="left-img" mode="widthFix" :src="goodItem.mainPic" />
    </view>
    <view class="good-right">
      <view class="good-title">
        {{ goodItem.dtitle }}
      </view>
      <view class="price-quan">
        <view>
          <span class="price-qh">券后</span>
          <span class="price-item">
            <span class="price-currency">￥</span>
            <span class="price-money">{{ goodItem.originalPrice }}</span>
          </span>
        </view>
        <view class="tag-quan">
          <span class="quan-box">
            <span class="quan-text">券</span>
            <span class="quan-money">{{ goodItem.couponPrice }}元</span>
          </span>
        </view>
      </view>
      <view class="shop-sales">
        <view class="shop-title">
          {{ goodItem.shopName }}
          <UniIcons color="#888" type="forward" size="14" />
        </view>
        <view class="sales-num">
          月销 {{ monthSales }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue';
import UniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue';

const props = defineProps({
  goodItem: {
    type: Object,
    default: () => {}
  }
});

const monthSales = computed(() => {
  if(props.goodItem && props.goodItem.monthSales) {
    // 以万为单位保留一位小数
    if(props.goodItem.monthSales / 10000 >=1) {
      return (props.goodItem.monthSales / 10000).toFixed(1) + "万";
    } else {
      return props.goodItem.monthSales;
    }
  } else {
    return "";
  }
})

const gotoGoodDetail = (id, goodsId) => {
  uni.navigateTo({
    url: `/sub-packages/good-detail/index?id=${id}&goodsId=${goodsId}`,
  });
};

</script>

<style scoped lang="scss">
.search-good {
  background: #fff;
  padding: 14rpx;
  display: flex;
  height: 244rpx;
  border-bottom: 2rpx solid #f5f5f5;
  margin-bottom: 10rpx;
  border-radius: 20rpx;
  .good-img {
    .left-img {
      width: 244rpx;
      height: 100%;
      border-radius: 20rpx;
      display: block;
    }
  }
  .good-right {
    margin-left: 24rpx;
    width: 100%;
    .good-title {
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-box-align: center;
      -webkit-line-clamp: 2;
      min-height: 76rpx;
      font-size: 28rpx;
      color: #333;
    }
    .price-quan {
      display: flex;
      margin-top: 46rpx;
      align-items: center;
      justify-content: space-between;
      .price-qh {
        color: #666;
        font-size: 20rpx;
      }
      .price-item {
        color: #ff2b22;
        font-size: 38rpx;
        .price-currency {
          margin: 0 5rpx;
          font-size: 24rpx;
          font-style: normal;
        }
        .price-money {
          font-family: PingFangSC-Medium;
          font-weight: 700;
        }
      }
      .tag-quan {
        box-sizing: border-box;
        .quan-box {
          background: linear-gradient(90deg,#ff8873,#ff4f4f);
          padding: 2rpx;
          border-radius: 4rpx;
          font-size: 18rpx;
          font-weight: 400;
          color: #fff;
          box-sizing: border-box;
          overflow: hidden;
          margin-left: auto;
          .quan-text {
            background: #fff;
            color: #fe3a33;
            box-sizing: border-box;
            border-radius: 2rpx 0 0 2rpx;
            padding: 0 5rpx;
            line-height: 24rpx;
          }
          .quan-money {
            padding: 0 5rpx;
            line-height: 24rpx;
          }
        }
      }
    }
    .shop-sales {
      display: flex;
      margin-top: 20rpx;
      align-items: center;
      justify-content: space-between;
      .shop-title {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 320rpx;
        border-radius: 16rpx;
        padding: 4rpx 10rpx 4rpx 0;
        font-size: 20rpx;
        color: #888;
        display: flex;
        align-items: center;
      }
      .sales-num {
        font-size: 20rpx;
        color: #888;
      }
    }
  }
}
</style>
