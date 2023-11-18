import axios from 'axios'
import {baseURL} from '../config'

// 初始化一个axios实例
var instance = axios.create({
  // 请求前缀
  baseURL,
  // 请求超时时间
  timeout: 20000,
});

// 设置token的方法
export const $setToken = (token)=>{
  // 将token存放到axios的请求头中
  // 因为服务器是根据请求头中的token去验证接口的访问权限的
  instance.defaults.headers.common['token'] = token;
}

// 定义get请求方法
export const $get = async (url,params)=>{
  let {data} = await instance.get(url,{params})
  return data
}
// 定义post请求方法
export const $post = async (url,params)=>{
  let {data} = await instance.post(url,params)
  return data
}
// 定义put请求方法
export const $put = async (url,params)=>{
  let {data} = await instance.put(url,params)
  return data
}
// 定义delete请求方法
export const $delete = async (url,params)=>{
  let {data} = await instance.delete(url,{params})
  return data
}


// 导出axios实例
export default instance