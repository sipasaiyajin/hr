<template>
  <div v-if="!item.hidden">
    <!-- 绑定方法 hasOneShowingChild(路由下的子路由，路由对象) -->
    <template 
      v-if="hasOneShowingChild(item.children,item) 
      && (!onlyOneChild.children||onlyOneChild.noShowingChildren)
      && !item.alwaysShow">
      <!-- meta 就是 路由携带的属性，我们可以根据这一属性来对路由做进一步的判断 
           如果有 路由携带 meta 属性就 跳转到指定的路由
      -->
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item 
          :index="resolvePath(onlyOneChild.path)" 
          :class="{'submenu-title-noDropdown':!isNest}">
          <item 
          :icon="onlyOneChild.meta.icon 
          ||(item.meta&&item.meta.icon)" 
          :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    // 接收路由路径
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  methods: {
    // 第一个参数默认值是一个空数组，第二个参数是路由对象
    hasOneShowingChild(children = [], parent) {
      
      // 遍历路由数组
      const showingChildren = children.filter(item => {
        // 如果路由的hidden属性为真 就返回false
        // 如果路由的hidden为true 就将路由赋值给 onlyOneChild，然后返回true
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      // 如果当前路由只有一个路由，就返回true
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      // 如果路由只有一个也显示
      if (showingChildren.length === 0) {
        // 将路由，还有 path，还有noShowingChildren添加到onlyOneChild 对象中
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      // 都不满足就返回false 就是不显示左侧的导航栏
      return false
    },
    // 接收路由
    resolvePath(routePath) {
      // 如果路由是负责要求的路由，是就返回这个路由
      if (isExternal(routePath)) {
        return routePath
      }
      // 判断是否是基础路由
      if (isExternal(this.basePath)) {
        return this.basePath
      }

      // 将基本路由和路由拼接起来
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
