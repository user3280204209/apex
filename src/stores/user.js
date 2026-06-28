import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLogin: localStorage.getItem('isLogin') === 'true',
    userInfo: JSON.parse(localStorage.getItem('nowUser') || '{}'),
  }),
  actions: {
    setLogin(status, user) {
      this.isLogin = status
      this.userInfo = user
      localStorage.setItem('isLogin', status ? 'true' : 'false')
      localStorage.setItem('nowUser', JSON.stringify(user))
    },
    updateUser(user) {
      this.userInfo = user
      localStorage.setItem('nowUser', JSON.stringify(user))
    },
    logout() {
      this.isLogin = false
      this.userInfo = {}
      localStorage.removeItem('isLogin')
      localStorage.removeItem('nowUser')
    },
  },
})
