<script setup>
const menus = [
  { title: '我的订单', desc: '查看历史订单与物流状态', icon: '📦' },
  { title: '收货地址', desc: '管理默认收货地址与配送信息', icon: '📍' },
  { title: '优惠券', desc: '查看可用优惠与专属权益', icon: '🎟️' },
  { title: '安全设置', desc: '修改密码与账户安全设置', icon: '🔐' },
]
</script>

<template>
  <section class="mine-page">
    <div class="profile-card">
      <div class="avatar">N</div>
      <div class="profile-info">
        <p class="eyebrow">PROFILE</p>
        <h2>Neon Rider</h2>
        <p>欢迎回到霓虹商城，持续探索未来科技。</p>
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

    <button class="logout-btn">退出登录</button>
  </section>
</template>

<style scoped>
.mine-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.profile-card {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 24px;
  border-radius: 22px;
  border: 1px solid rgba(125, 249, 255, 0.2);
  background: linear-gradient(135deg, rgba(0, 245, 255, 0.12), rgba(106, 92, 255, 0.12));
  box-shadow: 0 0 20px rgba(0, 255, 224, 0.08);
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00f5ff, #6a5cff);
  color: #03111d;
  font-size: 1.5rem;
  font-weight: 700;
}

.profile-info h2 {
  margin: 0 0 8px;
  color: #f4fbff;
}

.profile-info p {
  margin: 0;
  color: #a8b9cd;
  line-height: 1.6;
}

.eyebrow {
  margin: 0 0 6px;
  color: #7df9ff;
  letter-spacing: 0.25em;
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

.logout-btn {
  margin-top: 6px;
  align-self: flex-start;
  border: none;
  padding: 10px 16px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  color: #dcefff;
  cursor: pointer;
}
</style>
