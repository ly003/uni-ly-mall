<template>
  <!-- 首页单个商品 -->
  <view>
    <view class="good-item">
      <view @click="gotoGoodDetail(goodItem.id, goodItem.goodsId)">
        <view class="good-item-img">
          <image class="main-pic" :src="goodItem.mainPic" />
        </view>
        <view class="good-item-title">{{ goodItem.dtitle }}</view>
        <view class="good-item-price">
          <span class="price-qh">券后</span>
          <view class="price-item">
            <span class="price-currency">￥</span>
            <span class="price-money">{{ goodItem.originalPrice }}</span>
          </view>
        </view>
        <view class="good-item-tag">
          <view class="tag-quan">
            <span class="quan-box">
              <span class="quan-text">券</span>
              <span class="quan-money">{{ goodItem.couponPrice }}元</span>
            </span>
          </view>
          <view class="good-item-sales">
            月销 {{ monthSales }}
          </view>
        </view>
      </view>
      <view class="good-item-shop">
        <view class="shop-logo" @click="navigateToShopPage(goodItem.sellerId)">
          <image class="shop-img" :src="goodItem.shopLogo" />
        </view>
        <view class="shop-name" @click="navigateToShopPage(goodItem.sellerId)">{{ goodItem.shopName }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { computed } from 'vue';

export default defineComponent({
  name: 'HomeGoodItem',
  props: {
    goodItem: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {

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

    const gotoGoodDetail = (id: number, goodsId: string) => {
      uni.navigateTo({
        url: `/sub-packages/good-detail/index?id=${id}&goodsId=${goodsId}`,
      });
    };

    const navigateToShopPage = (sellerId: string) => {
      uni.navigateTo({
        url: `/sub-packages/shop-detail/index?sellerId=${sellerId}`,
      });
    };

    return {
      gotoGoodDetail,
      monthSales,
      navigateToShopPage,
    }
  },
})
</script>

<style scoped lang="scss">
.good-item {
  background: #fff;
  margin: 10rpx 10rpx 20rpx 10rpx;
  border-radius: 10rpx;
  box-sizing: border-box;
  animation: fadein 0.3s cubic-bezier(0.5, 0, 1, 1) forwards;
  .good-item-img {
    .main-pic {
      will-change: transform;
      border-radius: 10rpx 10rpx 0 0;
      display: block;
      width: 345rpx;
      height: 345rpx;
    }
  }
  .good-item-title {
    padding: 10rpx 20rpx 0 20rpx;
    margin-bottom: 10rpx;
    font-size: 26rpx;
    color: #333;
    font-weight: 400;
    align-items: left;
    //word-break: break-all;
    // overflow: hidden;
    // display: -webkit-box;
    // text-overflow: ellipsis;
    // -webkit-box-orient: vertical;
    // -webkit-line-clamp: 1;
  }
  .good-item-price {
    display: flex;
    margin: 0 0 0 20rpx;
    align-items: baseline;
    .price-qh {
      color: #666;
      font-size: 20rpx;
    }
    .price-item {
      color: #ff2b22;
      font-size: 38rpx;
      font-weight: 700;
      .price-currency {
        margin: 0 5rpx;
        font-size: 24rpx;
        font-style: normal;
      }
      .price-money {
        font-family: PingFangSC-Medium;
        font-weight: 500;
      }
    }
  }
  .good-item-tag {
    display: flex;
    flex-flow: wrap;
    padding: 0 20rpx;
    margin: 10rpx 0;
    justify-content: space-between;
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
        margin-left: auto;
        overflow: hidden;
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
    .good-item-sales {
      color: #888;
      font-size: 20rpx;
      padding: 10rpx 0 0 0;
    }
  }
  .good-item-shop {
    display: flex;
    padding: 0 20rpx;
    margin: 20rpx 0 0 0;
    .shop-logo {
      .shop-img {
        width: 40rpx;
        height: 40rpx;
        border-radius: 50rpx;
        border: 2rpx solid #eee;
        margin-right: 10rpx;
      }
    }
    .shop-name {
      color: #333;
      font-weight: 400;
      font-size: 22rpx;
      line-height: 36rpx;
      padding: 4rpx;
    }
  }
}
</style>
