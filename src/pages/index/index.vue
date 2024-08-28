<script setup lang="ts">
import CustomNavbar from '@/pages/index/components/CustomNavbar.vue'
import MySwiper from '@/components/MySwiper.vue'
import CategoryPanel from '@/pages/index/components/CategoryPanel.vue'
import HotPanel from '@/pages/index/components/HotPanel.vue'
import MyGuess from '@/components/MyGuess.vue'
import PageSkeleton from '@/pages/index/components/PageSkeleton.vue'

import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import type { MyGuessInstance } from '@/components/components'

// 获取轮播图数据
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}

// 获取前台分类数据
const categoryList = ref<CategoryItem[]>([])
// 获取前台分类数据
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.result
}

// 获取热门推荐数据
const hotList = ref<HotItem[]>([])
// 获取热门推荐数据
const getHomeHotData = async () => {
  const res = await getHomeHotAPI()
  hotList.value = res.result
}

// 获取猜你喜欢组件实例
const guessRef = ref<MyGuessInstance>()
// 滚动触底
const onScrollToLower = () => {
  console.log('滚动触底啦')
  guessRef.value?.getMore()
}

const isTriggered = ref(false)

// 自定义下拉刷新触发
const onRefresherRefresh = async () => {
  // console.log(11)
  // 开始动画
  isTriggered.value = true
  // 加载数据
  // await getHomeBannerData()
  // await getHomeCategoryData()
  // await getHomeHotData()
  // 重置猜你喜欢组件的数据
  guessRef.value?.resetData()
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()])
  // 重新获取猜你喜欢组件的数据
  guessRef.value?.getMore()
  // 关闭动画
  isTriggered.value = false
}

// 是否加载中-标记
const isLoading = ref(false)

// 页面加载
onLoad(async () => {
  isLoading.value = true
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()])
  isLoading.value = false
})
</script>

<template>
  <!-- 自定义导航栏 -->
  <CustomNavbar />
  <!-- 可滚动视图区域 -->
  <scroll-view
    class="scroll-view"
    scroll-y
    refresher-enabled
    :refresher-triggered="isTriggered"
    @scrolltolower="onScrollToLower"
    @refresherrefresh="onRefresherRefresh"
  >
    <!-- 骨架屏 -->
    <PageSkeleton v-if="isLoading" />
    <template v-else>
      <!-- 自定义轮播图 -->
      <MySwiper :list="bannerList" />
      <!-- 分类面板 -->
      <CategoryPanel :list="categoryList" />
      <!-- 热门推荐 -->
      <HotPanel :list="hotList" />
      <!-- 猜你喜欢-->
      <MyGuess ref="guessRef" />
    </template>
  </scroll-view>
</template>

<style lang="scss">
page {
  height: 100%;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  flex: 1;
}
</style>
