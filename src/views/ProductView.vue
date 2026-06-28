<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import GoodsCard from '../components/GoodsCard.vue'

const router = useRouter()

const categories = ['全部', 'AI硬件', '智能穿戴', '数码配件']
const activeCategory = ref('全部')

const products = ref([
  {
    id: 1,
    name: '霓虹光脑 Pro',
    price: '4999',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    category: 'AI硬件',
  },
  {
    id: 2,
    name: '量子手环 X',
    price: '1299',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    category: '智能穿戴',
  },
  {
    id: 3,
    name: '星际耳机 Max',
    price: '2399',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    category: '数码配件',
  },
  {
    id: 4,
    name: '零重力键盘',
    price: '1899',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    category: '数码配件',
  },
  {
    id: 5,
    name: '幻影显示器',
    price: '3599',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    category: 'AI硬件',
  },
  {
    id: 6,
    name: '脉冲移动电源',
    price: '899',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
    category: '数码配件',
  },
  {
    id: 7,
    name: '天幕智能眼镜',
    price: '2899',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    category: '智能穿戴',
  },
  {
    id: 8,
    name: '回声音箱 Lite',
    price: '1099',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    category: '数码配件',
  },
])

const filteredProducts = computed(() => {
  if (activeCategory.value === '全部') {
    return products.value
  }

  return products.value.filter((item) => item.category === activeCategory.value)
})

const changeCategory = (cate) => {
  activeCategory.value = cate
}

const goDetail = (id) => {
  router.push(`/detail/${id}`)
}

const goCart = () => {
  router.push('/cart')
}
</script>

<template>
  <section class="panel">
    <div class="page-head">
      <div>
        <p class="eyebrow">PRODUCTS</p>
        <h2>商品中心</h2>
      </div>
      <div class="chip">8 款新品上线</div>
    </div>

    <div class="category-bar">
      <button
        v-for="item in categories"
        :key="item"
        class="category-btn"
        :class="{ active: item === activeCategory }"
        @click="changeCategory(item)"
      >
        {{ item }}
      </button>
    </div>

    <div class="product-grid">
      <GoodsCard
        v-for="item in filteredProducts"
        :key="item.id"
        :product="item"
        :show-actions="true"
        @detail="goDetail"
        @add="goCart"
      />
    </div>
  </section>
</template>

<style scoped>
.panel {
  padding: 28px;
}

.page-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.chip {
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(0, 245, 255, 0.12);
  color: #7df9ff;
  border: 1px solid rgba(0, 245, 255, 0.3);
}

.category-bar {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.category-btn {
  border: 1px solid rgba(125, 249, 255, 0.2);
  background: rgba(255, 255, 255, 0.04);
  color: #dcefff;
  padding: 8px 14px;
  border-radius: 999px;
  cursor: pointer;
}

.category-btn.active {
  background: linear-gradient(135deg, #00f5ff, #7df9ff);
  color: #03111d;
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
