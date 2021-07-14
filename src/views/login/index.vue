<template>
  <div class="login-container">
    <!-- 1. :model :rules 是表单校验规则 是必不可少的-->
    <el-form 
      ref="loginForm" 
      :model="loginForm" 
      :rules="loginRules" 
      class="login-form" 
      auto-complete="on" 
      label-position="left">

      <!-- 这是放置图标图片的 -->
      <div class="title-container">
        <h3 class="title">

          <img src="@/assets/common/login-logo.png" alt="">

        </h3>
      </div>

      <!-- 2. prop 是校验表单必填的属性，这里是校验 username -->
      <el-form-item prop="mobile">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <!-- porp 绑定的名称和这里的 loginForm.username是对应的 -->
        <!-- 3. 必须使用 双向绑定 v-model 要校验的字段 -->
        <el-input
          ref="username"
          v-model="loginForm.mobile"
          placeholder="请输入手机号"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <!-- @keyup.enter.native 是事件修饰符 
             enter 是监听案件事件
             native 是监听组件的原生事件
        -->
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <!-- 这是登录按钮，给这个按钮添加类名 -->
      <el-button 
        class="loginBtn"
        :loading="loading" 
        type="primary" 
        style="width:100%;margin-bottom:30px;" 
        @click.native.prevent="handleLogin">登录</el-button>

      <!-- 账号密码的显示 -->
      <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: 111111</span>
      </div>

    </el-form>
  </div>
</template>

<script>
// 这是工具函数库中的校验规则
import { validMobile } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    // 这是校验用户名的数据
    // rule 规则； 
    // value 是当前要校验的表单的值； 
    // callback 是传入的回调函数，校验成功或者失败都要有一个提示信息
    const validateMobile = (rule, value, callback) => {
      // 结果为 false 就 提示错误信息
      if (!validMobile(value)) {
        callback(new Error('手机号格式不正确'))
      } else {
        callback()
      }
    }
    // 这是校验密码的数据
    // const validatePassword = (rule, value, callback) => {
    //   if (value.length < 16) {
    //     callback(new Error('The password can not be less than 6 digits'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      // 表单校验对象
      loginForm: {
        mobile: '13800000002',
        password: '123456'
      },
      // 定义表单校验规则
      loginRules: {
        // 这是el特有的校验规则方式，就是使用数组的形式来校验
        // validator 是自定义校验函数
        mobile: [
          // 失去焦点就显示手机号不能为空的错误信息
          { required: true, trigger: 'blur', message: "手机号不能为空"},
          {validator: validateMobile, trigger: 'blur'}
        ],
        password: [
          { required: true, trigger: 'blur', message: '密码不能为空'},
          {trigger: 'blur', min:6, max: 16, message: '密码长度在6 ~ 16位之间'}
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      // 校验表单内容
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  // 设置背景图片
  background-image: url('~@/assets/common/login.jpg'); // 设置背景图片
  background-position: center; // 将图片位置设置为充满整个屏幕
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  // 这是设置输入表单整体背景色
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.7); // 输入登录表单的背景色
    border-radius: 5px;
    color: #454545;
  }

  // 设置表单错误提示的字体颜色
  .el-form-item__error {
    color: #fff
  }

  // 登录按钮的样式
  .loginBtn {
    background: #407ffe;
    height: 64px;
    line-height: 32px;
    font-size: 18px;
    border-radius: 14px;
  }
  
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
// 这是手机号和密码的字体颜色
// $light_gray:#eee;
$light_gray: #68b0fe;


.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
