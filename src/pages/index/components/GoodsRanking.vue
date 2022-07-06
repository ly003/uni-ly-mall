<template>
  <!-- 全网热销榜 -->
  <view class="ranking">
    <view class="ranking-home">
      <view class="ranking-title">
        <sapn class="ranking-title-name">全网热销榜</sapn>
        <view class="ranking-title-tag" :style="{ backgroundImage: 'url(' + HOT_SELL_BG + ')' }">
          <image class="ranking-title-image" :src="RANK_ICON" />
          <span>实时好货</span>
        </view>
      </view>
      <view class="ranking-row">
        <view class="ranking-col" v-if="rankingList.length > 0">
          <view class="tanking-pic1">
            <span class="tanking-num1" :style="{ backgroundImage: 'url(' + RANK_1_BG + ')' }">{{ rankingList[0].ranking }}</span>
            <view class="ranking-image">
              <image class="ranking-img" :src="rankingList[0].mainPic" mode="widthFix" />
            </view>
          </view>
          <view class="ranking-time1">
            2小时抢{{simplifySales(rankingList[0].twoHoursSales)}}
          </view>
          <view class="ranking-my">
            ￥{{ rankingList[0].actualPrice }}
          </view>
        </view>
        <view class="ranking-col" v-if="rankingList.length > 0">
          <view class="tanking-pic1">
            <span class="tanking-num1" :style="{ backgroundImage: 'url(' + RANK_2_BG + ')' }">{{ rankingList[1].ranking }}</span>
            <view class="ranking-image">
              <image class="ranking-img" :src="rankingList[1].mainPic" mode="widthFix" />
            </view>
          </view>
          <view class="ranking-time2">
            2小时抢{{simplifySales(rankingList[1].twoHoursSales)}}
          </view>
          <view class="ranking-my">
            ￥{{ rankingList[1].actualPrice }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'GoodsRanking'
}
</script>

<script setup>
import request from '@/utils/request';
import { ref } from 'vue';
import { HOT_SELL_BG, RANK_ICON, RANK_1_BG, RANK_2_BG } from '../../../utils/constant';
import UniRow from '@dcloudio/uni-ui/lib/uni-row/uni-row.vue';
import UniCol from '@dcloudio/uni-ui/lib/uni-col/uni-col.vue';
import { simplifySales } from '../../../utils/common'

const rankingList = ref([]);

const fetchRankingList = async () => {
  const { data } = await request({
    url: '/api/goods/get-ranking-list',
    data: {
      version: 'v1.3.0',
      rankType: 1,
      pageId: 1,
      pageSize: 2,
    }
  });
  rankingList.value = data;
};

fetchRankingList();

</script>

<style scoped lang="scss">
.ranking {
  background: #fff;
  border-radius: 10rpx;
  margin-right: 10rpx;
  .ranking-home {
    padding: 0 16rpx 0 16rpx;
    .ranking-title {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
      height: 86rpx;
      .ranking-title-name {
        font-weight: 700;
        font-size: 30rpx;
        color: #333;
      }
      .ranking-title-tag {
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        color: #FF0000;
        font-size: 20rpx;
        height: 28rpx;
        width: 134rpx;
        margin-right: 6rpx;
        .ranking-title-image {
          width: 16rpx;
          height: 14rpx;
          margin: 0 5rpx 0 10rpx;
        }
      }
    }
    .ranking-row {
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      .ranking-col {
        padding: 0 10rpx 0 0;
        box-sizing: border-box;
        display: block;
        width: 50%;
        .tanking-pic1 {
          position: relative;
          z-index: 0;
          overflow: hidden;
          border-radius: 10rpx;
          margin: 0;
          font-size: 0;
          .tanking-num1 {
            background-size: 100% auto;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 10;
            width: 28rpx;
            height: 30rpx;
            line-height: 30rpx;
            text-align: center;
            display: block;
            color: #fff;
            font-size: 24rpx;
          }
          .ranking-image {
            position: relative;
            display: inline-block;
            width: 150rpx;
            .ranking-img {
              width: 150rpx;
              border-radius: 10rpx;
            }
          }
        }
        .ranking-time1 {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 32rpx;
          background-image: linear-gradient(270deg,#ff7300,#ffb717);
          color: #fff;
          font-size: 20rpx;
          padding-left: 10rpx;
          border-radius: 100rpx;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          width: 140rpx;
        }
        .ranking-time2 {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 32rpx;
          background-image: linear-gradient(270deg,#95aebf,#becbd2 99%);
          color: #fff;
          font-size: 20rpx;
          padding-left: 10rpx;
          border-radius: 100rpx;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          width: 140rpx;
        }
        .ranking-my {
          height: 62rpx;
          font-weight: 700;
          font-size: 28rpx;
          color: #ff2b22;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>
