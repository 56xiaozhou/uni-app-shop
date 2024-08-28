// src/types/components.d.ts
import MySwiper from '@/components/MySwiper.vue'
import MyGuess from '@/components/MyGuess.vue'

declare module 'vue' {
  export interface GlobalComponents {
    MySwiper: typeof MySwiper
    MyGuess: typeof MyGuess
  }
}

// 组件实例类型
export type MyGuessInstance = InstanceType<typeof MyGuess>
