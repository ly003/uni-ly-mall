<template>
  <view class="category">
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const title = ref('分类')
</script>

<style lang="scss" scoped>
.category {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
