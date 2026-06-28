<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const placeholderWords = ['游戏手柄', '智能耳机', '机械键盘', '便携平板']
const currentPlaceholder = ref(placeholderWords[0])
let timer = null

const searchValue = ref('')
const searchHistory = ref(JSON.parse(localStorage.getItem('searchHistory') || '[]'))
const suggestions = ref([])
const searchResults = ref([])
const showDropdown = ref(false)
const showEmptyTip = ref(false)
const searchContainer = ref(null)
const loginVisible = ref(false)
const loginState = ref(localStorage.getItem('isLogin') === 'true')
const currentUser = ref(JSON.parse(localStorage.getItem('nowUser') || '{}'))

const initLoginState = () => {
  loginState.value = localStorage.getItem('isLogin') === 'true'
  currentUser.value = JSON.parse(localStorage.getItem('nowUser') || '{}')
}

const logout = () => {
  localStorage.removeItem('isLogin')
  localStorage.removeItem('nowUser')
  initLoginState()
  loginVisible.value = false
}

const mockLogin = (name) => {
  localStorage.setItem('isLogin', 'true')
  localStorage.setItem('userName', name)
  initLoginState()
}

const loadHistory = () => {
  searchHistory.value = JSON.parse(localStorage.getItem('searchHistory') || '[]')
}

const saveHistory = (history) => {
  localStorage.setItem('searchHistory', JSON.stringify(history))
  searchHistory.value = history
}

const clearSearchInput = () => {
  searchValue.value = ''
  suggestions.value = []
  searchResults.value = []
  showEmptyTip.value = false
  showDropdown.value = !!searchHistory.value.length
}

const handleInput = (event) => {
  searchValue.value = event.target.value
  const value = searchValue.value.trim()
  showEmptyTip.value = false

  if (value) {
    showDropdown.value = true
    mockSuggest(value)
  } else {
    suggestions.value = []
    showDropdown.value = !!searchHistory.value.length
  }
}

const handleSearch = async (text) => {
  const val = (text || searchValue.value).trim()
  if (!val) return
  let history = searchHistory.value.filter((item) => item !== val)
  history.unshift(val)
  if (history.length > 10) history = history.slice(0, 10)
  saveHistory(history)
  searchValue.value = val
  showDropdown.value = false
  suggestions.value = []
  searchResults.value = await mockSearchRequest(val)
  showEmptyTip.value = searchResults.value.length === 0
}

const selectHistory = (key) => {
  searchValue.value = key
  handleSearch(key)
}

const selectSuggest = (key) => {
  searchValue.value = key
  handleSearch(key)
}

const clearHistory = () => {
  saveHistory([])
  suggestions.value = []
  if (!searchValue.value.trim()) showDropdown.value = false
}

const onDocumentClick = (event) => {
  if (searchContainer.value && !searchContainer.value.contains(event.target)) {
    showDropdown.value = false
  }
}

const showLogin = (visible) => {
  if (loginState.value) {
    loginVisible.value = visible
  } else {
    loginVisible.value = visible
  }
}

const toggleLogin = () => {
  loginVisible.value = !loginVisible.value
}

const mockSuggest = (val) => {
  const suggestList = [
    `${val} 优惠券`,
    `${val} 官方旗舰店`,
    `${val} 新款`,
    `${val} 低价`,
    `${val} 测评`,
  ]
  suggestions.value = suggestList
}

const mockSearchRequest = (val) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(val === '无结果测试' ? [] : [`${val} 优惠装`, `${val} 官方正品`, `${val} 热卖`] )
    }, 300)
  })
}

