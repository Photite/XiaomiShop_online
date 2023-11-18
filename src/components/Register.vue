<template>
  <el-dialog
    v-model="showRegister"
    title="注册"
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
    <el-form-item prop="password2">
      <el-input :prefix-icon="View" placeholder="请再次输入密码" v-model="ruleForm.password2" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">注册</el-button>
    </el-form-item>
  </el-form>
  </el-dialog>
</template>
<script setup>
// 导入请求api
import {$register,$checkUserName} from '../api/user'
// 导入图标
import {User,View} from '@element-plus/icons-vue'
// 导入消息框
import { ElMessage } from 'element-plus'
import {defineExpose,ref,reactive} from 'vue'
// 是否显示注册界面
let showRegister = ref(false)
// 关闭对话框
let handleClose = (done)=>{
  // 重置表单
  ruleFormRef.value.resetFields()
  // 关闭窗口
  done()
}

// 定义表单Ref对象
const ruleFormRef = ref(null)
// 定义表单数据
const ruleForm = reactive({
  name:'',
  password:'',
  password2:'',
})
// 验证用户名
const validateUserName = async (rule, value, callback)=>{
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else {
    // 正则验证用户名规则是否正确
    if(/^\w{6,18}$/.test(value)){
      // 验证用户名是否重复
      let {success} = await $checkUserName({name:value})
      if(success){
        callback(new Error('该用户名已经存在，请重新输入'))
      }else{
        callback()  //验证成功
      }
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
// 验证确认密码
const validatePassword2 = (rule, value, callback)=>{
  if (value === '') {
    callback(new Error('请输入确认密码'))
  }else{
    if(value===ruleForm.password){
      callback()
    }else{
      callback(new Error('两次密码输入不一致'))
    }
  }
}
// 验证表单数据
const rules = reactive({
  name: [{ validator: validateUserName, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }],
  password2: [{ validator: validatePassword2, trigger: 'blur' }],
})
// 表单的提交方法
const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      console.log({...ruleForm})
      console.log(ruleForm)
      let {success,message} = await $register({...ruleForm})

      if(success){
        ElMessage({
          showClose: true,
          message,
          type: 'success',
        })
        // 清空表单
        formEl.resetFields()
      }else{
        ElMessage({
          showClose: true,
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
  showRegister
})
</script>
<style scoped lang='scss'>
.el-button--primary{
  width: 100%;
}
</style>