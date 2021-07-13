import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
// 将SvgIcon 组件注册到全局
Vue.component('svg-icon', SvgIcon)

// 加载所有 .svg 结尾的文件
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
