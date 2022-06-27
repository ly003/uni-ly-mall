<template>
  <!-- 超级类目 -->
  <view class="category">
    <view class="category-list">
      <view class="category-item">
        <view class="category-title">超级类目</view>
        <view class="category-text">更多</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import request from '@/utils/request';
import { ref } from 'vue';
defineProps({
  cid: {
    type: Number,
    default: 0
  }
});

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
.category {
  background: #f7f7f7;
}
</style>
