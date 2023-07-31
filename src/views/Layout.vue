<template>
<AppTopnav/>

<header>2222</header>

<div class="main">
    <router-view></router-view>
</div>

<footer>4444</footer>

</template>

<script>
import AppTopnav from '@/components/app-topnav'
export default {
    name: 'Layout',
    components: { AppTopnav }
}
</script>

<style scoped lang="less"></style>
