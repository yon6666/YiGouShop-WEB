<template>
    <div class='home-category'>
      <ul class="menu">
        <li v-for="i in 10" :key="i">
          <RouterLink to="/">居家</RouterLink>
          <RouterLink to="/">洗漱</RouterLink>
          <RouterLink to="/">清洁</RouterLink>
        </li>
      </ul>
    </div>
  </template>

  <script>
  export default {
    name: 'HomeCategory'
  }
  </script>

  <style scoped lang='less'></style>
