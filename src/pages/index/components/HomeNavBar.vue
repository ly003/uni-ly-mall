<template>
  <NavBar class="navbar" shadow fixed :border="false" backgroundColor="#FF2B22" leftWidth="50px">
    <view class="navbar-search" @click="goToSearchPage">
      <view class="navbar-search-input-wrapper">
        <text class="iconfont search-icon" style="font-size: 44rpx;color: #fe3738">&#xe6f2;</text>
        <!-- <span class="search-info">输入或粘贴商品标题搜索隐藏优惠</span> -->
      </view>
    </view>
  </NavBar>
</template>
<script>
import NavBar from '@dcloudio/uni-ui/lib/uni-nav-bar/uni-nav-bar.vue';
export default {
  setup() {
    const goToSearchPage = () => {
      uni.navigateTo({
        url: '/sub-packages/good-search/index'
      });
    };
    return {
      goToSearchPage
    };
  },
  components: {
    NavBar,
  },
};
</script>
<style lang="scss" scoped>
.navbar {
  color: #222 !important;
  .navbar-search {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 680rpx;

  .navbar-search-input-wrapper {
    background: #fff;
    border-radius: 36rpx;
    width: 100%;
    height: 54rpx;
    border: 2rpx solid #fe3738;
    align-items: center;
    padding: 4rpx 16rpx 0 10rpx;
    .search-icon {
      margin-top: 10rpx;
    }
    .search-info {
      color: #828282;
    }
  }
}
}
</style>
