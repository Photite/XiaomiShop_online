import {$get} from '../utils/request'

// 获取所有分类
export const $category_all = async ()=>{
  let data = await $get('category/all')
  return data
}