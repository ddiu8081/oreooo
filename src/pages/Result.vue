<script setup lang="ts">
import { formattedOreoStr } from '../utils'
import Button from '../components/Button.vue'
import Canvas from '../components/Canvas.vue'

const emit = defineEmits<{
  (e: 'back'): void
}>()

const props = defineProps<{
  oreoList: OreoKey[]
}>()
const oreoFormattedStr = $computed(() => formattedOreoStr(props.oreoList))

const handleClick = () => {
  console.log(props.oreoList)
  emit('back')
}

</script>

<template>
  <main flex="~ col" bg-white w-full p-8 max-w-96 rounded-xl shadow="md black/5">
    <header>
      <h1 text="center 2xl" font-bold>這是你的</h1>
    </header>
    <main text-center py-4>
      <div text-3xl mb-6>{{ oreoFormattedStr }}</div>
      <Canvas :input="props.oreoList" />
    </main>
    <div flex justify-center gap-4 mt-4>
      <Button @click="handleClick">返回</Button>
    </div>
  </main>
</template>
