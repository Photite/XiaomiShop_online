<template>
  <div class="app">
    <!-- 头部 -->
    <div class="header">
      <div class="content">
        <ul>
          <el-popconfirm v-if="userStore.user.id" width="200px" title="确定退出登录吗？"
          confirm-button-text="确定"
          cancel-button-text="取消"
          @confirm="exit">
            <template #reference>
              <li >{{userStore.user.name}}</li>
            </template>
          </el-popconfirm>
          <template v-else>
            <li @click="login">登录</li>
            <li>|</li>
            <li @click="register">注册</li>
          </template>
          
          <li @click="openOrder">我的订单</li>
          <li @click="openCollect">我的收藏</li>
          <li @click="openCart" class="shopcart" :class="{shopcart2:shoppingcart_num>0}">
            <el-icon><ShoppingCartFull /></el-icon>
            <span>购物车({{shoppingcart_num}})</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 头部end -->
    <!-- 导航 -->
    <div class="nav">
      <div class="content">
        <div class="logo">
          <img class="img" src="./assets/logo.png" />
        </div>
        <div class="menu">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            router>
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/goods">全部商品</el-menu-item>
            <el-menu-item index="/about">关于我们</el-menu-item>
          </el-menu>
        </div>
        <div class="search">
          <el-input
            v-model="searchText"
            placeholder="请输入搜索内容"
            class="input-with-select"
          >
            <template #append>
              <el-button :icon="Search" @click="searchClick"/>
            </template>
          </el-input>
        </div>
      </div>
    </div>
    <!-- 主体 -->
    <div class="main">
      <router-view :key="route.fullPath"></router-view>
    </div>
    <!-- 主体end -->
    <!-- 导航end -->
    <!-- 底部 -->
    <div class="footer">
      <div class="top">
        <a class="icon1" href="javascript:;">7天无理由退换货</a>
        <a class="icon2" href="javascript:;">满99元全场免邮</a>
        <a class="icon3" href="javascript:;">100%品质保证</a>
      </div>
      <div class="line"></div>
      <div class="bottom">
        <p>
          <a href="javascript:;">
            <img src="./assets/github.png"/>
          </a>
        </p>
        <p>
          <a href="javascript:;">首页</a>
          <span>|</span>
          <a href="javascript:;">全部商品</a>
          <span>|</span>
          <a href="javascript:;">关于我们</a>
        </p>
        <p>商城版权所有 © 2012-2023</p>
      </div>
    </div>
    <!-- 底部end -->
  </div>
  <!-- 注册组件 -->
  <Register ref="registerRef"></Register>
  <!-- 登录组件 -->
  <Login ref="loginRef"></Login>
</template>

<script setup>
// 导入设置token信息的方法
import {$setToken} from './utils/request'
// 导入组件
import Register from './components/Register.vue'
import Login from './components/Login.vue'
// 导入图标
import {ShoppingCartFull,Search} from '@element-plus/icons-vue'
// 导入组合式api
import { ref,onMounted,computed,watch,watchEffect} from 'vue'
import {useRouter,useRoute} from 'vue-router'
// 导入全局状态存储库
import {useMenuActive, useUser, useShoppingcart, getOrder} from './store'
import {$product_search} from "./api/product.js";
const menuActive = useMenuActive()
const userStore = useUser()
const shoppingcartStore = useShoppingcart()

// 创建路由器
let router = useRouter()
// 获取当前路由
let route = useRoute()
// 定义一个ref用于绑定注册组件
let registerRef = ref(null)
// 打开注册界面的方法
let register = ()=>{
  // 打开注册界面
  registerRef.value.showRegister = true
}
// 定义一个ref用于绑定登录组件
let loginRef = ref(null)
// 打开登录界面的方法
let login = ()=>{
  loginRef.value.showLogin = true
}
// 监视路由地址的变化
watch(()=>route.path,(nval)=>{
  menuActive.setActiveIndex(nval)
},{
  // 立刻执行一次
  immediate:true
})
// 搜索内容
const searchText = ref('')
const searchClick = () => {
  if (searchText.value !== "") {
    // 跳转到全部商品页面,并传递搜索条件
    router.push('/goods?sid='+searchText.value)
    searchText.value = "";
  }}
