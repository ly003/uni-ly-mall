<template>
  <view class="good-judge">
    <view class="good-judge-top" :style="{ top: 0 + 'px' }">
      <view class="good-judge-top-content">
        <view class="good-judge-top-left">
          <view
            class="good-judge-type"
            @click="typeComment(state.goodDetail.id, 0, state.sort, 0)"
            :style="{ color: state.type == 0 ? 'rgb(254, 55, 56)' : '#000' }"
          >全部</view>
          <view
            class="good-judge-type"
            @click="typeComment(state.goodDetail.id, 1, state.sort, 0)"
            :style="{ color: state.type == 1 ? 'rgb(254, 55, 56)' : '#000' }"
          >图片</view>
          <view
            class="good-judge-type"
            @click="typeComment(state.goodDetail.id, 2, state.sort, 0)"
            :style="{ color: state.type == 2 ? 'rgb(254, 55, 56)' : '#000' }"
          >视频</view>
          <view
            class="good-judge-type"
            @click="typeComment(state.goodDetail.id, 3, state.sort, 1)"
            :style="{ color: state.type == 3 ? 'rgb(254, 55, 56)' : '#000' }"
          >去掉默认好评</view>
        </view>
        <view class="good-judge-top-right">
          <view
            @click="sortComment(state.goodDetail.id, state.type, state.sort)"
          >
            <text class="iconfont" style="font-size: 38rpx; color: #888">{{
              state.sort == 0 ? "&#xe662;" : "&#xe65e;"
            }}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="good-judge-content">
      <GoodJudgeItem
        v-for="(commentItem, index) in state.commentList"
        :key="index"
        :commentItem="commentItem"
        :open="open"
      />
    </view>
    <view class="good-judge-footer">
      <GoodFooter :good="state.goodDetail" />
    </view>
    <!-- <Popup ref="popupRef" type="center" :animation="false" class="good-judge-popup">
      <video
        :src="'https:' + state.videoUrl"
        class="popup-video"
        autoplay
        muted
        loop
        :controls="false"
      />
    </Popup> -->
  </view>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import request from "../../utils/request";
import { onLoad } from "@dcloudio/uni-app";
import GoodFooter from "../../components/GoodFooter.vue";
import GoodJudgeItem from "../../components/GoodJudgeItem.vue";
import Popup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue';

export default defineComponent({
  setup() {
    const state = reactive({
      commentList: [],
      goodDetail: {},
      type: 0,
      sort: 0,
      videoUrl: '',
    });

    const popupRef = ref(null)

    // 查询商品评论
    const fetchCommentList = async (id, type = 0, sort = 0, haopingType = 0) => {
      return request({
        url: `/api/comment/get-comment-list`,
        data: {
          version: "v1.0.0",
          id,
          type,
          sort,
          haopingType,
        },
      });
    };

    // 查询商品详情
    const fetchGoodDetail = async (id, goodsId) => {
      return request({
        url: `/api/goods/get-goods-details`,
        data: {
          version: "v1.2.3",
          id,
          goodsId,
        },
      });
    };

    onLoad(async (options) => {
      if (options.id || options.goodsId) {
        uni.showLoading();
        const { data } = await fetchCommentList(options.id || options.goodsId);
        state.commentList = data.commentList;
        uni.hideLoading();

        const [goodDetailRes] = await Promise.all([
          fetchGoodDetail(options.id, options.goodsId),
        ]);
        state.goodDetail = goodDetailRes.data;
      }
    });

    // 按type筛选
    const typeComment = async (id, type, sort, haopingType) => {
      if (state.type != type) {
        state.type = type;
        const typeValue = haopingType===1?0:type;
        uni.showLoading();
        const { data } = await fetchCommentList(id, typeValue, sort, haopingType);
        state.commentList = data.commentList;
        gotoTop();
        uni.hideLoading();
      }
    };

    // 排序
    const sortComment = async (id, type, sort) => {
      state.sort = sort === 1 ? 0 : 1;
      const typeValue = type===3?0:type;
      uni.showLoading();
      const { data } = await fetchCommentList(id, typeValue, sort === 1 ? 0 : 1, type===3?1:0);
      state.commentList = data.commentList;
      gotoTop();
      uni.hideLoading();
      uni.showToast({
        title: sort === 0 ? "切换为时间排序" : "切换为默认排序",
        icon: "none",
        duration: 1000,
      });
    };

    const systemInfo = uni.getSystemInfoSync();

    // 回到顶部
    const gotoTop = async () => {
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 100,
      });
    };

    const open = (videoUrl) => {
      state.videoUrl = videoUrl;
      popupRef.value.open('center');
    }

    return {
      state,
      typeComment,
      sortComment,
      systemInfo,
      popupRef,
      open,
    };
  },
  components: { GoodFooter, GoodJudgeItem, Popup },
});
</script>

<style lang="scss" scoped>
.good-judge {
  background: #fff;
  min-height: calc(100vh - 44px);
  .good-judge-top {
    box-sizing: border-box;
    background-color: rgb(248, 248, 248);
    position: sticky;
    top: 91px;
    z-index: 11;
    border-top: 1rpx solid #dcdcdc;
    .good-judge-top-content {
      display: flex;
      justify-content: space-between;
      padding: 14rpx 20rpx 14rpx 20rpx;
      .good-judge-top-left {
        display: flex;
        justify-content: center;
        align-items: center;
        .good-judge-type {
          font-size: 28rpx;
          margin-right: 24rpx;
        }
      }
    }
  }

  .good-judge-content {
    background: #fff;
    padding-bottom: calc(100rpx + constant(safe-area-inset-bottom));
    padding-bottom: calc(100rpx + env(safe-area-inset-bottom));
  }

  .good-judge-footer {
    position: fixed;
    bottom: 0;
    z-index: 10;
    width: 100%;
    background-color: #fff;
  }
  .good-judge-popup {
    width: 750rpx;
    z-index: 100;
    .popup-video {
      //width: 750rpx;
      will-change: transform;
      display: block;
      //animation: fadein 0.3s cubic-bezier(0.3, 0, 1, 1) forwards;
    }
  }
}
</style>
