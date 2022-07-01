<template>
  <view class="good-detail">
    <view class="good-detail-top">
      <!-- 详情轮播图 -->
      <view class="images">
        <swiper class="swiper" autoplay circular :interval="interval" :duration="duration" @change="changeImage">
          <swiper-item v-for="(img, index) in state.imgList" :key="index">
            <view class="swiper-item">
              <image class="swiper-img" mode="scaleToFill" :src="img" @click="previewImage(state.imgList, index)" />
            </view>
          </swiper-item>
        </swiper>
        <view class="cornerMark">{{ state.imageIndex }}/{{ state.imgList.length }}</view>
      </view>
      <!-- 基本信息 -->
      <view class="good-detail-container">
        <view class="good-detail-price">
          <!-- 价格信息 -->
          <view class="good-detail-price-content">
            <view class="good-detail-price-tag"> ¥ </view>
            <view class="good-detail-actual-price">
              {{ state.goodDetail.actualPrice }}</view>
            <view class="good-detail-origin-price">
              原价 ¥{{ state.goodDetail.originalPrice }}</view>
          </view>
          <!-- 销量信息 -->
          <view class="good-detail-month-sale">
            <view class="good-detail-month-sale-content"> 月售 </view>
            <view class="good-detail-month-sale-count">
              {{ state.monthSales }}</view>
            <view class="good-detail-month-sale-content"> 件 </view>
          </view>
        </view>
        <!-- 店铺类型和标题 -->
        <view class="good-detail-title">
          <image class="good-detail-title-tag" v-if="state.goodDetail.shopType === 1" :src="tianmao" />
          <image class="good-detail-title-tag" v-else-if="state.goodDetail.shopType === 0" :src="taobao" />
          <text class="good-detail-title-content">
            {{ state.goodDetail.title }}
          </text>
        </view>
        <!-- 优惠券信息 -->
        <view class="good-detail-coupon" v-if="state.goodDetail.couponPrice">
          <view class="good-detail-coupon-left" :style="{ backgroundImage: 'url(' + couponBg1 + ')' }">
            <text class="good-detail-coupon-content">
              ￥<text class="good-detail-coupon-price">
                {{ state.goodDetail.couponPrice }}
              </text></text>
            <view class="good-detail-coupon-text">
              优惠券使用期限
              <view class="good-detail-coupon-time">{{ state.goodDetail.couponStartTime }} 至</view>
              <view class="good-detail-coupon-time">{{ state.goodDetail.couponEndTime }}
              </view>
            </view>
          </view>
          <view class="good-detail-coupon-right" :style="{ backgroundImage: 'url(' + couponBg2 + ')' }">
            <view @click="gotoExternalUrl"> 立即领券 </view>
          </view>
        </view>
      </view>
      <!-- 推广文案 -->
      <view class="good-detail-desc" v-if="state.goodDetail.desc">
        <view class="good-detail-desc-title">
          <image class="good-detail-desc-img" :src="pepoleTag" />
          <text class="good-detail-desc-doc"> 达人推荐 </text>
        </view>
        <view class="good-detail-desc-bottom">
          <image class="good-detail-desc-tag" :src="boxTag" />
          <view class="good-detail-desc-content">
            {{ state.goodDetail.desc }}
          </view>
        </view>
      </view>
      <!-- 商品评价 -->
      <view class="good-detail-judge">
        <view class="good-detail-judge-top">
          <view class="good-detail-judge-title">
            评价({{ state.commentCount }})
          </view>
          <view class="good-detail-judge-nocontent" v-if="state.commentCount == 0">
            暂无评价
          </view>
          <view v-else class="good-detail-judge-lookAll"
            @click="navigateToJudgePage(state.goodDetail.id, state.goodDetail.goodsId)">
            查看全部 >
          </view>
        </view>
        <view v-if="goodComment && goodComment.commentList" class="good-detail-judge-example"
          @click="navigateToJudgePage(state.goodDetail.id, state.goodDetail.goodsId)">
          <view class="good-detail-judge-user">
            <image class="good-detail-judge-user-picture" :src="goodComment.commentList[0].headPicUrl" />
            <view>
              <view class="good-detail-judge-user-name">
                {{ goodComment.commentList[0].userNick }}
              </view>
              <view class="good-detail-judge-user-time">
                {{ goodComment.commentList[0].commentDate }}
              </view>
            </view>
          </view>
          <view class="good-detail-judge-content">
            <view class="good-detail-judge-font">
              {{ goodComment.commentList[0].commentContent }}
            </view>
          </view>
        </view>
      </view>
      <!-- 店铺信息 -->
      <view class="good-detail-shop">
        <view class="good-detail-shop-content">
          <view>
            <image class="good-detail-shop-img" :src="state.goodDetail.shopLogo" />
          </view>
          <view class="good-detail-shop-judge">
            <view class="good-detail-shop-name">
              <view class="good-detail-shop-title">{{
                  state.goodDetail.shopName
              }}</view>
              <view class="good-detail-shop-more">
                <view class="good-detail-shop-box">
                  <text class="good-detail-shop-font">全部商品</text>
                </view>
              </view>
            </view>
            <view class="good-detail-shop-count">
              <text class="good-detail-shop-text">描述：{{ state.goodDetail.descScore }}</text>
              <text class="good-detail-shop-text">卖家：{{ state.goodDetail.serviceScore }}</text>
              <text class="good-detail-shop-text">物流：{{ state.goodDetail.shipScore }}</text>
            </view>
          </view>
        </view>
      </view>
      <!-- 商品详情展示 -->
      <view v-if="state.detailPics.length > 0" class="good-detail-context">
        <view class="good-detail-context-title">
          <view class="good-detail-context-left">
            <view class="good-detail-context-line"></view>
            <view class="good-detail-context-font"> 商品详情 </view>
          </view>
          <view class="good-detail-context-right" @click="displayDetail(state.isDisplay)">
            <text> {{ state.isDisplay ? "展开" : "收起" }} </text>
            <image class="good-detail-context-down" :src="down"
              :style="{ transform: state.isDisplay ? '' : 'rotate(180deg)' }" />
          </view>
        </view>
        <view v-if="!state.isDisplay">
          <view v-for="(item, index) in state.detailPics" :key="index">
            <image :src="item.img" class="good-detail-images" mode="widthFix" />
          </view>
        </view>
      </view>
      <!-- 推荐商品 -->
      <view class="good-detail-tuijian">
        <image class="tuijian-img" :src="heart" /> 为你推荐
      </view>
      <!-- <HomeGoodList :goodList="goodList" /> -->
      <view class="good-detail-bottom"> 我已经到底啦~^_^~ </view>
    </view>
    <view class="good-detail-footer">
      <GoodFooter :good="state.goodDetail" />
    </view>
    <view class="good-detail-topbtn" @click="gotoTop" :style="{ display: state.showBtn ? 'block' : 'none' }">
      <view class="good-detail-topbtn-text">
        <view>
          <text class="iconfont" style="font-size: 24rpx">&#xe646;</text>
        </view>
        <text> 顶部 </text>
      </view>
    </view>
  </view>
