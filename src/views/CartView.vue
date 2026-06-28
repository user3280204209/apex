<script setup>
import { computed, ref } from 'vue'

const cartItems = ref([
  {
    id: 1,
    name: '霓虹光脑 Pro',
    price: 4999,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    name: '星际耳机 Max',
    price: 2399,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
  },
])

const total = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

const increaseQty = (id) => {
  const item = cartItems.value.find((entry) => entry.id === id)
  if (item) {
    item.quantity += 1
  }
}

const decreaseQty = (id) => {
  const item = cartItems.value.find((entry) => entry.id === id)
  if (item && item.quantity > 1) {
    item.quantity -= 1
  }
}

const deleteItem = (id) => {
  cartItems.value = cartItems.value.filter((entry) => entry.id !== id)
}
</script>

<template>
  <section class="cart-page">
    <div class="cart-header">
      <div>
        <p class="eyebrow">CART</p>
        <h2>购物车</h2>
      </div>
      <span class="chip">{{ cartItems.length }} 件商品</span>
    </div>

    <div class="cart-list">
      <article v-for="item in cartItems" :key="item.id" class="cart-item">
        <img :src="item.image" :alt="item.name" />
        <div class="item-info">
          <h3>{{ item.name }}</h3>
          <p>单价 ¥{{ item.price }}</p>
        </div>
        <div class="qty-box">
          <button @click="decreaseQty(item.id)">-</button>
          <strong>{{ item.quantity }}</strong>
          <button @click="increaseQty(item.id)">+</button>
        </div>
        <div class="item-total">¥{{ item.price * item.quantity }}</div>
        <button class="delete-btn" @click="deleteItem(item.id)">删除</button>
      </article>
    </div>

    <div class="summary-card">
      <div>
        <p class="summary-label">合计</p>
        <h3>¥{{ total }}</h3>
      </div>
      <button class="checkout-btn">结算</button>
    </div>
  </section>
</template>

<style scoped>
.cart-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-radius: 18px;
  border: 1px solid rgba(125, 249, 255, 0.2);
  background: rgba(6, 12, 26, 0.82);
}

.eyebrow {
  margin: 0 0 6px;
  color: #7df9ff;
  letter-spacing: 0.25em;
}

h2 {
  margin: 0;
  color: #f4fbff;
}

.chip {
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(0, 245, 255, 0.12);
  color: #7df9ff;
  border: 1px solid rgba(0, 245, 255, 0.25);
}

.cart-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cart-item {
  display: grid;
  grid-template-columns: 90px 1.2fr 140px 110px 90px;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  border-radius: 18px;
  border: 1px solid rgba(125, 249, 255, 0.18);
  background: rgba(6, 12, 26, 0.82);
}

.cart-item img {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 12px;
}

.item-info h3 {
  margin: 0 0 6px;
  color: #f4fbff;
}

.item-info p {
  margin: 0;
  color: #a8b9cd;
}

.qty-box {
  display: flex;
  align-items: center;
  gap: 8px;
}

.qty-box button {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #00f5ff, #6a5cff);
  color: #03111d;
  cursor: pointer;
}

.qty-box strong {
  color: #f4fbff;
  min-width: 20px;
  text-align: center;
}

.item-total {
  color: #7df9ff;
  font-weight: 700;
}

.delete-btn {
  border: none;
  padding: 8px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  color: #dcefff;
  cursor: pointer;
}

.summary-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 22px;
  border-radius: 18px;
  border: 1px solid rgba(125, 249, 255, 0.2);
  background: rgba(6, 12, 26, 0.9);
}

.summary-label {
  margin: 0 0 4px;
  color: #7a8aa0;
}

.summary-card h3 {
  margin: 0;
  color: #f4fbff;
  font-size: 1.3rem;
}

.checkout-btn {
  border: none;
  padding: 10px 18px;
  border-radius: 999px;
  background: linear-gradient(135deg, #00f5ff, #6a5cff);
  color: #03111d;
  font-weight: 700;
  cursor: pointer;
}

@media (max-width: 860px) {
  .cart-item {
    grid-template-columns: 80px 1fr;
  }

  .qty-box,
  .item-total,
  .delete-btn {
    grid-column: 2;
  }
}
</style>
