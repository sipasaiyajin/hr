import axios from 'axios'
import { Message } from "element-ui"

// request 环境变量和异常处理
const service = axios.create({

  // 当执行 npm run dev 就去读取 env.development 里面的内容 => /api 就可以触发代理服务器
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // 设置超时时间

})

service.interceptors.request.use(

  config => {



  }

)

// 参数是两个回调函数
// 一个是响应成功要执行的回调函数
// 一个是响应失败要执行的回调函数
service.interceptors.response.use(response => {

  // axios 默认加了一层 data
  const {success, message, data} = response.data

  // 要根据 success 的成功与否 决定下一步操作
  if(success){

    return data

  }else {

    Message.error(message) // 提示错误消息
    // 还是要将错误信息返回，为了让 调用者的catch()进行捕获
    return Promise.reject(new Error(message))

  }

}, error => {

  Message.error(error.message) // 提示错误信息
  return Promise.reject(error) // 返回执行错误，让当前的执行链跳出成功 进入 catch
  // this.login().then().catch() // 就是为了让错误进入catch

})

export default service



