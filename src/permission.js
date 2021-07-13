import router from '@/router'
import store from '@/store'
// 引入进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 白名单里面的元素不受token的控制
const whiteList = ['/login','/404']
// 权限拦截在路由跳转，导航守卫
// 不需要导出，因为只需要让代码执行就行了
// to 到哪里去， from 从哪里来， next 必须要执行
// next() 放过
// next(false) 跳转中止
// next(地址) 跳转到某个地址
router.beforeEach((to, from, next) => {

  // 开启进度条
  nprogress.start()
  // 如果有 token 
  if(store.getters.token){

    // 判断是否要去login页面，是就跳转到主页面
    if(to.path === '/login'){

      // next(to.path)
      next('/')
    
    // 如果有 token 但是不是要去 login 页面 则 放行
    }else{

      next()

    }

  // 没有token 
  }else{

    // 判断是否在白名单内，在就放行
    if(whiteList.indexOf(to.path) > -1){

      next()
    
    // 不在白名单内，又没有token值，则跳转到 login页面
    }else{

      next("/login")

    }

  }

  // 解决手动切换地址时，进度条不关闭的问题
  nprogress.done()

})

// 当路由守卫之后就关闭进度条
router.afterEach(() => {

  nprogress.done()

})

