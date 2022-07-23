<script setup lang="ts">
  import Home from './pages/Home.vue'
  import Result from './pages/Result.vue'

  let oreoList = $ref<OreoKey[]>([])

  const handleSubmit = (newList: OreoKey[]) => {
    oreoList = [...newList]
  }
</script>

<template>
  <div
    flex="~ col" items-center box-border
    min-h-screen w-screen
    bg="#caad9f" p-12
  >
    <Home v-if="!oreoList.length" @submit="handleSubmit" />
    <Result v-else :oreoList="oreoList" @back="oreoList=[]" />
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
</style>
