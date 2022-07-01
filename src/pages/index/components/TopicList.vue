<template>
  <!-- 精选专题 -->
  <view class="topic">
    <swiper class="topic-swiper" circular :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500">
      <swiper-item class="swiper-item" v-for="(item, index) in topicList" :key="index">
        <view class="swiper-item-image">
          <image :src="item.banner[0]" mode="widthFix" />
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  name: 'TopicList'
}
</script>

<script setup>
import request from '@/utils/request';
import { ref } from 'vue';

const topicList = ref([]);

const fetchTopicList = async () => {
  const { data } = await request({
    url: '/api/goods/topic/catalogue',
    data: {
      version: 'v1.1.0',
    }
  });
  topicList.value = data;
};

fetchTopicList();

</script>

<style scoped lang="scss">
.topic {
  background: #f7f7f7;
  .topic-swiper {
    width: 750rpx;
    height: 308rpx;
    .swiper-item {
      width: 750rpx;
      .swiper-item-image {
        padding: 10rpx;
        image {
          width: 730rpx;
          border-radius: 10rpx;
        }
      }
    }
  }
}
</style>
