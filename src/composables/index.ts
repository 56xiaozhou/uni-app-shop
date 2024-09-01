import { ref } from 'vue'
import type { MyGuessInstance } from '@/components/components'

/**
 * 猜你喜欢组合式函数
 */
export const useGuessList = () => {
  // 获取猜你喜欢组件实例
  const guessRef = ref<MyGuessInstance>()
  // 滚动触底
  const onScrollToLower = () => {
    guessRef.value?.getMore()
  }

  // 返回 ref 和事件处理函数
  return {
    guessRef,
    onScrollToLower,
  }
}
