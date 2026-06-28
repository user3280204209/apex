<template>
  <div class="login-wrap panel">
    <h2>账号注册</h2>
    <div class="form-item">
      <label>账号</label>
      <input v-model="form.account" placeholder="输入账号" />
    </div>
    <div class="form-item">
      <label>密码</label>
      <input v-model="form.pwd" type="password" placeholder="至少6位" />
    </div>
    <div class="form-item">
      <label>昵称</label>
      <input v-model="form.name" placeholder="你的昵称" />
    </div>
    <div class="form-item">
      <label>上传头像</label>
      <input type="file" accept="image/*" @change="handleUpload" />
      <img v-if="avatar" :src="avatar" class="preview" />
    </div>
    <button class="btn btn-primary btn-block" @click="register">立即注册</button>
    <p class="tip">已有账号？<router-link to="/login">去登录</router-link></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const form = ref({
  account: '',
  pwd: '',
  name: '',
})
const avatar = ref('')

const handleUpload = (e) => {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => {
    avatar.value = ev.target.result
  }
  reader.readAsDataURL(file)
}

const getUserList = () => JSON.parse(localStorage.getItem('userList') || '[]')
const register = () => {
  const { account, pwd, name } = form.value
  if (!account || !pwd || !name) return alert('请填写完整信息')
  if (pwd.length < 6) return alert('密码至少6位')
  const list = getUserList()
  if (list.find((item) => item.account === account)) {
    return alert('该账号已被注册')
  }
  list.push({
    account,
    password: pwd,
    username: name,
    avatar: avatar.value || '',
  })
  localStorage.setItem('userList', JSON.stringify(list))
  alert('注册成功，前往登录')
  router.push('/login')
}
</script>

<style scoped>
.login-wrap { width: 420px; margin: 40px auto; }
.form-item { margin: 16px 0; }
label { display: block; margin-bottom: 6px; color: #7df9ff; }
input { width: 100%; padding: 10px; border-radius: 8px; background: rgba(255,255,255,0.05); border: 1px solid rgba(125,249,255,0.2); color: #fff; outline: none; }
.preview { width: 80px; height: 80px; border-radius: 50%; margin-top: 8px; object-fit: cover; }
.tip { margin-top: 14px; text-align: center; color: #a8b9cd; }
.tip a { color: #7df9ff; }
</style>
