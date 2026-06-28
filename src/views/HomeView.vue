<script setup>
import { useRouter } from 'vue-router'
import GoodsCard from '../components/GoodsCard.vue'

const router = useRouter()

const hotProducts = [
  {
    id: 1,
    name: '霓虹光脑 Pro',
    price: '4999',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    name: '量子手环 X',
    price: '1299',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    name: '星际耳机 Max',
    price: '2399',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    name: '零重力键盘',
    price: '1899',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
  },
]

const newProducts = [
  {
    id: 5,
    name: '幻影显示器',
    price: '3599',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    name: '脉冲移动电源',
    price: '899',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 7,
    name: '天幕智能眼镜',
    price: '2899',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 8,
    name: '回声音箱 Lite',
    price: '1099',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
  },
]

const goDetail = (id) => {
  router.push(`/detail/${id}`)
}
</script>

<template>
  <section class="home-page">
    <div class="banner-carousel">
      <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80" alt="轮播横幅" />
      <div class="banner-overlay">
        <p class="eyebrow">CYBER SHOWCASE</p>
        <h2>未来科技，尽在霓虹商城</h2>
        <p>探索智能硬件、穿戴设备与极客配件，打造属于你的数字未来。</p>
      </div>
      <div class="banner-dots">
        <span class="dot active"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    </div>

    <div class="section-block">
      <div class="section-title">
        <h3>热销商品</h3>
        <span>HOT SALES</span>
      </div>
      <div class="product-grid">
        <GoodsCard v-for="item in hotProducts" :key="item.id" :product="item" @detail="goDetail" />
      </div>
    </div>

    <div class="section-block">
      <div class="section-title">
        <h3>新品上架</h3>
        <span>NEW ARRIVALS</span>
      </div>
      <div class="product-grid">
        <GoodsCard v-for="item in newProducts" :key="item.id" :product="item" @detail="goDetail" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.banner-carousel {
  position: relative;
  width: 100%;
  height: 320px;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid rgba(125, 249, 255, 0.24);
  box-shadow: 0 0 24px rgba(0, 255, 224, 0.12);
}

.banner-carousel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.banner-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 28px;
  background: linear-gradient(90deg, rgba(3, 10, 22, 0.8), rgba(3, 10, 22, 0.25));
}

.banner-overlay h2 {
  margin: 0 0 10px;
  font-size: 1.8rem;
  color: #f4fbff;
}

.banner-overlay p {
  margin: 0;
  color: #dcefff;
  line-height: 1.7;
  max-width: 620px;
}

.banner-dots {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.dot.active {
  background: #7df9ff;
  box-shadow: 0 0 10px rgba(0, 245, 255, 0.7);
}

.section-block {
  padding: 24px;
  border-radius: 20px;
  border: 1px solid rgba(125, 249, 255, 0.2);
  background: rgba(6, 12, 26, 0.8);
  box-shadow: 0 0 20px rgba(0, 255, 224, 0.08);
}

.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-title h3 {
  margin: 0;
  color: #f4fbff;
}

.section-title span {
  color: #7df9ff;
  font-size: 0.85rem;
  letter-spacing: 0.2em;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

@media (max-width: 1100px) {
  .product-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}
</style>
