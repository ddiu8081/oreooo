<template>
  <div>
    <img class="spin" h-32 w-32 src="../assets/images/oreo.png" alt="loading" />
  </div>
</template>

<style scoped>
.spin {
  animation: spin 6s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>