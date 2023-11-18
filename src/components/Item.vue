<template>
  <div class="item" @click="gotoDetail(item.product_id)">
    <img :src="baseURL+item.product_picture"/>
    <div class="name">{{item.product_name}}</div>
    <div class="title">{{item.product_title}}</div>
    <div>
      <span class="selling_price">￥{{item.product_selling_price}}元</span>
      <span class="price" v-if="item.product_price>item.product_selling_price">￥{{item.product_price}}元</span>
    </div>
    <el-popconfirm title="确定删除吗？" confirm-button-text="确定" cancel-button-text="取消"
      @confirm="confirmDel(item.product_id)" v-if="close">
      <template #reference>
        <div class="close">
          <el-icon><Close /></el-icon>
        </div>
      </template>
    </el-popconfirm>
  </div>
</template>
<script setup>
// 导入图标
import {Close} from '@element-plus/icons-vue'
// 导入根路径
import {baseURL} from '../config'
// 导入路由器
import {useRouter} from 'vue-router'
const router = useRouter()
// 定义属性
const {item,close} = defineProps({
  item:{
    type:Object
  },
  close:{
    type:Boolean,
    default:false
  }
})
// 定义事件
const emit = defineEmits(['delete'])
// 跳转到详情页
const gotoDetail = (id)=>{
  // 将高亮索引设置为空
  router.push('/detail?id='+id)
}
// 确定删除方法
const confirmDel = (id)=>{
  emit('delete',id)
}
</script>
<style scoped lang='scss'>
.item{
    cursor: pointer;
    width: 234px;
    height: 300px;
    background: #fff;
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all .2s linear;
    float: left;
    margin: 0 0 14px 14px;
    position: relative;
    &:hover{
      transform: translate3d(0,-2px,0);
      box-shadow: 0 15px 30px rgb(0 0 0 / 10%);
    }
    img{
      width: 160px;
      height: 160px;
    }
    .name{
      font-size: 14px;
      color: #333;
    }
    .title{
      font-size: 12px;
      color: #b0b0b0;
      margin: 10px 0;
    }
    .selling_price{
      font-size: 14px;
      color: #ff6700;
    }
    .price{
      font-size: 14px;
      color: #b0b0b0;
      text-decoration: line-through;
      margin-left: 6px;
    }
    .close{
      position: absolute;
      z-index: -1;
      right: 10px;
      top: 10px;
      &:hover{
        color: #ff6700;
      }
    }
  }
</style>