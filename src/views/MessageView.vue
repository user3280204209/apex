<script setup>
import { ref } from 'vue'

const menus = ['回复我的', '系统消息', '我的消息']

const sessions = ref([
  {
    avatar: 'N',
    name: 'Neon 官方',
    preview: '新品上架提醒：霓虹光脑 Pro 已上架',
    time: '09:20',
    unread: true,
    messages: [
      { type: 'other', text: '这款新品很适合夜间使用，质感也很不错。' },
      { type: 'self', text: '我已经看过了，颜色很有未来感。' },
      { type: 'other', text: '如果你愿意，我也可以顺手给你推荐搭配配件。' },
    ],
  },
  {
    avatar: 'S',
    name: '客服小星',
    preview: '您好，关于订单发货还有什么需要帮助的吗？',
    time: '昨天',
    unread: false,
    messages: [
      { type: 'other', text: '您好，关于订单发货还有什么需要帮助的吗？' },
      { type: 'self', text: '我想确认一下物流进度。' },
    ],
  },
  {
    avatar: 'L',
    name: '洛洛',
    preview: '我把优惠券规则发你了，看看是否合适',
    time: '前天',
    unread: true,
    messages: [
      { type: 'other', text: '我把优惠券规则发你了，看看是否合适。' },
    ],
  },
])

const activeSession = ref(sessions.value[0])
const inputMsg = ref('')

const changeSession = (session) => {
  activeSession.value = session
  session.unread = false
}

const sendMsg = () => {
  const content = inputMsg.value.trim()
  if (!content) return

  activeSession.value.messages.push({ type: 'self', text: content })
  inputMsg.value = ''

  window.setTimeout(() => {
    activeSession.value.messages.push({
      type: 'other',
      text: '已收到你的消息，我们会尽快回复！',
    })
  }, 800)
}
</script>

<template>
  <section class="message-page">
    <div class="message-shell">
      <aside class="menu-panel">
        <div class="menu-title">消息中心</div>
        <div class="menu-list">
          <button v-for="item in menus" :key="item" class="menu-item">
            {{ item }}
          </button>
        </div>
      </aside>

      <section class="session-panel">
        <div class="panel-title">会话列表</div>
        <div class="session-list">
          <article
            v-for="item in sessions"
            :key="item.name"
            class="session-card"
            :class="{ active: item.name === activeSession.name }"
            @click="changeSession(item)"
          >
            <div class="avatar">{{ item.avatar }}</div>
            <div class="session-body">
              <div class="session-top">
                <h3>{{ item.name }}</h3>
                <span class="time">{{ item.time }}</span>
              </div>
              <p>{{ item.preview }}</p>
            </div>
            <span v-if="item.unread" class="unread-dot"></span>
          </article>
        </div>
      </section>

      <section class="chat-panel">
        <div class="chat-header">
          <div>
            <h3>{{ activeSession.name }}</h3>
            <p>在线 · 现在可以回复</p>
          </div>
          <span class="status-pill">官方</span>
        </div>

        <div class="chat-body">
          <div v-for="(item, index) in activeSession.messages" :key="`${activeSession.name}-${index}`" class="bubble-row" :class="item.type">
            <div class="bubble">{{ item.text }}</div>
          </div>
        </div>

        <div class="chat-footer">
          <input v-model="inputMsg" type="text" placeholder="输入消息..." @keyup.enter="sendMsg" />
          <button @click="sendMsg">发送</button>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.message-page {
  display: flex;
  justify-content: center;
}

.message-shell {
  display: grid;
  grid-template-columns: 220px 280px 1fr;
  width: 100%;
  max-width: 1280px;
  min-height: 680px;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(125, 249, 255, 0.2);
  background: rgba(6, 12, 26, 0.92);
  box-shadow: 0 0 28px rgba(0, 255, 224, 0.1);
}

.menu-panel,
.session-panel,
.chat-panel {
  border-right: 1px solid rgba(125, 249, 255, 0.14);
}

