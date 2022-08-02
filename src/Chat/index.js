import $ from 'jquery'
import Head from './Head'
import Main from './Main'
import Footer from './Footer'

class Chat {
  #chat = null
  #head = null
  #main = null
  #footer = null

  constructor() {
    this.#chat = $('<div></div>').css({
      position: 'fixed',
      right: '12px',
      bottom: '84px',
      margin: '15px 12px',
      width: '375px',
      height: '700px',
      backgroundColor: 'rgba(255, 255, 255, 1)',
      borderRadius: '18px',
      boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
      zIndex: 1001,
      display: 'none',
      overflow: 'hidden'
    })
    this.#chat.click(() => {
      this.#footer.hideEmoji(400, 'linear')
    })
    this.#initHead()
    this.#initMain()
    this.#initFooter()
  }

  // 初始化头部
  #initHead() {
    this.#head = new Head()
    this.#head.narrowClick((event) => {
      event.preventDefault()
      event.stopPropagation()
      this.toggle()
    })
    this.#chat.append(this.#head.getNode())
  }

  // 初始化记录面板
  #initMain() {
    this.#main = new Main()
    this.#chat.append(this.#main.getNode())
  }

  // 初始化底部
  #initFooter() {
    this.#footer = new Footer()
    this.#footer.inputKeyup((event) => {
      event.preventDefault()
      event.stopPropagation()
      if (event.keyCode == 13) {
        const value = this.#footer.getValue()
        console.log('按下了enter', '输入框的值为：' + value)
      }
    })
    this.#footer.send((event) => {
      event.preventDefault()
      event.stopPropagation()
      const value = this.#footer.getValue()
      console.log('输入框的值为：' + value)
    })
    this.#chat.append(this.#footer.getNode())
  }

  // 返回当前类的dom实例
  getNode() {
    return this.#chat
  }

  // 显示或隐藏
  toggle() {
    this.#footer.hideEmoji()
    this.#chat.toggle(400, 'linear')
  }
}

export default Chat
