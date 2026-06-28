<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const productId = Number(route.params.id)

const productList = [
  {
    id: 1,
    name: '霓虹光脑 Pro',
    price: 4999,
    stock: 128,
    desc: '高性能 AI 终端，适合办公、创作与沉浸式体验。',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    name: '量子手环 X',
    price: 1299,
    stock: 64,
    desc: '智能穿戴旗舰，集成健康监测与全天候联动。',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    name: '星际耳机 Max',
    price: 2399,
    stock: 96,
    desc: '沉浸式音频体验，支持低延迟连接与智能降噪。',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    name: '零重力键盘',
    price: 1899,
    stock: 72,
    desc: '轻量化机械键盘，兼顾打字手感与极简设计。',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
  },
]

const currentProduct = computed(() => {
  return productList.find((item) => item.id === productId) || productList[0]
})

const quantity = ref(1)

const increaseQty = () => {
  if (quantity.value < currentProduct.value.stock) {
    quantity.value += 1
  }
}

const decreaseQty = () => {
  if (quantity.value > 1) {
    quantity.value -= 1
  }
}

const addToCart = () => {
  alert(`已将 ${currentProduct.value.name} × ${quantity.value} 加入购物车`)
  router.push('/cart')
}
</script>

<template>
  <section class="detail-page">
    <div class="detail-card">
      <div class="image-panel">
        <img :src="currentProduct.image" :alt="currentProduct.name" />
      </div>

      <div class="info-panel">
        <p class="eyebrow">PRODUCT DETAIL</p>
        <h2>{{ currentProduct.name }}</h2>
        <p class="desc">{{ currentProduct.desc }}</p>

        <div class="meta-list">
          <div>
            <span>商品编号</span>
            <strong>#{{ currentProduct.id }}</strong>
          </div>
          <div>
            <span>售价</span>
            <strong>¥{{ currentProduct.price }}</strong>
          </div>
          <div>
            <span>库存</span>
            <strong>{{ currentProduct.stock }} 件</strong>
          </div>
        </div>

        <div class="qty-box">
          <span>数量</span>
          <div class="qty-control">
            <button @click="decreaseQty">-</button>
            <strong>{{ quantity }}</strong>
            <button @click="increaseQty">+</button>
          </div>
        </div>

        <button class="buy-btn" @click="addToCart">加入购物车</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.detail-page {
  display: flex;
  justify-content: center;
}

.detail-card {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 24px;
  width: 100%;
  max-width: 1100px;
  padding: 28px;
  border-radius: 24px;
  border: 1px solid rgba(125, 249, 255, 0.22);
  background: rgba(6, 12, 26, 0.86);
  box-shadow: 0 0 24px rgba(0, 255, 224, 0.12);
}

.image-panel img {
  width: 100%;
  height: 100%;
  min-height: 420px;
  object-fit: cover;
  border-radius: 18px;
  border: 1px solid rgba(125, 249, 255, 0.2);
}

.info-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.eyebrow {
  margin: 0 0 8px;
  color: #7df9ff;
  letter-spacing: 0.3em;
}

h2 {
  margin: 0 0 10px;
  color: #f4fbff;
  font-size: 1.8rem;
}

.desc {
  margin: 0 0 18px;
  color: #a8b9cd;
  line-height: 1.7;
}

.meta-list {
  display: grid;
  gap: 12px;
  margin-bottom: 20px;
}

.meta-list div {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  color: #dcefff;
}

.meta-list span {
  color: #7a8aa0;
}

.qty-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
  padding: 12px 14px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  color: #dcefff;
}

.qty-control {
  display: flex;
  align-items: center;
  gap: 10px;
}

.qty-control button {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #00f5ff, #6a5cff);
  color: #03111d;
  font-size: 1rem;
  cursor: pointer;
}

.buy-btn {
  border: none;
  padding: 12px 16px;
  border-radius: 999px;
  background: linear-gradient(135deg, #00f5ff, #6a5cff);
  color: #03111d;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 0 16px rgba(0, 245, 255, 0.25);
}

@media (max-width: 860px) {
  .detail-card {
    grid-template-columns: 1fr;
  }

  .image-panel img {
    min-height: 260px;
  }
}
</style>
