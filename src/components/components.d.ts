// src/types/components.d.ts
import MySwiper from '@/components/MySwiper.vue'
import MyGuess from '@/components/MyGuess.vue'

declare module 'vue' {
  export interface GlobalComponents {
    MySwiper: typeof MySwiper
    MyGuess: typeof MyGuess
  }
}

export type MySwiperInstance = InstanceType<typeof MySwiper>
export type MyGuessInstance = InstanceType<typeof MyGuess>
