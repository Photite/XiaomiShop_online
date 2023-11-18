import {$get} from '../utils/request'

// 搜索商品
export const $product_search = async (params)=>{
  let ret = await $get('product/search',params)
  return ret
}

// 获取单个商品
export const $product_one = async (params)=>{
  let ret = await $get('product/one',params)
  return ret
}

// 获取单个商品的所有图片
export const $product_getAllPicture = async (params)=>{
  let ret = await $get('product/getAllPicture',params)
  return ret
}