<template>
  <!-- 限时秒杀 -->
  <view class="ddq">
    <view class="ddq-home">
      <view class="ddq-title">
        <sapn class="ddq-title-name">限时秒杀</sapn>
        <view class="ddq-title-tag" :style="{ backgroundImage: 'url(' + DDQ_TAG_BG + ')' }">
          <span class="ddq-title-time">{{ ddqTime }}点场</span>
          <view class="ddq-title-countdown">{{ countdown }}</view>
        </view>
      </view>
      <UniRow class="ddq-row">
        <UniCol :span="12" class="ddq-col" v-if="ddqList.length > 0">
          <view class="tanking-pic1">
            <view class="ddq-image">
              <image class="ddq-img" :src="ddqList[0].mainPic" mode="widthFix" />
            </view>
          </view>
          <view class="ddq-text">
            {{ ddqList[0].specialText[0] }}
          </view>
          <view class="ddq-my">
            ￥{{ ddqList[0].actualPrice }}
          </view>
        </UniCol>
        <UniCol :span="12" class="ddq-col" v-if="ddqList.length > 0">
          <view class="tanking-pic1">
            <view class="ddq-image">
              <image class="ddq-img" :src="ddqList[1].mainPic" mode="widthFix" />
            </view>
          </view>
          <view class="ddq-text">
            {{ ddqList[1].specialText[0] }}
          </view>
          <view class="ddq-my">
            ￥{{ ddqList[1].actualPrice }}
          </view>
        </UniCol>
      </UniRow>
    </view>
  </view>
</template>

<script>
export default {
  name: 'DdqGoods'
}
</script>

<script setup>
import request from '@/utils/request';
import { ref } from 'vue';
import { DDQ_TAG_BG } from '../../../utils/constant';
import UniRow from '@dcloudio/uni-ui/lib/uni-row/uni-row.vue';
import UniCol from '@dcloudio/uni-ui/lib/uni-col/uni-col.vue';

const ddqList = ref([]);
const ddqTime = ref('');
const countdown = ref('00:00:00')

const fetchDdqList = async () => {
  const { data } = await request({
    url: '/api/category/ddq-goods-list',
    data: {
      version: 'v1.2.1',
    }
  });
  ddqList.value = data.goodsList;
  ddqTime.value = new Date(data.ddqTime).getHours();
  // 倒计时开始时间计算
  // 找到当前场次的index
  const index = data.roundsList.findIndex(item => item.ddqTime == data.ddqTime)
  let nextDdqTime;
  if(index >= 0 && index == data.roundsList.length - 1) {
    nextDdqTime = data.roundsList[0].ddqTime;
  } else if(index >= 0 && index < data.roundsList.length - 1) {
    nextDdqTime = data.roundsList[index + 1].ddqTime;
  }
  // 计算下一场次与当前的时间差
  const time1 = Date.parse(new Date());
  const time2 = Date.parse(new Date(nextDdqTime));
  const ms = time2 - time1;
  // 计算出小时数
  const hour = Math.floor(ms / (3600 * 1000));
  // 计算出除小时之外剩下的毫秒数
  let leave1 = ms % (3600 * 1000);
  // 计算出分钟数
  const minute = Math.floor(leave1 / (60 * 1000));
  // 计算出剩下的秒数
  let leave2 = leave1 % (60 * 1000);
  const second = Math.floor(leave2 / 1000);
  setCountDown(hour, minute, second, Math.floor(ms / 1000))
};

fetchDdqList();

// 倒计时
const setCountDown = (hour, minute, second, leave) => {
  countdown.value = (hour<10?'0'+hour:hour) + ':' + (minute<10?'0'+minute:minute) + ':' + (second<10?'0'+second:second);
  setTimeout(() => {
    leave = leave - 1;
    if (second > 0) {
      second = second - 1;
    } else if (second == 0 && (minute > 0 || hour > 0)) {
      second = 59;
      if(minute > 0) {
        minute = minute - 1;
      } else if (minute == 0) {
        minute = 59;
        if (hour > 0) {
          hour = hour - 1;
        }
      }
    } else if(second == 0 && minute == 0 && hour == 0) {
      fetchDdqList();
    }
    if(leave >= 0) {
      setCountDown(hour, minute, second, leave)
    }
  },1000);
};

</script>

<style scoped lang="scss">
.ddq {
  background: #fff;
  border-radius: 10rpx;
  margin-left: 10rpx;
  .ddq-home {
    padding: 0 16rpx 0 16rpx;
    .ddq-title {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
      height: 86rpx;
      .ddq-title-name {
        font-weight: 700;
        font-size: 30rpx;
        color: #333;
      }
      .ddq-title-tag {
        opacity: 1;
        background-size: 100% 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: #fff;
        font-size: 20rpx;
        height: 28rpx;
        width: 180rpx;
        margin-right: 6rpx;
        .ddq-title-time {
          white-space: nowrap;
          text-align: center;
          display: inline-block;
          width: 64rpx;
        }
        .ddq-title-countdown {
          font-size: 20rpx;
          display: inline;
          color: #ff6101;
          position: relative;
          top: 2rpx;
          margin-left: 20rpx;
          line-height: 40rpx;
        }
      }
    }
    .ddq-row {
      .ddq-col {
        padding: 0 10rpx 0 0;
        .tanking-pic1 {
          position: relative;
          z-index: 0;
          overflow: hidden;
          border-radius: 10rpx;
          margin: 0;
          font-size: 0;
          .ddq-image {
            position: relative;
            display: inline-block;
            width: 150rpx;
            .ddq-img {
              width: 150rpx;
              border-radius: 10rpx;
            }
          }
        }
        .ddq-text {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 32rpx;
          box-shadow: 0 2rpx 6rpx 0 rgb(244 92 0 / 14%);
          color: #ff7301;
          background: #fff;
          font-size: 20rpx;
          padding-left: 10rpx;
          border-radius: 100rpx;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          width: 140rpx;
        }
        .ddq-my {
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
