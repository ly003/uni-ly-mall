<template>
  <view class="search-filter" :style="{ top: (systemInfo.statusBarHeight + 44) + 'px' }">
    <view class="filter-list">
      <view class="filter-item" @click="setSort(0)" :class="props.sort == 0 && 'active-filter'">综合推荐</view>

      <view class="filter-item" @click="toggleSalesSort"
        :class="(props.sort == 1 || props.sort == 2) && 'active-filter'">
        销量
        <image v-if="props.sort == 1" src="@/static/images/search/desc.png" class="icon-sort-desc" />
        <image v-else-if="props.sort == 2" src="@/static/images/search/asc.png" class="icon-sort-asc" />
        <image v-else src="@/static/images/search/default.png" class="icon-sort-asc" />
      </view>

      <view class="filter-item" @click="toggleCommissionSort"
        :class="(props.sort == 3 || props.sort == 4) && 'active-filter'">
        佣金比例
        <image v-if="props.sort == 4" src="@/static/images/search/desc.png" class="icon-sort-desc" />
        <image v-else-if="props.sort == 3" src="@/static/images/search/asc.png" class="icon-sort-asc" />
        <image v-else src="@/static/images/search/default.png" class="icon-sort-asc" />
      </view>

      <view class="filter-item" @click="togglePriceSort"
        :class="(props.sort == 5 || props.sort == 6) && 'active-filter'">
        价格
        <image v-if="props.sort == 5" src="@/static/images/search/desc.png" class="icon-sort-desc" />
        <image v-else-if="props.sort == 6" src="@/static/images/search/asc.png" class="icon-sort-asc" />
        <image v-else src="@/static/images/search/default.png" class="icon-sort-asc" />
      </view>

    </view>
  </view>
</template>
<script setup>
const props = defineProps({
  sort: {
    type: [Number, String],
    default: 0
  }
})

const systemInfo = uni.getSystemInfoSync();

const emits = defineEmits(['sort'])
// 排序规则 默认为0 0-综合排序，1-销量从高到低，2-销量从低到高，3-佣金比例从低到高，4-佣金比例从高到低，5-价格从高到低，6-价格从低到高
const setSort = (sort) => {
  emits('sort', sort)
}

const toggleSalesSort = () => {
  if (props.sort == 1) {
    setSort(2)
  } else {
    setSort(1)
  }
}

const toggleCommissionSort = () => {
  if (props.sort == 4) {
    setSort(3)
  } else {
    setSort(4)
  }
}

const togglePriceSort = () => {
  if (props.sort == 5) {
    setSort(6)
  } else {
    setSort(5)
  }
}

</script>
<style lang="scss" scoped>
.search-filter {
  background: #fff;
  padding: 26rpx;
  position: sticky;
  top: 91px;
  z-index: 100;
  box-sizing: border-box;

  .filter-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 20rpx;

    .filter-item {
      font-size: 26rpx;
      color: #666;
      line-height: 36rpx;
      vertical-align: center;

      .icon-sort-desc {
        width: 24rpx;
        height: 24rpx;
        will-change: transform;
      }

      .icon-sort-asc {
        width: 24rpx;
        height: 24rpx;
        will-change: transform;
      }
    }

    .active-filter {
      color: #000;
      font-weight: 500;
    }
  }
}
</style>
