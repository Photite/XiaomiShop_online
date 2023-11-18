<template>
  <el-carousel trigger="click" :height="props.height">
    <el-carousel-item v-for="item,index in props.list" :key="index">
      <img :style="{width:props.width}" :src="baseURL+item" />
    </el-carousel-item>
  </el-carousel>
</template>
<script setup>
// 导入根路径
import {baseURL} from '../config'
// 定义组件的属性
const props = defineProps(['list','width','height'])
</script>
<style scoped lang='scss'>
::v-deep .el-carousel__indicators .el-carousel__button{
  background-color: hsla(0,0%,64%,.8);
}
</style>