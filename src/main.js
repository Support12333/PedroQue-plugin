import $ from 'jquery'
import EntranceButton from './EntranceButton'
import Chat from './Chat'
import './style.css'

class PedroQue {
  #app = null
  // 按钮
  #entranceBtn = null
  // 面板
  #chatPanel = null

  constructor(params = {}) {
    const { el } = params
    // 初始化dom节点
    this.#app = $(el || 'body')
    this.#initEntranceBtn()
    this.#initChatPanel()
  }

  // 初始化按钮节点
  #initEntranceBtn() {
    this.#entranceBtn = new EntranceButton().getNode()
    this.#entranceBtn.click((event) => {
      event.preventDefault()
      event.stopPropagation()
      this.#chatPanel.toggle()
    })
    this.#app.append(this.#entranceBtn)
  }

  // 初始化聊天面板
  #initChatPanel() {
    this.#chatPanel = new Chat()
    this.#app.append(this.#chatPanel.getNode())
  }
}

export default PedroQue