.menu-panel {
  padding: 22px 16px;
  background: rgba(3, 10, 22, 0.95);
}

.menu-title,
.panel-title {
  margin-bottom: 16px;
  color: #7df9ff;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.menu-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu-item {
  width: 100%;
  text-align: left;
  border: none;
  padding: 12px 14px;
  border-radius: 12px;
  background: transparent;
  color: #dcefff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.menu-item:hover {
  background: rgba(125, 249, 255, 0.14);
  color: #f4fbff;
}

.session-panel {
  padding: 18px 14px;
  background: rgba(8, 14, 28, 0.96);
}

.session-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.session-card {
  display: grid;
  grid-template-columns: 42px 1fr 10px;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(125, 249, 255, 0.12);
  cursor: pointer;
  transition: all 0.2s ease;
}

.session-card:hover,
.session-card.active {
  background: rgba(125, 249, 255, 0.1);
  border-color: rgba(125, 249, 255, 0.3);
}

.avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #00f5ff, #6a5cff);
  color: #03111d;
  font-weight: 700;
}

.session-body {
  min-width: 0;
}

.session-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
}

.session-top h3 {
  margin: 0;
  color: #f4fbff;
  font-size: 0.95rem;
}

.time {
  color: #7a8aa0;
  font-size: 0.76rem;
}

.session-body p {
  margin: 0;
  color: #a8b9cd;
  font-size: 0.84rem;
  line-height: 1.45;
}

.unread-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ff4d4f;
  box-shadow: 0 0 8px rgba(255, 77, 79, 0.7);
}

.chat-panel {
  display: flex;
  flex-direction: column;
  padding: 18px 22px 20px;
  background: rgba(6, 12, 24, 0.95);
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(125, 249, 255, 0.14);
}

.chat-header h3 {
  margin: 0 0 4px;
  color: #f4fbff;
}

.chat-header p {
  margin: 0;
  color: #7a8aa0;
  font-size: 0.88rem;
}

.status-pill {
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(0, 245, 255, 0.12);
  color: #7df9ff;
  font-size: 0.8rem;
}

.chat-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 0;
}

.bubble-row {
  display: flex;
}

.bubble-row.other {
  justify-content: flex-start;
}

.bubble-row.self {
  justify-content: flex-end;
}

.bubble {
  max-width: 72%;
  padding: 10px 12px;
  border-radius: 14px;
  line-height: 1.5;
  font-size: 0.95rem;
}

.bubble-row.other .bubble {
  background: rgba(255, 255, 255, 0.06);
  color: #dcefff;
  border: 1px solid rgba(125, 249, 255, 0.12);
}

.bubble-row.self .bubble {
  background: linear-gradient(135deg, rgba(0, 245, 255, 0.2), rgba(106, 92, 255, 0.2));
  color: #f4fbff;
  border: 1px solid rgba(125, 249, 255, 0.24);
}

.chat-footer {
  display: flex;
  gap: 10px;
  padding-top: 14px;
  border-top: 1px solid rgba(125, 249, 255, 0.14);
}

.chat-footer input {
  flex: 1;
  border: 1px solid rgba(125, 249, 255, 0.18);
  border-radius: 999px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.04);
  color: #f4fbff;
  outline: none;
}

.chat-footer input::placeholder {
  color: #7a8aa0;
}

.chat-footer button {
  border: none;
  border-radius: 999px;
  padding: 10px 16px;
  background: linear-gradient(135deg, #7df9ff, #6acfff);
  color: #03111d;
  font-weight: 700;
  cursor: pointer;
}

@media (max-width: 1080px) {
  .message-shell {
    grid-template-columns: 200px 250px 1fr;
  }
}

@media (max-width: 860px) {
  .message-shell {
    grid-template-columns: 1fr;
  }

  .menu-panel,
  .session-panel,
  .chat-panel {
    border-right: none;
    border-bottom: 1px solid rgba(125, 249, 255, 0.14);
  }
}
</style>
