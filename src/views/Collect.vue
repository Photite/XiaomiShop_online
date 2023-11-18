<template>
  <div class="collect">
    <div class="collect-header">
      <div class="collect-title">
        <el-icon color="#ff6700" size="28">
          <List/>
        </el-icon>
        我的收藏
      </div>
    </div>
    <div class="content" v-if="products.length>0">
      <div class="products">
        <Item v-for="item in products" :key="item.product_id" :item="item"></Item>
      </div>
      <div class="pagination">
        <el-pagination background layout="prev, pager, next"
                       @current-change="loadProducts"/>
      </div>
    </div>
    <!-- 收藏列表为空的时候显示的内容 -->
    <div v-if="products.length===0" class="collect-empty">
      <div class="empty">
        <h2>您的收藏还是空的！</h2>
        <p>快去购物吧！</p>
      </div>
    </div>
    <!--  收藏列表为空的时候显示的内容END -->
  </div>

</template>
<script setup>
import {List} from "@element-plus/icons-vue";
import {$product_one, $product_search} from "../api/product.js";
import {onMounted, ref} from "vue";
import Item from "../components/Item.vue";
import {useUser} from '../store'
import {$collect_getUserCollect} from "../api/collect.js";
const userStore = useUser()
const products = ref([])
const loadProducts = async () => {

  let {data} = await $collect_getUserCollect({
    user_id: userStore.user.id
  })

  products.value = data
  console.log(products)

}

onMounted(() => {
  // 加载商品信息数据
  loadProducts()
})

</script>
<style>
.collect {
  background-color: #f5f5f5;
}

.collect .collect-header {
  height: 64px;
  background-color: #fff;
  border-bottom: 2px solid #ff6700;
}

.collect .collect-header .collect-title {
  width: 1225px;
  margin: 0 auto;
  height: 64px;
  line-height: 58px;
  font-size: 28px;
}

.collect .content {
  padding: 20px 0;
  width: 1225px;
  height: 500px;
  //height: auto;
  margin: 0 auto;
}

.collect .content .goods-list {
  margin-left: -13.7px;
  overflow: hidden;
}

.collect .collect-empty {
  width: 1225px;
  margin: 0 auto;
}

.collect .collect-empty .empty {
  height: 300px;
  padding: 0 0 130px 558px;
  margin: 65px 0 0;
  background: url(../assets/cart-empty.png) no-repeat 124px 0;
  color: #b0b0b0;
  overflow: hidden;
}

.collect .collect-empty .empty h2 {
  margin: 70px 0 15px;
  font-size: 36px;
}

.collect .collect-empty .empty p {
  margin: 0 0 20px;
  font-size: 20px;
}
</style>