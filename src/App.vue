<!--
 * @Author: LX_DUG
 * @Date: 2022-11-24 20:51:51
 * @LastEditors: LX_DUG
 * @LastEditTime: 2022-11-30 22:51:51
 * @Description: description
-->
<template>
  <div class="main">
    <router-view />
  </div>
  
</template>

<script lang="ts" setup>

</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}
.main {
  height: 100%;
  position: relative;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.main::-webkit-scrollbar {
  display: none;
}
</style>
