<template>
  <!-- 超级类目 -->
  <view class="category-tab">
    <view class="category-tab-list" v-if="categoryList.length > 0">
      <view class="category-tab-item" v-for="(category,index) in categoryList" :key="index"
      @click="changeCategoryTab(index)">
        <view class="item-title" :class="cid === index && 'active-item-title'">{{ category.cname }}</view>
        <span class="item-text" :class="cid === index && 'active-item-text'">{{ category.subcategories[0].subcname }}</span>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'CategoryTab'
}
</script>

<script setup>
import request from '@/utils/request';
import { ref } from 'vue';
defineProps({
  cid: {
    type: Number,
    default: 0
  }
});

const emits = defineEmits(['change'])
const changeCategoryTab = index => {
  emits('change', index)
}

const categoryList = ref([]);

const fetchCategoryList = async () => {
  const { data } = await request({
    url: '/api/category/get-super-category',
    data: {
      version: 'v1.1.0',
    }
  });
  let sortedList = data.sort((a, b) => {
    return a.cid - b.cid;
  });
  // 从头部插入数据
  sortedList.unshift({
    cid: 0,
    cname: '精选',
    subcategories: [
      { subcname: '精选好物' }
    ],
  });
  categoryList.value = sortedList;
};

fetchCategoryList();

</script>

<style scoped lang="scss">
.category-tab {
  width: 100%;
  overflow-x: auto;

  &::-webkit-scrollbar {
    //隐藏滚动条
    display: none;
  }

  .category-tab-list {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    box-sizing: border-box;
    width: 100vw;
    padding: 6rpx 16rpx 10rpx 16rpx;
    .category-tab-item {
      flex: none;
      width: 180rpx;
      text-align: center;
      .item-title {
        font-weight: 600;
        font-size: 33rpx;
        color: #333;
        margin-bottom: 5rpx;
      }
      .active-item-title {
        color: #f21724;
      }
      .item-text {
        font-size: 24rpx;
        color: #999;
        height: 28rpx;
        padding: 5rpx 16rpx;
      }
      .active-item-text {
        background-image: linear-gradient(90deg,#ff4a5f,#f21724);
        height: 24rpx;
        color: #fff;
        border-radius: 180rpx;
      }
    }
  }
}
</style>
