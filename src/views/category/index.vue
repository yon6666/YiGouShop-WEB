<template>
    <div class="top-category">
        <div class="container">
            <XtxBread>
                <XtxBreadItem :to="{path:'/'}">首页</XtxBreadItem>
                <XtxBreadItem to="/category/1005000">电器</XtxBreadItem>
                <XtxBreadItem>空调</XtxBreadItem>
            </XtxBread>
     </div>
    </div>
</template>
<script>

export default {
    name: 'TopCategory'
}
</script>
<style scoped lang="less"></style>
