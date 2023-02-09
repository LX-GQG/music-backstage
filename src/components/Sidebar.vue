<!--
 * @Author: LX_DUG
 * @Date: 2022-11-29 09:36:14
 * @LastEditors: LX_DUG
 * @LastEditTime: 2023-01-29 15:39:30
 * @Description: 侧边栏
-->
<template>
  <el-menu
    router
    :default-active="next"
    active-text-color="#b37df1"
    class="el-menu-vertical-demo sliderHeight"
    :collapse="isCollapse"
  >
    <div class="header-logo">
        <img src="@/assets/img/logo.png" alt="logo">
        <span class="logo-name" v-if="!isCollapse">玥愔</span>
    </div>
    <template v-for="value in menu">
      <div v-if="value.hidden !== true">
        <el-sub-menu v-if="value.child.length > '0'" :index="value.path" :key="value.path">
            <template #title>
                <component :is="value.child.icon" style="width: 16px; height:16px"/>
                <span class="router-name">{{ value.child.name }}</span>
            </template>
            <el-menu-item-group>
                <el-menu-item :index="value.child.name">{{ value.child.name }}</el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item v-else :index="value.path" :key="value.name">
            <component :is="value.icon" style="width: 16px; height:16px"/>
            <span class="router-name">{{ value.name }}</span>
        </el-menu-item>
      </div>
        
    </template>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { menuRouter } from "@/router";
import { ref } from "vue";
import { useRouter } from "vue-router";
import emitter from '@/utils/eventBus';

export default defineComponent({
    setup() {
      const router = useRouter()
      const menu = menuRouter
      const isCollapse:any = ref(false);
      const next:any = ref()

      const goDefaultPage = (menus: string | any[]) => {
          if (menus && menus.length > 0) {
            const path = router.currentRoute.value.path
            // 如果当前路径是子菜单，则打开子菜单，否则打开第一个子菜单
            // 页面使用了菜单项的route作为index
            next.value = path.split("/").length>=2 ? path : menu[0].path;
            router.replace(next);
          }
      }

      goDefaultPage(menu)

      emitter.on('changToggle', (data) => {
          isCollapse.value = data
      })

      return {
        menu,
        isCollapse,
        next,
        goDefaultPage
      }     
    },
})

</script>

<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  max-width: 200px;
  min-height: 100%;
}
.el-menu-item:hover {
  background-color: #f7eeff;
}
.router-name {
  margin-left: 10px;
  transform: width 0.4s;
}
.header-logo {
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo-name {
      margin-left: 15px;
      font-family: cursive;
      font-size: 21px;
      background-image:-webkit-linear-gradient(135deg,#84d1fb, #8782f5, #dc78f7); 
      -webkit-background-clip:text;
      background-clip:text;
      -webkit-text-fill-color:transparent;
      transform: width 0.4s;
  }
  img {
      width: 35px;
      height: 35px;
  }
}
.menu-item {
  display: flex;
  align-items: center;
}
</style>
