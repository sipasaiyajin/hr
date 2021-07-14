import {getToken, setToken, removeToken} from '@/utils/auth'
import { login } from '@/api/user'

// 放置状态
// 数据持久化要和 浏览器缓存 进行结合
const state = {

  // token 为共享状态，默认值为 null
  token: getToken() // 一初始化 vuex 的时候，就先从缓存中读取

}

const mutations = {

  // 第一个参数是 上下文中的 state
  // 第二个参数就是载荷，也就是要修改的值
  setToken(state, token){

    // 设置 vuex中的值
    state.token = token
    // 将最新的token也同步给缓存
    setToken(token)

  },
  // 删除token
  removeToken(state){

    // 将 state中的 token 设置为 null
    state.token = null
    // 将缓存也置空
    removeToken()

  }

}

// 登录的方法
const actions = {

  // data 就是 调用这个方法要传入的 用户名 和 密码
  async login({commit}, data){

    // 调用 api 接口
    // 这个result 已经在响应拦截器那里做过处理了，返回的就是data
    const result = await login(data)

    // 将返回的 token 保存到 state中
    // 调用 mutations 中的 setToken 方法
    // 然后将 result.data.data 这个值传给这个方法
    // 保存到缓存中
    commit("setToken", result)

    

  }

}

export default{

  namespaced: true,
  state,
  mutations,
  actions

}


