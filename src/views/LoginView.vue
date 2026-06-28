<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  account: '',
  password: '',
})
const errorMsg = ref('')

const handleLogin = () => {
  errorMsg.value = ''

  if (!form.value.account.trim()) {
    errorMsg.value = '请输入账号'
    return
  }

  if (!form.value.password.trim()) {
    errorMsg.value = '请输入密码'
    return
  }

  localStorage.setItem('isLogin', 'true')
  localStorage.setItem('userName', 'Neon Rider')
  router.push('/')
}
</script>

<template>
  <section class="panel login-panel">
    <div class="login-card">
      <p class="eyebrow">WELCOME BACK</p>
      <h2>登录 Neon Market</h2>
      <p class="intro">查看最新商品、追踪订单和享受专属优惠。</p>
      <form class="login-form" @submit.prevent="handleLogin">
        <label>
          <span>账号</span>
          <input v-model="form.account" type="text" placeholder="请输入手机号/邮箱" />
        </label>
        <label>
          <span>密码</span>
          <input v-model="form.password" type="password" placeholder="请输入密码" />
        </label>
        <p class="error-msg">{{ errorMsg }}</p>
        <button class="btn btn-primary btn-block" type="submit">立即登录</button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.login-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.login-card {
  width: min(460px, 100%);
  padding: 32px;
  border-radius: 24px;
  border: 1px solid rgba(125, 249, 255, 0.24);
  background: rgba(7, 13, 27, 0.82);
  box-shadow: 0 0 28px rgba(0, 255, 224, 0.12);
}

.intro {
  margin-bottom: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.login-form label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #dcefff;
}

.login-form input {
  width: 100%;
  border: 1px solid rgba(125, 249, 255, 0.2);
  border-radius: 12px;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.06);
  color: #f4fbff;
}

.login-form input:focus {
  outline: none;
  border-color: rgba(125, 249, 255, 0.55);
  box-shadow: 0 0 0 3px rgba(0, 245, 255, 0.15);
}

.error-msg {
  min-height: 18px;
  margin: 0;
  color: #ff4d4f;
  font-size: 0.8rem;
}
</style>
