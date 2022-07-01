<template>
  <!-- 首页单个商品骨架屏 -->
  <view>
    <view class="good-item">
      <view class="good-item-img">
        <image class="main-pic skeleton-image" />
      </view>
      <view class="good-item-title skeleton-text"></view>
      <view class="good-item-price">
        <span class="price-qh skeleton-text"></span>
        <view class="price-item skeleton-text"></view>
      </view>
      <view class="good-item-tag">
        <view class="tag-quan skeleton-text"></view>
        <view class="good-item-sales skeleton-text"></view>
      </view>
      <view class="good-item-shop">
        <view class="shop-logo">
          <image class="shop-img skeleton-image" />
        </view>
        <view class="shop-name skeleton-text"></view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
@keyframes skeleton-blink {
  50% {
    opacity: 0.6;
  }
}

.skeleton-image {
  background: #efefef;
  animation: skeleton-blink 1.2s ease-in-out infinite;
}

.skeleton-text {
  background: #efefef;
  height: 30rpx;
  width: 100%;
  border-radius: 4rpx;
  animation: skeleton-blink 1.2s ease-in-out infinite;
}
.good-item {
  background: #fff;
  margin: 10rpx 10rpx 20rpx 10rpx;
  border-radius: 10rpx;
  box-sizing: border-box;
  overflow: hidden;
  animation: fadein 0.3s cubic-bezier(0.5, 0, 1, 1) forwards;
  .good-item-img {
    .main-pic {
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
    }
  }
  .good-item-tag {
    display: flex;
    flex-flow: wrap;
    padding: 0 20rpx;
    margin: 10rpx 0;
    //align-items: center;
    justify-content: space-between;
    .tag-quan {
      box-sizing: border-box;
    }
    .good-item-sales {
      color: #888;
      font-size: 20rpx;
      padding: 5rpx 0 0 0;
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
