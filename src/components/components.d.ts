// src/types/components.d.ts
import MySwiper from './MySwiper.vue'

declare module 'vue' {
  export interface GlobalComponents {
    MySwiper: typeof MySwiper
  }
}
