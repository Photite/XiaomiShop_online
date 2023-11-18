<template>
  <el-dialog
    v-model="showLogin"
    title="登录"
    center
    width="22%"
    :before-close="handleClose"
  >
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
  >
    <el-form-item prop="name">
      <el-input :prefix-icon="User" placeholder="请输入账号" v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item prop="password">
      <el-input :prefix-icon="View" placeholder="请输入密码" v-model="ruleForm.password" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
    </el-form-item>
  </el-form>
  </el-dialog>
</template>
<script setup>
// 导入请求api
import {$login} from '../api/user'
// 导入图标
import {User,View} from '@element-plus/icons-vue'
// 导入通知消息框
import { ElNotification  } from 'element-plus'
import {defineExpose,ref,reactive,watchEffect} from 'vue'
// 导入useUser方法，用于返回user全局状态对象
import {useUser} from '../store'
// 返回user全局对象
let userStore = useUser()

// 是否显示登录界面
let showLogin = ref(userStore.showLogin)

watchEffect(()=>{
  // 更新登录界面的状态
  showLogin.value = userStore.showLogin
})

// 关闭对话框
let handleClose = (done)=>{
  // 重置表单
  ruleFormRef.value.resetFields()
  // 关闭窗口
  done()
  // 修改全局的状态
  userStore.setShowLogin(false)
}
// 定义表单Ref对象
const ruleFormRef = ref(null)
// 定义表单数据
const ruleForm = reactive({
  name:'',
  password:'',
})
// 验证用户名
const validateUserName = async (rule, value, callback)=>{
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else {
    // 正则验证用户名规则是否正确
    if(/^\w{6,18}$/.test(value)){
      callback()  //验证成功
    }else{
      callback(new Error('用户名必须是由字母、数字、_ 组成的6-18位字符'))
    }
  }
}
// 验证密码
const validatePassword = (rule, value, callback)=>{
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if(/^\w{6,18}$/.test(value)){
      callback()
    }else{
      callback(new Error('密码必须是由字母、数字、_ 组成的6-18位字符'))
    }
  }
}
// 验证表单数据
const rules = reactive({
  name: [{ validator: validateUserName, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }],
})

// 表单的提交方法
const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      let {success,message,data} = await $login({...ruleForm})
      if(success){
        ElNotification({
          title: '通知',
          message,
          type: 'success',
        })
        // 将登录用户信息存储到store中
        userStore.setUser(data)
        // 将登录用户嘻嘻存储到浏览器缓存
        sessionStorage.setItem('user',JSON.stringify(data))
        // 清空表单数据
        formEl.resetFields()
        // 关闭窗口
        showLogin.value = false
      }else{
        ElNotification({
          title: '通知',
          message,
          type: 'error',
        })
      }
    } else {
      return false
    }
  })
}

// 暴露组件成员
defineExpose({
  showLogin
})

</script>
<style scoped lang='scss'>
.el-button--primary{
  width: 100%;
}
</style>