// 定义菜单高亮索引
const activeIndex = computed(()=>{
  return menuActive.activeIndex
})

// 打开订单
const openOrder = ()=>{
  // router.push('/order/'+new Date().getTime())
  router.push('/order')
}
// 打开收藏
const openCollect = ()=>{
  router.push('/collect')
}
// 打开购物车
const openCart = ()=>{
  router.push('/shoppingCart')
}

// 购物车商品数量
const shoppingcart_num = computed(()=>{
  return shoppingcartStore.shoppingcartList.reduce((curr,prev)=>curr+prev.num,0)
})

  watchEffect(() => {
    // 加载购物车信息
    shoppingcartStore.loadShoppingcartList()
  })

  onMounted(() => {
    // 如果浏览器缓存中是否有user信息
    if (sessionStorage.getItem('user')) {
      console.log(sessionStorage.getItem('user'))
      console.log(JSON.parse(sessionStorage.getItem('user')))
      userStore.setUser(JSON.parse(sessionStorage.getItem('user')))
    }
    // 判断浏览器缓存中单是否有token信息
    if (sessionStorage.getItem('token')) {
      $setToken(sessionStorage.getItem('token'))
    }
  })

// 退出方法
  let exit = () => {
    // 清空浏览器缓存
    localStorage.clear()
    sessionStorage.clear()
    // 清空token
    $setToken('')
    // 重置登录用户信息
    userStore.reset()
    getOrder().resetOrder(getOrder().orderList);
    // 重置购物车信息
    shoppingcartStore.clear()
  }


</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
}
.app{
  font-size: 14px;
  width: 100%;
  .header{
    height: 40px;
    background-color: #3d3d3d;
    .content{
      width: 1226px;
      margin: 0 auto;
      color: #b0b0b0;
      display: flex;
      justify-content: flex-end;
      ul{
        display: flex;
        align-items: center;
        height: 40px;
        li{
          cursor: pointer;
          margin: 0 6px;
          &:hover{
            color: #fff;
          }
          &.shopcart{
            width: 120px;
            height: 40px;
            margin-left: 15px;
            background-color: #424242;
            display: flex;
            justify-content: center;
            align-items: center;
            span{
              margin-left: 3px;
            }
            &:hover{
              color: #ff6700;
              background-color: #fff;
            }
          }
          &.shopcart2{
            background-color: #ff6700;
            color: white;
            &:hover{
              background-color: #ff6700;
              color: white;
            }
          }
        }
      }
    }
  }
  .nav{
    margin-top: 20px;
    .content{
      width: 1226px;
      margin: 0 auto;
      //border-bottom: 1px solid #b0b0b0;
      display: flex;
      align-items: center;
      .logo{
        .img{
          width: 100px;
          height: 100px;}

      }
      .menu{
        flex: 1;
        margin-left: 100px;
        .el-menu--horizontal{
          border-bottom: none;
        }
      }
      .search{
        width: 300px;
      }
    }
  }
  .main{
    margin: 20px 0;
  }
  .footer{
    background-color: #2f2f2f;
    height: 334px;
    .top{
      width: 1226px;
      height: 145px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      a{
        color: white;
        font-size: 20px;
        width: 200px;
        height: 40px;
        background: url(./assets/bg.png) no-repeat;
        padding-left: 45px;
        line-height: 40px;
        &.icon1{
          background-position: 0 0;
        }
        &.icon2{
          background-position: 0 -40px;
          margin: 0 150px;
        }
        &.icon3{
          background-position: 0 -80px;
        }
      }
    }
    .line{
      border-bottom:1px solid #3d3d3d;
    }
    .bottom{
      width: 1226px;
      margin: 0 auto;
      color: #888888;
      p{
        text-align: center;
        margin: 20px 0;
        a{
          color: #888888;
        }
        span{
          margin: 0 20px;
        }
      }
    }
  }
}
// 统一设置每个页面的背景颜色
.page{
  background-color: #f5f5f5;
}
</style>