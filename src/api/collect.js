import {$get, $post} from '../utils/request'

// 获取所有分类
export const $collect_getUserCollect = async (params)=>{
    let data = await $get('collect/getUserCollect',params)
    return data
}

export const $collect_add = async (params)=>{
    let data = await $post('collect/add',params)
    return data
}

export const $collect_del = async (params)=>{
    let data = await $post('collect/del',params)
    return data
}

export const $collect_one = async (params)=>{
    let data = await $post('collect/one',params)
    return data
}