onMounted(() => {
  timer = setInterval(() => {
    const index = placeholderWords.indexOf(currentPlaceholder.value)
    const nextIndex = (index + 1) % placeholderWords.length
    currentPlaceholder.value = placeholderWords[nextIndex]
  }, 2000)
  document.addEventListener('click', onDocumentClick)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
  document.removeEventListener('click', onDocumentClick)
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
          <div
            class="login-wrap"
            @mouseenter="showLogin(true)"
            @mouseleave="showLogin(false)"
          >
            <button class="login-btn" aria-label="用户头像" @click.stop="toggleLogin">
              {{ loginState ? (currentUser.username ? currentUser.username.slice(0, 1).toUpperCase() : 'U') : 'N' }}
            </button>
            <div class="login-popover" :class="{ visible: loginVisible }">
              <div class="popover-panel">
                <template v-if="loginState">
                  <div class="menu-avatar">
                    <img v-if="currentUser.avatar" :src="currentUser.avatar" alt="用户头像" />
                    <div v-else class="top-avatar empty">{{ currentUser.username ? currentUser.username.slice(0, 1).toUpperCase() : 'U' }}</div>
                    <span class="user-name">{{ currentUser.username || '默认用户' }}</span>
                  </div>
                  <div class="menu-list">
                    <router-link to="/mine" class="menu-item">个人中心</router-link>
                    <router-link to="/message" class="menu-item">我的消息</router-link>
                    <button class="menu-item logout-btn" @click.stop="logout">退出登录</button>
                  </div>
                </template>
                <template v-else>
                  <div class="panel-title">登录后你可以：</div>
                  <ul>
                    <li>1.免费获取购物建议</li>
                    <li>2.多端同步购买记录</li>
                    <li>3.跟踪产品价格曲线</li>
                    <li>4.多种官方折扣优惠</li>
                  </ul>
                  <router-link class="panel-btn" to="/login">立即登录</router-link>
                  <router-link class="panel-btn" to="/register">注册账号</router-link>
                  <div class="panel-foot">首次使用?立即注册</div>
                </template>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div class="search-row">
        <div class="search-box" ref="searchContainer">
          <input
            type="text"
            class="search-input"
            v-model="searchValue"
            :placeholder="currentPlaceholder"
            @input="handleInput"
            @keydown.enter.prevent="handleSearch(searchValue)"
          />
          <button
            class="clear-btn"
            v-show="searchValue"
            @click.stop="clearSearchInput"
            aria-label="清空搜索"
          >
            ×
          </button>
          <button class="search-btn" @click="handleSearch(searchValue)">搜索</button>

          <div class="search-dropdown" v-if="showDropdown">
            <div class="history-wrap" v-if="!searchValue.trim() && searchHistory.length">
              <p class="history-title">搜索历史</p>
              <div class="history-list">
                <span
                  class="history-item"
                  v-for="item in searchHistory"
                  :key="item"
                  @click.stop="selectHistory(item)"
                >
                  {{ item }}
                </span>
              </div>
              <button class="clear-history" @click.stop="clearHistory">清空历史</button>
            </div>

            <div class="suggest-wrap" v-if="searchValue.trim() && suggestions.length">
              <div
                class="suggest-item"
                v-for="item in suggestions"
                :key="item"
                @click.stop="selectSuggest(item)"
                >
                {{ item }}
              </div>
            </div>

            <div class="results-wrap" v-if="searchResults.length">
              <div class="history-title">搜索结果</div>
              <div class="suggest-item" v-for="item in searchResults" :key="item">{{ item }}</div>
            </div>
          </div>

          <div class="empty-tip" v-if="showEmptyTip">暂无相关结果，换个关键词试试吧～</div>
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

.login-popover.visible {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

  .menu-avatar img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

  .menu-avatar .top-avatar.empty {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(125, 249, 255, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #7df9ff;
    font-weight: 700;
  }

.menu-list {
  padding: 8px 0;
}

.menu-item {
  display: block;
  padding: 8px 16px;
  font-size: 14px;
  color: #333;
  text-decoration: none;
  border: none;
  background: transparent;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.menu-item:hover {
  background: #f5f5f5;
}

.logout-btn {
  width: 100%;
  text-align: left;
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

.login-wrap:hover .login-popover,
.login-popover.visible {
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
  position: relative;
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

.clear-btn {
  border: none;
  background: transparent;
  color: #999;
  font-size: 18px;
  cursor: pointer;
}

.search-dropdown {
  position: absolute;
  top: calc(100% + 12px);
  left: 0;
  right: 0;
  background: rgba(15, 23, 42, 0.98);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  padding: 16px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18);
  z-index: 10;
  color: #f4fbff;
}

.history-title {
  font-size: 0.85rem;
  color: #9ca3af;
  margin: 0 0 10px;
}

.history-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.history-item,
.suggest-item {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: #f4fbff;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.history-item:hover,
.suggest-item:hover {
  background: rgba(255, 255, 255, 0.14);
}

.clear-history {
  font-size: 0.85rem;
  color: #93c5fd;
  border: none;
  background: transparent;
  cursor: pointer;
}

.results-wrap {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.empty-tip {
  position: absolute;
  top: calc(100% + 12px);
  left: 0;
  right: 0;
  padding: 16px;
  text-align: center;
  color: #9ca3af;
  background: rgba(15, 23, 42, 0.98);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  z-index: 10;
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
