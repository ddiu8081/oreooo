<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { formattedOreoStr } from '../utils'
import Button from '../components/Button.vue'
import Canvas from '../components/Canvas.vue'

const emit = defineEmits<{
  (e: 'back'): void
}>()
const props = defineProps<{
  oreoList: OreoKey[]
}>()

const { t } = useI18n()
const oreoFormattedStr = $computed(() => {
  const copyList = [...props.oreoList]
  if (copyList.length > 0 && copyList[copyList.length - 1] === '-') {
    copyList.pop()
  }
  return formattedOreoStr(copyList, t)
})

const handleClick = () => {
  console.log(props.oreoList)
  emit('back')
}

</script>

<template>
  <main flex="~ col" bg-white w-full p-8 max-w-96 rounded-xl shadow="md black/5">
    <header>
      <h1 text="center 2xl" font-bold>{{ t('output.meta') }}</h1>
    </header>
    <main text-center py-4>
      <div text-3xl mb-6>{{ oreoFormattedStr }}</div>
      <Canvas :input="props.oreoList" />
    </main>
    <div flex justify-center gap-4 mt-4>
      <Button @click="handleClick">{{ t('output.back') }}</Button>
    </div>
  </main>
</template>
