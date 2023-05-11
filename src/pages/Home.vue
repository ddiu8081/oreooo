<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { onKeyStroke } from '@vueuse/core'
import { formattedOreoStr, generateRandomOreoKey } from '../utils'
import Button from '../components/Button.vue'
import SiteFooter from '../components/SiteFooter.vue'

const emit = defineEmits<{
  (e: 'submit', value: OreoKey[]): void
}>()

const { t } = useI18n()
let oreoList = $ref<OreoKey[]>([])
const oreoFormattedStr = $computed(() => formattedOreoStr(oreoList, t))

onMounted(() => {
  addKeyBindings()
})

const addKeyBindings = () => {
  onKeyStroke('o', e => addSlice('o'))
  onKeyStroke('r', e => addSlice('r'))
  onKeyStroke(['-', ' '], e => addSlice('-'))
  onKeyStroke('Backspace', e => addSlice('-1'))
  onKeyStroke('Enter', handleClick)
}

const handleClick = () => {
  emit('submit', oreoList)
}

const addSlice = (key: OreoKey | '-1') => {
  switch (key) {
    case 'o':
    case 'r':
      oreoList.push(key)
      break;
    case '-':
      if (oreoList.length > 0 && oreoList[oreoList.length - 1] !== '-') {
        oreoList.push('-')
      }
      break;
    case '-1':
      oreoList.pop()
  }
}

const generateRandomOreo = () => {
  const keyList = generateRandomOreoKey()
  oreoList = []
  keyList.forEach(item => {
    addSlice(item)
  })
  if (oreoList[oreoList.length - 1] === '-') {
    oreoList.pop()
  }
}

</script>

<template>
  <main flex="~ col" bg-white w-full max-w-96 p-8 rounded-xl shadow="md black/5">
    <header>
      <h1 text="center 2xl" font-bold>{{ t('input.meta') }}</h1>
    </header>
    <main py-4>
      <div
        flex="~" items-center
        text-3xl
        px-4 py-2
        bg-truegray-100 rounded-xl
        border="~ truegray-200"
        :class="[oreoList.length ? 'text-truegray-700' : 'text-truegray-300']"
      >
        <div flex-1 text-center overflow-auto break-all>{{ oreoFormattedStr }}</div>
        <div
          v-show="!oreoList.length"
          p-2 rounded-md
          cursor-pointer
          text="truegray-400 xl"
          hover="text-truegray-600 bg-truegray-100"
          class="umami--click--input_random_ck"
          @click="generateRandomOreo"
        >
          <div i-gg-dice-3 />
        </div>
        <div
          v-show="oreoList.length"
          p-2 rounded-md
          cursor-pointer
          text="truegray-400 xl"
          hover="text-truegray-600 bg-truegray-100"
          class="umami--click--input_clear_ck"
          @click="oreoList = []"
        >
          <div i-gg-close />
        </div>
      </div>
      <div flex py-6 justify-center gap-4 select-none>
        <Button @click="addSlice('o')">{{ t('input.btn.o') }}</Button>
        <Button @click="addSlice('r')">{{ t('input.btn.r') }}</Button>
        <Button @click="addSlice('-')">{{ t('input.btn.and') }}</Button>
        <Button @click="addSlice('-1')">-1</Button>
      </div>
    </main>
    <footer
      flex items-center justify-center
      h-16 mx="-8" mb="-8"
      text="white xl"
      bg-truegray-700
      :cursor="oreoList.length ? 'pointer' : 'not-allowed'"
      :hover="oreoList.length ? 'bg-truegray-800 text-2xl' : ''" 
      rounded-b-xl select-none
      @click="handleClick"
    >
      {{ t('input.generate') }}
    </footer>
  </main>
  <SiteFooter />
</template>
