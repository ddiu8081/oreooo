<script setup lang="ts">
import { formattedOreoStr, generateRandomOreoKey } from '../utils'
import Button from '../components/Button.vue'

const emit = defineEmits<{
  (e: 'submit', value: OreoKey[]): void
}>()

let oreoList = $ref<OreoKey[]>([])
const oreoFormattedStr = $computed(() => formattedOreoStr(oreoList))

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
      if (oreoList.length > 1 && oreoList[oreoList.length - 1] !== '-') {
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
      <h1 text="center 2xl" font-bold>我想要：</h1>
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
        <div flex-1 text-center>{{ oreoFormattedStr }}</div>
        <div
          v-show="!oreoList.length"
          p-2 rounded-md
          cursor-pointer
          text="truegray-400 xl"
          hover="text-truegray-600 bg-truegray-100"
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
          @click="oreoList = []"
        >
          <div i-gg-close />
        </div>
      </div>
      <div flex py-6 justify-center gap-4>
        <Button @click="addSlice('o')">O</Button>
        <Button @click="addSlice('r')">Re</Button>
        <Button @click="addSlice('-')">And</Button>
        <Button @click="addSlice('-1')">-1</Button>
      </div>
    </main>
    <footer
      flex items-center justify-center
      h-16 mx="-8" mb="-8"
      text="white xl"
      bg-truegray-700
      cursor-pointer
      hover="bg-truegray-800 text-2xl" rounded-b-xl
      @click="handleClick"
    >
      生成
    </footer>
  </main>
</template>
