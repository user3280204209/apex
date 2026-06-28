<script setup>
import { ref, onMounted } from 'vue'

const user = ref({})
const newName = ref('')
const menus = [
  { title: '我的订单', desc: '查看历史订单与物流状态', icon: '📦' },
  { title: '收货地址', desc: '管理默认收货地址与配送信息', icon: '📍' },
  { title: '优惠券', desc: '查看可用优惠与专属权益', icon: '🎟️' },
  { title: '安全设置', desc: '修改密码与账户安全设置', icon: '🔐' },
]

const getUserList = () => JSON.parse(localStorage.getItem('userList') || '[]')
const saveAllUser = (list) => localStorage.setItem('userList', JSON.stringify(list))

onMounted(() => {
  user.value = JSON.parse(localStorage.getItem('nowUser') || '{}')
  newName.value = user.value.username || ''
})

const changeAvatar = (e) => {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => {
    const base64 = ev.target.result
    user.value.avatar = base64
    const list = getUserList()
    const target = list.find((i) => i.account === user.value.account)
    if (target) {
      target.avatar = base64
      saveAllUser(list)
      localStorage.setItem('nowUser', JSON.stringify(user.value))
      alert('头像修改成功')
    }
  }
  reader.readAsDataURL(file)
}

const saveName = () => {
  if (!newName.value.trim()) return alert('昵称不能为空')
  user.value.username = newName.value.trim()
  const list = getUserList()
  const target = list.find((i) => i.account === user.value.account)
  if (target) {
    target.username = user.value.username
    saveAllUser(list)
    localStorage.setItem('nowUser', JSON.stringify(user.value))
    alert('昵称已更新')
    location.reload()
  }
}
</script>

<template>
  <section class="mine-page">
    <div class="panel">
      <h2>个人中心</h2>
      <div class="avatar-box">
        <img v-if="user.avatar" :src="user.avatar" class="my-avatar" />
        <div v-else class="my-avatar empty">{{ user.username ? user.username.slice(0, 1).toUpperCase() : 'U' }}</div>
        <input type="file" accept="image/*" @change="changeAvatar" />
        <p>点击更换头像</p>
      </div>
      <div class="form-item">
        <label>昵称</label>
        <input v-model="newName" />
        <button @click="saveName" class="btn btn-ghost">保存昵称</button>
      </div>
      <div class="info">
        <p>账号：{{ user.account }}</p>
      </div>
    </div>
    <div class="menu-list">
      <article v-for="item in menus" :key="item.title" class="menu-item">
        <div class="menu-icon">{{ item.icon }}</div>
        <div class="menu-text">
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.mine-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.panel {
  padding: 24px;
  border-radius: 22px;
  border: 1px solid rgba(125, 249, 255, 0.2);
  background: linear-gradient(135deg, rgba(0, 245, 255, 0.12), rgba(106, 92, 255, 0.12));
}

.avatar-box {
  margin-bottom: 24px;
  text-align: center;
}

.my-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  background: rgba(125, 249, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: #7df9ff;
}

.my-avatar.empty {
  border: 2px dashed rgba(125, 249, 255, 0.4);
}

.form-item {
  margin: 16px 0;
}

label {
  display: block;
  margin-bottom: 6px;
  color: #7df9ff;
}

input {
  width: 300px;
  padding: 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(125, 249, 255, 0.2);
  color: #fff;
  outline: none;
  margin-right: 10px;
}

.menu-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  border-radius: 16px;
  border: 1px solid rgba(125, 249, 255, 0.18);
  background: rgba(6, 12, 26, 0.82);
}

.menu-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(0, 245, 255, 0.12);
  font-size: 1.1rem;
}

.menu-text h3 {
  margin: 0 0 4px;
  color: #f4fbff;
}

.menu-text p {
  margin: 0;
  color: #a8b9cd;
}
</style>
