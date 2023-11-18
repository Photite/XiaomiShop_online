import {$post,$get,$setToken} from '../utils/request'
import md5 from 'md5'


// 用户注册
export let $register = async (params)=>{
  // 对密码进行md5加密
  console.log("123")
  params.password = md5(md5(params.password).split('').reverse().join(''))
  console.log(params.name);
  console.log(params.password)
  let ret = await $post('user/register',params)
  console.log(ret)
  console.log("456")
  return ret
}

// 检查用户名是否存在
export let $checkUserName = async (params)=>{
  let ret = await $get('user/checkUserName',params)
  return ret
}

// 用户登录
export let $login = async (params)=>{
  // 对密码进行md5加密
  params.password = md5(md5(params.password).split('').reverse().join(''))
  let ret = await $post('user/login',params)
  if(ret.success){
    // 将token信息存储到axios的请求头中
    $setToken(ret.token)
    // 将token休息存储到浏览器的缓存中
    sessionStorage.setItem('token',ret.token)
  }
  return ret
}