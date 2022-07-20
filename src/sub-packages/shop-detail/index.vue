<template>
  <view class="shop">
    <view class="shop-header">
      <image class="shop-header-logo" :src="state.shopDetail.shopLogo" />
      <view class="shop-header-right">
        <view class="header-shop-name">{{ state.shopDetail.shopName }}</view>
        <view>
          <image src="@/static/images/tmall.png" class="right-tmall" mode="widthFix" />
        </view>
      </view>
    </view>
    <view class="header-sorce">
      <view class="sorce-text">宝贝描述:{{state.shopDetail.dsrScore}}</view>
      <view class="sorce-text sorce-middle">卖家服务:{{state.shopDetail.serviceScore}}</view>
      <view class="sorce-text">物流服务:{{state.shopDetail.shipScore}}</view>
    </view>
    <view class="shop-good">
      <ShopGoodItem v-for="(goodItem, index) in shopGoodList" :key="index" :goodItem="goodItem" />
    </view>
    <view class="shop-topbtn" @click="gotoTop" :style="{ display: state.showBtn ? 'block' : 'none' }">
      <view class="shop-topbtn-text">
        <view>
          <text class="iconfont" style="font-size: 24rpx">&#xe646;</text>
        </view>
        <text> 顶部 </text>
      </view>
    </view>
  </view>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import { onLoad, onPageScroll } from '@dcloudio/uni-app';
import request from "../../utils/request";
import ShopGoodItem from './components/ShopGoodItem.vue';

export default defineComponent({
  setup() {
    const state = reactive({
      shopDetail: {}, // 店铺详情
      showBtn: false, // 是否显示回到顶部按钮
    })

    const shopGoodList = ref([]);

    const fetchShopDetail = async (sellerId) => {
      return request({
        url: '/api/dels/shop/search',
        data: {
          sellerId: sellerId,
          version: 'v1.0.0'
        },
      });
    }

    const fetchShopGoods = async(sellerId) => {
      return request({
        url: '/api/dels/shop/goods-search',
        data: {
          sellerId: sellerId,
          version: 'v1.0.0'
        },
      });
    }

    onLoad(async (option) => {
      if(option.sellerId) {
        uni.showLoading();
        const { data } = await fetchShopDetail(option.sellerId);
        if(data.list) {
          state.shopDetail = data.list[0];
        }
        const [shopListRes, shopGoodsRes] = await Promise.all([
          fetchShopDetail(option.sellerId),
          fetchShopGoods(option.sellerId),
        ]);
        uni.hideLoading();
        if(shopListRes.data && shopListRes.data.list) {
          state.shopDetail = shopListRes.data.list[0];
        }
        if(shopGoodsRes.data && shopGoodsRes.data.list) {
          shopGoodList.value = shopGoodsRes.data.list;
        }
      }
    })

    // 根据距离顶部距离是否显示回到顶部按钮
    onPageScroll((event) => {
      if (event.scrollTop > 400) {
        //当距离大于400时显示回到顶部按钮
        state.showBtn = true;
      } else {
        state.showBtn = false;
      }
    });

    const gotoTop = async () => {
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      });
    };

    return {
      state,
      shopGoodList,
      gotoTop,
    }
  },
  components: {
    ShopGoodItem,
  },
})
</script>

<style scoped lang="scss">
.shop {
  background: #f7f7f7;
  .shop-header {
    background: #fff;
    padding: 20rpx;
    display: flex;
    .shop-header-logo {
      width: 120rpx;
      height: 120rpx;
    }
    .shop-header-right {
      height: 120rpx;
      line-height: 60rpx;
      margin-left: 32rpx;
      .header-shop-name {
        font-size: 32rpx;
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .right-tmall {
        width: 160rpx;
      }
    }
  }
  .header-sorce {
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-top: 2rpx solid #f5f5f5;
    .sorce-text {
      width: 33.33%;
      line-height: 92rpx;
      text-align: center;
      font-size: 24rpx;
    }
    .sorce-middle {
      position: relative;
      &::before {
        left: 0;
        position: absolute;
        z-index: 1;
        top: 50%;
        width: 2rpx;
        height: 28rpx;
        transform: translateY(-50%);
        background: #eee;
        display: block;
        content: "";
      }
      &::after {
        zoom: 1;
        right: 0;
        position: absolute;
        z-index: 1;
        top: 50%;
        width: 2rpx;
        height: 28rpx;
        transform: translateY(-50%);
        background: #eee;
        display: block;
        content: "";
      }
    }
  }
  .shop-good {
    margin-top: 16rpx;
    background: #fff;
  }
  .shop-topbtn {
    position: fixed;
    right: 20rpx;
    bottom: 200rpx;
    width: 120rpx;
    z-index: 990;

    .shop-topbtn-text {
      margin: 0 auto;
      width: 80rpx;
      height: 80rpx;
      background: #fff;
      box-shadow: 0 4rpx 16rpx 0 rgb(0 0 0 / 18%);
      justify-content: center;
      align-items: center;
      border-radius: 200rpx;
      text-align: center;
      font-size: 22rpx;
    }
  }
}
</style>
