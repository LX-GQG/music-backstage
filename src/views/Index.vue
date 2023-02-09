<!--
 * @Author: LX_DUG
 * @Date: 2022-11-25 14:02:57
 * @LastEditors: LX_DUG
 * @LastEditTime: 2022-12-28 14:12:13
 * @Description: description
-->
<template>
    <div class="content">
        <el-container>
            <el-aside :class="isCollapse">
                <admin-sidebar></admin-sidebar>
            </el-aside>
            <el-container>
                <el-header class="el-header"><admin-header></admin-header></el-header>
                <el-main class="el-main"><router-view></router-view></el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import adminHeader from '@/components/Header.vue'
import AdminSidebar from '@/components/Sidebar.vue'
import emitter from '@/utils/eventBus';
import { ref } from 'vue';

component:{
    adminHeader
    AdminSidebar
}

const isCollapse = ref('collapse')

emitter.on('changToggle', (data) => {
    if (data) {
        isCollapse.value = 'aside'
    } else {
        isCollapse.value = 'collapse'
    }
})

</script>

<style lang="scss" scoped>
    .content {
        height: 100%;
        display: flex;
    }
    .aside {
        height: 100%;
        width: auto;
    }
    .collapse {
        width: 200px !important;
    }
    .el-header,.el-main {
        padding: 0;
    }
    .el-header {
        z-index: 10;
    }
    .el-main {
        background-color: rgb(251, 248, 255, 0.9);
    }
    .content::-webkit-scrollbar {
        display: none;
    }
    .el-main::-webkit-scrollbar {
        display: none;
    }
</style>