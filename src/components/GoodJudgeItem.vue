<template>
  <view
    class="good-judge-item"
  >
    <!-- 用户信息 -->
    <view class="good-judge-item-user">
      <image
        class="good-judge-item-user-picture"
        :src="commentItem.headPicUrl"
      />
      <view>
        <view class="good-judge-item-user-name">
          {{ commentItem.userNick }}
        </view>
        <view class="good-judge-item-user-time">
          {{ commentItem.commentDate }}
        </view>
      </view>
    </view>
    <!-- 已购商品信息 -->
    <view class="good-judge-item-sku" v-if="commentItem.skuMap">
      <view class="good-judge-item-map">
        <view class="good-judge-item-line" />
        <view>
          已购商品：
          <text class="good-judge-item-value" v-for="value, key in commentItem.skuMap" :key="key">
            {{ key }}:{{ value }}
          </text>
        </view>
      </view>
    </view>
    <!-- 评价内容 -->
    <view class="good-judge-item-content">
      <view class="good-judge-item-font">
        {{ commentItem.commentContent }}
      </view>
    </view>
    <!-- 评价图片 -->
    <view class="good-judge-item-img" v-if="commentItem.images || commentItem.video">
      <view v-if="commentItem.video" class="good-judge-item-vedio">
        <video
          :src="'https:' + commentItem.video.videoUrl"
          class="video"
          muted
          loop
          :poster="'https:' + commentItem.video.coverUrl"
          :controls="false"
          object-fit="cover"
        />
      </view>
      <view
        v-for="url, index in commentItem.images"
        :key="index"
        class="good-judge-item-view"
      >
        <image
          class="good-judge-item-picture"
          @click="previewImage(commentItem.images, index)"
          :src="url"
        />
      </view>
    </view>
    <!-- 追加评价 -->
    <view v-if="commentItem.commentAppend && commentItem.commentAppend.commentContent" class="good-judge-item-append">
      <view class="good-judge-item-append-content">
        <text class="good-judge-item-days">{{commentItem.commentAppend.intervalDay}}天后追评</text>
        <text class="good-judge-item-append-font">{{commentItem.commentAppend.commentContent}}</text>
      </view>
    </view>
    <!-- 追加评价图片 -->
    <view v-if="commentItem.commentAppend && commentItem.commentAppend.images" class="good-judge-item-append-img">
      <view
        v-for="url, index in commentItem.commentAppend.images"
        :key="index"
        class="good-judge-item-append-view"
      >
        <image
          class="good-judge-item-append-picture"
          @click="previewImage(commentItem.commentAppend.images, index)"
          :src="url"
        />
      </view>
    </view>
  </view>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    commentItem: {
      type: Object,
      default: () => {},
    },
    open: {
      type: Function,
      default: () => {}
    }
  },

  setup() {

    const previewImage = (url, current) => {
      const urls = url.map(item => {
        if(item.indexOf('https:') < 0) {
          return 'https:' + item;
        }
      })
      uni.previewImage({
        urls: urls,
        current: current,
      })
    }

    return {
      previewImage,
    }
  },

})
</script>

<style lang="scss" scoped>
.good-judge-item {
  background: #fff;
  margin: 30rpx 20rpx 50rpx 20rpx;
  .good-judge-item-user {
    display: flex;
    align-items: center;
    .good-judge-item-user-picture {
      width: 70rpx;
      height: 70rpx;
      margin-right: 20rpx;
      border-radius: 50rpx;
    }
    .good-judge-item-user-name {
      font-size: 30rpx;
      font-weight: bold;
      color: #000;
    }
    .good-judge-item-user-time {
      font-size: 20rpx;
      font-weight: 400;
      color: #888888;
    }
  }
  .good-judge-item-sku {
    margin: 16rpx 0 0 0;
    .good-judge-item-map {
      font-size: 28rpx;
      font-weight: 400;
      color: #888888;
      display: flex;
      .good-judge-item-line {
        width: 6rpx;
        background: #F5F5F5;
        margin: 6rpx 12rpx 0 0;
      }
      .good-judge-item-value {
        margin-right: 20rpx;
      }
    }
  }
  .good-judge-item-content {
    margin: 16rpx 0rpx 10rpx 0rpx;
    .good-judge-item-font {
      font-size: 28rpx;
      font-weight: 400;
      color: #000;
      line-height: 35rpx;
    }
  }
  .good-judge-item-img {
    display: flex;
    flex-wrap: wrap;
    .good-judge-item-vedio {
      width: 33%;
      .video {
        width: 220rpx;
        height: 220rpx;
        border-radius: 10rpx;
        margin: 0rpx 8rpx 8rpx 0rpx;
        will-change: transform;
        display: block;
        animation: fadein 0.3s cubic-bezier(0.3, 0, 1, 1) forwards;
      }
    }
    .good-judge-item-view {
      width: 33%;
      .good-judge-item-picture {
        width: 220rpx;
        height: 220rpx;
        border-radius: 10rpx;
        margin: 0rpx 8rpx 8rpx 0rpx;
      }
    }
  }
  .good-judge-item-append {
    margin: 16rpx 0rpx 10rpx 0rpx;
    .good-judge-item-append-content {
      font-size: 28rpx;
      font-weight: 400;
      line-height: 35rpx;
      .good-judge-item-days {
        color: #FF7F50;
        margin-right: 10rpx;
      }
    }
  }
  .good-judge-item-append-img {
    display: flex;
    flex-wrap: wrap;
    .good-judge-item-append-view {
      width: 33%;
      .good-judge-item-append-picture {
        width: 220rpx;
        height: 220rpx;
        border-radius: 10rpx;
        margin: 0rpx 8rpx 8rpx 0rpx;
      }
    }
  }
}
</style>
