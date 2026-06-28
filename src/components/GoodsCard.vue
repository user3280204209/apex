<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  showActions: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['detail', 'add'])

const handleDetail = () => emit('detail', props.product.id ?? props.product.name)
const handleAdd = () => emit('add', props.product.id ?? props.product.name)
</script>

<template>
  <article class="product-card neon-card">
    <img :src="product.image" :alt="product.name" />
    <div class="product-info">
      <h4>{{ product.name }}</h4>
      <p class="price">¥{{ product.price }}</p>
      <div v-if="showActions" class="actions">
        <button class="btn btn-ghost" @click="handleDetail">查看详情</button>
        <button class="btn btn-primary" @click="handleAdd">加入购物车</button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.product-card {
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.product-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}

.product-info {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
}

.product-info h4 {
  margin: 0;
  color: #f4fbff;
}

.price {
  margin: 0;
  color: #7df9ff;
  font-weight: 700;
}

.actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 6px;
}
</style>
