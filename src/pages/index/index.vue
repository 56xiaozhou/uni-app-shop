<script setup lang="ts">
import CustomNavbar from '@/pages/index/components/CustomNavbar.vue'
import MySwiper from '@/components/MySwiper.vue'
import { getHomeBannerAPI } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { BannerItem } from '@/types/home'

const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}

onLoad(() => {
  getHomeBannerData()
})
</script>

<template>
  <CustomNavbar />
  <MySwiper :list="bannerList" />
  <view class="index">index</view>
</template>

<style lang="scss">
//
</style>
