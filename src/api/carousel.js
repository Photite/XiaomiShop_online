import {$get} from '../utils/request'

// 获取轮播图
export const $carousel_list = async ()=>{
  // let {data} = await $get('carousel/list')
  let data= await $get('carousel/list')
  return data
}