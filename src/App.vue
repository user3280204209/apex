<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const placeholderWords = ['游戏手柄', '智能耳机', '机械键盘', '便携平板']
const currentPlaceholder = ref(placeholderWords[0])
let timer = null

onMounted(() => {
  timer = setInterval(() => {
    const index = placeholderWords.indexOf(currentPlaceholder.value)
    const nextIndex = (index + 1) % placeholderWords.length
    currentPlaceholder.value = placeholderWords[nextIndex]
  }, 2000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="app-shell">
    <header class="topbar">
      <div class="topbar-row">
        <div class="brand">
          <span class="brand-mark">◉</span>
          <span>Neon Market</span>
        </div>

        <nav class="nav-links">
          <router-link to="/">首页</router-link>
          <router-link to="/product">商品中心</router-link>
          <router-link to="/cart">购物车</router-link>
          <router-link to="/message">消息</router-link>
          <router-link to="/mine">我的</router-link>
          <div class="login-wrap">
            <button class="login-btn" aria-label="用户头像">N</button>
            <div class="login-popover">
              <div class="popover-panel">
                <div class="panel-title">登录后你可以：</div>
                <ul>
                  <li>1.免费获取购物建议</li>
                  <li>2.多端同步购买记录</li>
                  <li>3.跟踪产品价格曲线</li>
                  <li>4.多种官方折扣优惠</li>
                </ul>
                <router-link class="panel-btn" to="/login">立即登录</router-link>
                <div class="panel-foot">首次使用?立即注册</div>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div class="search-row">
        <div class="search-box">
          <input type="text" :placeholder="currentPlaceholder" />
          <button class="search-btn">搜索</button>
        </div>
      </div>
    </header>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="footer">
      <p>© 2026 Neon Market · Cyber Commerce System</p>
    </footer>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.topbar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 18px 28px 20px;
  background: rgba(5, 10, 24, 0.9);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(0, 255, 224, 0.25);
  box-shadow: 0 0 24px rgba(0, 255, 224, 0.12);
}

.topbar-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #7df9ff;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.brand-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00f5ff, #6a5cff);
  color: #03111d;
  box-shadow: 0 0 16px rgba(0, 245, 255, 0.6);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.login-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.login-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #7df9ff, #6acfff);
  color: #03111d;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 0 12px rgba(0, 245, 255, 0.3);
}

.login-popover {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  width: 240px;
  padding: 12px;
  border-radius: 14px;
  background: #ffffff;
  color: #111827;
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.18);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: all 0.2s ease;
  z-index: 20;
}

.login-popover::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  background: #ffffff;
  rotate: 45deg;
}

.popover-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.panel-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #111827;
}

.popover-panel ul {
  margin: 0;
  padding-left: 16px;
  color: #374151;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.9rem;
}

.panel-btn {
  border: none;
  border-radius: 999px;
  padding: 8px 12px;
  background: linear-gradient(135deg, #2f8cff, #1d6bff);
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
}

.panel-foot {
  text-align: center;
  font-size: 0.8rem;
  color: #6b7280;
}

.login-wrap:hover .login-popover {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.nav-links a,
.msg-trigger {
  text-decoration: none;
  color: #dcefff;
  padding: 8px 14px;
  border-radius: 999px;
  transition: all 0.25s ease;
}

.nav-links a:hover,
.nav-links a.router-link-active,
.msg-trigger:hover {
  color: #03111d;
  background: linear-gradient(135deg, #00f5ff, #7df9ff);
  box-shadow: 0 0 16px rgba(0, 245, 255, 0.35);
}

.msg-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.msg-popover {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  width: 160px;
  padding: 8px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: all 0.2s ease;
  z-index: 20;
}

.msg-item {
  padding: 10px 12px;
  border-radius: 8px;
  color: #111827;
  cursor: pointer;
}

.msg-item:hover {
  background: #f3f4f6;
}

.msg-wrap:hover .msg-popover {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: #03111d;
  background: linear-gradient(135deg, #00f5ff, #7df9ff);
  box-shadow: 0 0 16px rgba(0, 245, 255, 0.35);
}

.search-row {
  display: flex;
  justify-content: center;
  width: 100%;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 70%;
  min-width: 320px;
  padding: 10px 12px;
  border-radius: 999px;
  border: 1px solid rgba(125, 249, 255, 0.26);
  background: rgba(255, 255, 255, 0.04);
  box-shadow: 0 0 18px rgba(0, 255, 224, 0.12);
}

.search-box input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: #f4fbff;
  font-size: 1rem;
  padding: 6px 8px;
}

.search-box input::placeholder {
  color: #7a8aa0;
}

.search-btn {
  border: none;
  padding: 10px 16px;
  border-radius: 999px;
  background: linear-gradient(135deg, #7df9ff, #6acfff);
  color: #03111d;
  font-weight: 700;
  cursor: pointer;
}

.main-content {
  flex: 1;
  padding: 24px;
}

.footer {
  padding: 16px 24px 24px;
  text-align: center;
  color: #7a8aa0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(4, 8, 18, 0.92);
}

@media (max-width: 860px) {
  .topbar-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .search-box {
    width: 100%;
    min-width: 0;
  }
}
</style>
