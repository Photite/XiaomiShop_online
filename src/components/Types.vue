<template>
  <div class="types">
    <div class="top">
      <div class="title">{{props.types.title}}</div>
      <ul class="types-nav" v-if="typesNav.length>1">
        <li :class="{active:activeIndex===index}" @mouseenter="activeIndex=index"
        v-for="(item,index) in typesNav" :key="index">{{item}}</li>
      </ul>
    </div>
    <div class="box">
      <div class="img">
        <slot></slot>
      </div>
      <div class="content">
        <Item v-for="item in currentList" :key="item.product_id" :item="item" :data-item="item" ></Item>
        <div class="more" v-if="currentList.length===7" >
          <a href="#" @click="watchClick((currentList[0].category_id))">浏览更多&nbsp;<el-icon><DArrowRight /></el-icon></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// 导入图标
import {DArrowRight} from "@element-plus/icons-vue"
// 导入列表项组件
import Item from './Item.vue'
// 导入组合式api
import {computed,ref} from 'vue'
import router from "../router/index.js";
// 定义属性
const props = defineProps(['types'])
// 定义高亮索引
const activeIndex = ref(0)
// 分类菜单
const typesNav = computed(()=>{
  if(props.types.datas){
    return props.types.datas.map(r=>r.title)
  }else{
    return []
  }
})

const watchClick = (categoryId) => {
  console.log("Category ID:", categoryId);
  router.push('/goods?id='+categoryId)
}

const currentList = computed(()=>{
  if(props.types.datas){
    return props.types.datas[activeIndex.value].data
  }else{
    return []
  }
})

</script>
<style scoped lang='scss'>
.types{
  width: 1226px;
  height: 672px;
  margin: 0 auto;
  .top{
    height: 58px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title{
      font-size: 22px;
      color: #333;
      font-weight: 200;
    }
    .types-nav{
      display: flex;
      align-items: center;
      font-size: 16px;
      li{
        margin-left: 30px;
        cursor: pointer;
        &.active{
          color: #ff6700;
          border-bottom: 2px solid #ff6700;
        }
      }
    }
  }
  .box{
    height: 614px;
    display: flex;
    .img{
      width: 234px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .content{
      flex: 1;
      .more{
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
        &:hover{
          transform: translate3d(0,-2px,0);
          box-shadow: 0 15px 30px rgb(0 0 0 / 10%);
        }
        a{
          font-size: 18px;
          color: #333;
          display: flex;
          align-items: center;
          &:hover{
            color: #ff6700;
          }
        }
      }
    }
  }
}
</style>