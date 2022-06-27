<template>
  <!-- 滚动线报 -->
  <view class="notice">
    <view class="notice-content">
      <image class="notice-log" :src="LINE_REPORT" mode="heightFix" />
      <swiper class="notice-swiper" circular :autoplay="true" :interval="3000" :vertical="true" :duration="500" disable-touch>
        <swiper-item class="swiper-item" v-for="(item, index) in noticeList" :key="index" >
          <p class="notice-animation">
            <b class="notice-desc">{{ item.title }}</b>
            <span class="notice-number">1k+人已抢</span>
          </p>
        </swiper-item>
      </swiper>
      <UniIcons color="#888" type="forward" />
    </view>
  </view>
</template>

<script>
export default {
  name: 'Notice'
}
</script>

<script setup>
import request from '@/utils/request';
import { ref } from 'vue';
import { LINE_REPORT } from '../../../utils/constant';
import UniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue';

const noticeList = ref([]);

const fetchNoticeList = async () => {
  const { data } = await request({
    url: '/api/dels/spider/list-tip-off',
    data: {
      version: 'v1.2.4',
      pageId: 1,
      pageSize: 8
    }
  });
  noticeList.value = data.list;
};

fetchNoticeList();

</script>

<style scoped lang="scss">
.notice {
  background: #f7f7f7;
  padding: 4rpx 10rpx 0 10rpx;
  height: 100rpx;
  width: 750rpx;
  box-sizing: border-box;
  .notice-content {
    background: #fff;
    display: flex;
    align-items: center;
    height: 80rpx;
    overflow: hidden;
    border-radius: 10rpx;
    box-sizing: border-box;
    .notice-log {
      height: 30rpx;
      margin-left: 16rpx;
      margin-right: 16rpx;
    }
    .notice-swiper {
      height: 80rpx;
      width: 590rpx;
      .swiper-item {
        color: #333;
        font-size: 24rpx;
        height: 80rpx;
        .notice-animation {
          height: 76rpx;
          align-items: center;
          display: flex;
          margin: 0;
          .notice-desc {
            overflow: hidden;
            font-weight: 400;
            white-space: nowrap;
            text-overflow: ellipsis;
            display: inline-block;
            width: 420rpx;
          }
          .notice-number {
            margin-left: 40rpx;
          }
        }
      }
    }
  }
}
</style>