</template>

<script>
import { onLoad, onPageScroll } from "@dcloudio/uni-app";
import { defineComponent, reactive, ref } from "vue";
import request from "../../utils/request";
import {
  tianmao,
  taobao,
  couponBg1,
  couponBg2,
  pepoleTag,
  boxTag,
  down,
  heart,
} from "../../utils/constant";
import GoodFooter from "../../components/GoodFooter.vue";
// import HomeGoodList from "@/pages/index/components/HomeGoodList.vue";

export default defineComponent({
  setup() {
    const state = reactive({
      goodDetail: {}, // 商品详情数据
      imgList: [], // 商品轮播图
      imageIndex: 1,
      detailPics: [], // 详情图
      isDisplay: false, // 是否展示详情
      monthSales: "",
      showBtn: false, // 是否显示回到顶部按钮
      commentCount: 0, // 评价总数
      //goodComment: {}, // 商品评价 在state中初始化了，就不需要再用ref进行初始化，注意：这两处设置的并不是同一个变量
    });

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

    const getPrivilegeLink = async (goodsId, couponId) => {
      return request({
        url: `/api/tb-service/get-privilege-link`,
        data: {
          version: "v1.3.2",
          goodsId,
          couponId,
          pid: "mm_2429490085_2584200282_111919500195",
        },
      });
    };

    // 查询商品评论
    const fetchCommentList = async (id) => {
      return request({
        url: `/api/comment/get-comment-list`,
        data: {
          version: "v1.0.0",
          id,
        },
      });
    };

    // 查询相似商品
    const fetchSimilerGoods = (goodsId, size = 30) => {
      return request({
        url: `/api/goods/list-similer-goods-by-open`,
        data: {
          version: "1.2.2", // API接口版本号
          size,
          id: goodsId,
        },
      });
    };

    const goodList = ref([]);
    const goodComment = ref({});

    onLoad(async (options) => {
      if (options.id || options.goodsId) {
        uni.showLoading();
        const { data } = await fetchGoodDetail(options.id, options.goodsId);
        state.goodDetail = data;
        uni.hideLoading();
        if (data.imgs) {
          state.imgList = data.imgs.split(",");
        }
        if (data.detailPics) {
          state.detailPics = JSON.parse(data.detailPics);
        }
        if (data.monthSales) {
          if (data.monthSales / 10000 >= 1) {
            state.monthSales =
              parseInt((data.monthSales / 10000) * 10) / 10 + "万";
          } else {
            state.monthSales = data.monthSales;
          }
        }

        const [goodListRes, goodCommentRes] = await Promise.all([
          fetchSimilerGoods(options.goodsId),
          fetchCommentList(options.id || options.goodsId),
        ]);

        goodList.value = goodListRes.data;
        goodComment.value = goodCommentRes.data;
        const commentCount = goodCommentRes.data && goodCommentRes.data.commentCount;
        if (commentCount <= 100) {
          state.commentCount = commentCount;
        } else if (commentCount < 1000) {
          state.commentCount = parseInt(commentCount / 100) * 100 + "+";
        } else if (commentCount < 10000) {
          state.commentCount = parseInt(commentCount / 1000) * 1000 + "+";
        } else {
          state.commentCount = parseInt(commentCount / 10000) + "万+";
        }
      }
    });

    const changeImage = (event) => {
      state.imageIndex = event.detail.current + 1;
    };

    const gotoExternalUrl = async () => {
      const { goodsId, couponId } = state.goodDetail;
      const {
        data: { tpwd },
      } = await getPrivilegeLink(goodsId, couponId);
      uni.setClipboardData({
        data: tpwd,
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

    const displayDetail = (isDisplay) => {
      state.isDisplay = !isDisplay;
    };

    const gotoTop = async () => {
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      });
    };

    // 根据距离顶部距离是否显示回到顶部按钮
    onPageScroll((event) => {
      if (event.scrollTop > 400) {
        //当距离大于400时显示回到顶部按钮
        state.showBtn = true;
      } else {
        state.showBtn = false;
      }
    });

    const navigateToJudgePage = (id) => {
      uni.navigateTo({
        url: `/sub-packages/good-judge/index?id=${id}`,
      });
    };

    const previewImage = (url, current) => {
      console.log('url', url)
      uni.previewImage({
        urls: url,
        current: current,
      })
    }

    return {
      state,
      interval: 3000,
      duration: 500,
      changeImage,
      tianmao,
      taobao,
      couponBg2,
      couponBg1,
      pepoleTag,
      boxTag,
      gotoExternalUrl,
      down,
      displayDetail,
      heart,
      goodList,
      getPrivilegeLink,
      gotoTop,
      goodComment,
      navigateToJudgePage,
      previewImage,
    };
  },
  components: { GoodFooter},
});
</script>

<style lang="scss" scoped>
.good-detail {
  background: #f7f7f7;

  .good-detail-top {
    padding-bottom: calc(100rpx + constant(safe-area-inset-bottom));
    padding-bottom: calc(100rpx + env(safe-area-inset-bottom));

    .images {
      position: relative;

      .swiper {
        height: 750rpx;

        .swiper-item {
          .swiper-img {
            width: 750rpx;
            height: 750rpx;
          }
        }
      }

      .cornerMark {
        position: absolute;
        background: rgba(0, 0, 0, 0.4);
        font-size: 20rpx;
        color: #fff;
        border-radius: 20rpx;
        z-index: 5;
        padding: 2rpx 26rpx;
        margin-top: -60rpx;
        right: 30rpx;
      }
    }

    .good-detail-container {
      padding: 2rpx 0;
      background-color: #fff;
      margin-top: -0.1rem;
      border-radius: 0 0 20rpx 20rpx;

      .good-detail-price {
        position: relative;

        .good-detail-price-content {
          position: absolute;
          display: flex;
          align-items: flex-end;
          padding: 40rpx 20rpx 20rpx;

          .good-detail-price-tag {
            font-size: 30rpx;
            line-height: 20rpx;
            color: rgb(255, 49, 62);
            font-weight: bold;
            margin-right: 2rpx;
          }

          .good-detail-actual-price {
            font-size: 50rpx;
            line-height: 30rpx;
            color: rgb(255, 49, 62);
            font-weight: bold;
            margin-right: 20rpx;
          }

          .good-detail-origin-price {
            font-size: 24rpx;
            color: #808080;
            line-height: 20rpx;
            text-decoration: line-through;
          }
        }

        .good-detail-month-sale {
          position: absolute;
          right: 0;
          display: flex;
          text-align: center;
          font-size: 24rpx;
          padding: 40rpx 20rpx 20rpx;

          .good-detail-month-sale-content {
            color: #808080;
          }

          .good-detail-month-sale-count {
            color: rgb(255, 49, 62);
          }
        }
      }

      .good-detail-title {
        //display: flex;
        overflow: hidden;
        padding: 100rpx 20rpx 10rpx;

        .good-detail-title-tag {
          margin-top: 4rpx;
          height: 26rpx;
          width: 50rpx;
          margin-right: 18rpx;
        }

        .good-detail-title-content {
          font-size: 30rpx;
          font-weight: bold;
          letter-spacing: 2rpx;
        }
      }

      .good-detail-coupon {
        display: flex;
        padding: 20rpx 20rpx 20rpx;

        .good-detail-coupon-left {
          width: 480rpx;
          height: 130rpx;
          background-repeat: no-repeat;
          display: flex;
          justify-content: space-around;
          align-items: center;
          background-size: 100% auto;

          .good-detail-coupon-content {
            color: rgb(255, 49, 62);
            display: flex;
            font-size: 30rpx;
            font-weight: bold;
            margin-left: 20rpx;

            .good-detail-coupon-price {
              font-size: 50rpx;
            }
          }

          .good-detail-coupon-text {
            color: rgb(255, 49, 62);
            font-weight: bold;
            font-size: 24rpx;

            .good-detail-coupon-time {
              font-weight: 500;
              font-size: 24rpx;
            }
          }
        }

        .good-detail-coupon-right {
          width: 240rpx;
          height: 130rpx;
          display: flex;
          background-repeat: no-repeat;
          justify-content: center;
          align-items: center;
          color: #ff313e;
          font-weight: 700;
          background-size: 100% auto;
          box-sizing: border-box;
          padding-left: 20rpx;
          font-size: 28rpx;
        }
      }
    }

    .good-detail-desc {
      margin-top: 20rpx;
      background-color: #fff;
      padding: 24rpx 24rpx 24rpx;
      border-radius: 20rpx;

      .good-detail-desc-title {
        display: flex;
        align-items: center;

        .good-detail-desc-img {
          width: 54rpx;
          height: 54rpx;
          margin-right: 10rpx;
        }

        .good-detail-desc-doc {
          color: rgb(254, 55, 56);
          font-size: 26rpx;
          font-weight: bold;
        }
      }

      .good-detail-desc-bottom {
        margin-top: 20rpx;
        padding: 16rpx 36rpx;
        border-radius: 20rpx;
        background-color: #f4f4f4;
        position: relative;

        .good-detail-desc-tag {
          width: 40rpx;
          height: 16rpx;
          position: absolute;
          top: -15rpx;
          left: 96rpx;
        }

        .good-detail-desc-content {
          color: rgb(85, 85, 85);
          font-size: 24rpx;
        }
      }
    }

    .good-detail-judge {
      margin-top: 20rpx;
      background-color: #fff;
      padding: 24rpx 24rpx 24rpx;
      border-radius: 20rpx;

      .good-detail-judge-top {
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 4rpx;

        .good-detail-judge-title {
          font-weight: bold;
          font-size: 28rpx;
        }

        .good-detail-judge-nocontent {
          color: rgb(136, 136, 136);
          font-size: 22rpx;
        }

        .good-detail-judge-lookAll {
          font-size: 26rpx;
          color: #FF7F50;
        }
      }

      .good-detail-judge-example {
        margin-top: 30rpx;

        .good-detail-judge-user {
          display: flex;
          align-items: center;

          .good-detail-judge-user-picture {
            width: 60rpx;
            height: 60rpx;
            margin-right: 20rpx;
            border-radius: 50rpx;
          }

          .good-detail-judge-user-name {
            font-size: 26rpx;
            font-weight: 500;
            color: #000;
          }

          .good-detail-judge-user-time {
            font-size: 20rpx;
            font-weight: 400;
            color: #888888;
          }
        }

        .good-detail-judge-content {
          margin-top: 20rpx;
          //height: 112rpx;
          //text-indent: 2em; // 首行缩进
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;

          .good-detail-judge-font {
            font-size: 26rpx;
            font-weight: 400;
            color: #000;
            line-height: 35rpx;
          }
        }
      }
    }

    .good-detail-shop {
      margin-top: 20rpx;
      background-color: #fff;
      padding: 24rpx 24rpx 24rpx;
      border-radius: 20rpx;

      .good-detail-shop-content {
        display: flex;
        align-items: center;

        .good-detail-shop-img {
          width: 100rpx;
          height: 100rpx;
          border-radius: 10rpx;
        }

        .good-detail-shop-judge {
          margin-left: 20rpx;
          flex-grow: 1;

          .good-detail-shop-name {
            display: flex;
            justify-content: space-between;
            box-sizing: border-box;
            padding: 0 4rpx;

            .good-detail-shop-title {
              font-weight: bold;
              font-size: 28rpx;
            }

            .good-detail-shop-more {
              display: flex;

              .good-detail-shop-box {
                display: flex;
                width: 130rpx;
                height: 44rpx;
                border-radius: 20rpx;
                background-image: linear-gradient(90deg, #ff5050, #ff345d);
                display: flex;
                justify-content: center;
                align-items: center;

                .good-detail-shop-font {
                  font-size: 24rpx;
                  color: rgb(255, 255, 255);
                }
              }
            }
          }

          .good-detail-shop-count {
            padding: 0 4rpx;
            margin-top: 10rpx;

            .good-detail-shop-text {
              color: rgb(136, 136, 136);
              margin-right: 40rpx;
              font-size: 26rpx;
            }
          }
        }
      }
    }

    .good-detail-context {
      margin-top: 20rpx;
      background-color: #fff;
      border-radius: 20rpx;

      .good-detail-context-title {
        display: flex;
        justify-content: space-between;
        padding: 24rpx 24rpx 24rpx;

        .good-detail-context-left {
          display: flex;
          align-items: center;

          .good-detail-context-line {
            width: 6rpx;
            height: 28rpx;
            background-image: linear-gradient(180deg, #ff3643, #ffcccf);
            border-radius: 3rpx;
            margin-right: 10rpx;
          }

          .good-detail-context-font {
            font-size: 28rpx;
            font-weight: bold;
          }
        }

        .good-detail-context-right {
          display: flex;
          align-items: center;
          font-size: 24rpx;

          .good-detail-context-down {
            width: 26rpx;
            height: 26rpx;
            margin-left: 10rpx;
          }
        }
      }

      .good-detail-images {
        width: 100%;
        display: block;
      }
    }

    .good-detail-tuijian {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 30rpx;
      font-size: 28rpx;
      font-weight: 700;

      .tuijian-img {
        width: 32rpx;
        height: 28rpx;
        margin-right: 10rpx;
      }
    }

    .good-detail-bottom {
      color: #969799;
      font-size: 26rpx;
      line-height: 80rpx;
      text-align: center;
    }
  }

  .good-detail-footer {
    position: fixed;
    bottom: 0;
    z-index: 10;
    width: 100%;
    background-color: #fff;
  }

  .good-detail-topbtn {
    position: fixed;
    right: 20rpx;
    bottom: 200rpx;
    width: 120rpx;
    z-index: 990;

    .good-detail-topbtn-text {
      margin: 0 auto;
      width: 80rpx;
      height: 80rpx;
      background: #fff;
      box-shadow: 0 4rpx 16rpx 0 rgb(0 0 0 / 18%);
      //display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 200rpx;
      text-align: center;
      font-size: 22rpx;
    }
  }
}
</style>
