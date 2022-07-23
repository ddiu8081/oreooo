<script setup lang="ts">
  import Home from './pages/Home.vue'
  import Result from './pages/Result.vue'
  import Loading from './components/Loading.vue'
import { onMounted } from 'vue';

  let oreoList = $ref<OreoKey[]>([])
  let loading = $ref(true)
  let animating = $ref(true)

  onMounted(() => {
    setTimeout(() => {
      loading = false
    }, 1000)
  })

  const handleSubmit = (newList: OreoKey[]) => {
    loading = true
    console.log('loading', loading)
    setTimeout(() => {
      loading = false
      console.log('loading', loading)
    }, 1000)

    oreoList = [...newList]
  }
</script>

<template>
  <div
    flex="~ col" items-center box-border
    min-h-screen w-screen
    bg="#caad9f" p-12
  >
    <div v-show="animating" absolute inset-0 flex items-center justify-center>
      <Transition
        appear name="bounce"
        @before-enter="animating = true"
        @after-leave="animating = false"
      >
        <Loading v-show="loading" />
      </Transition>
    </div>
    <template v-if="!loading && !animating">
      <Home v-if="!oreoList.length" @submit="handleSubmit" />
      <Result v-else :oreoList="oreoList" @back="oreoList=[]" />
    </template>
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  font-family: "Seto", sans-serif;
}

@font-face {
    font-family: "Seto";
    src: url("./assets/fonts/Seto.woff") format("woff"),
        url("./assets/fonts/Seto.ttf") format("truetype");
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
