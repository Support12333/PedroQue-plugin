import $ from 'jquery'
import Emoji from './Emoji'
import EmojiIcon from '@/assets/emoji.png'
import EmojiIconActive from '@/assets/emoji-active.png'
import Send from '@/assets/send.png'
import SendActive from '@/assets/send-active.png'

class Footer {
  #footer = null
  #footerLeft = null
  #footerRight = null
  #emoji = null
  #emojiPanel = new Emoji()
  #send = null

  constructor() {
    this.#footer = $('<div class="PQ_vertical_center PQ_footer" style="position: relative; padding: 10px 16px;"></div>')
    this.#initLeft()
    this.#initRight()
  }

  // 底部的左侧内容
  #initLeft() {
    this.#footerLeft = $('<div class="PQ_vertical_center" style="flex: 1; height: 30px; line-height: 30px;"><input placeholder="提问..." /></div>')
    this.#footerLeft.children('input').css({
      flex: 1,
      fontSize: '16px',
      lineHeight: '32px',
      border: 'none',
      outline: 'none'
    })
    this.#footer.append(this.#footerLeft)
    const self = this
    this.#emojiPanel.getMainNode().delegate('section ul li', 'click', function (event) {
      event.preventDefault()
      event.stopPropagation()
      const value = self.getValue()
      const txt = $(this).children('span').text()
      self.#footerLeft.children('input').val(value + txt)
      self.#footerLeft.children('input').focus()
    })
  }

  // 底部的右侧内容
  #initRight() {
    this.#footerRight = $('<div class="PQ_vertical_center"></div>')
    this.#footer.append(this.#footerRight)
    this.#initEmoji()
    this.#initSend()
  }

  // 表情按钮
  #initEmoji() {
    this.#emoji = $('<div class="PQ_center PQ_footer_btn"><img style="width: 24px; height: 24px" /></div>')
    this.#emoji.children('img').attr('src', EmojiIcon)
    this.#emoji.mouseenter((event) => {
      event.preventDefault()
      event.stopPropagation()
      this.#emoji.children('img').attr('src', EmojiIconActive)
    })
    this.#emoji.mouseleave((event) => {
      event.preventDefault()
      event.stopPropagation()
      this.#emoji.children('img').attr('src', EmojiIcon)
    })
    this.#emoji.click((event) => {
      event.preventDefault()
      event.stopPropagation()
      this.#emojiPanel.getNode().toggle(400, 'linear')
    })
    this.#emoji.append(this.#emojiPanel.getNode())
    this.#footerRight.append(this.#emoji)
  }

  // 发送按钮
  #initSend() {
    this.#send = $('<div class="PQ_center PQ_footer_btn"><img style="width: 24px; height: 24px" /></div>')
    this.#send.children('img').attr('src', Send)
    this.#send.mouseenter((event) => {
      event.preventDefault()
      event.stopPropagation()
      this.#send.children('img').attr('src', SendActive)
    })
    this.#send.mouseleave((event) => {
      event.preventDefault()
      event.stopPropagation()
      this.#send.children('img').attr('src', Send)
    })
    this.#footerRight.append(this.#send)
  }

  // 返回当前类的dom实例
  getNode() {
    return this.#footer
  }

  // 获取input框的值
  getValue() {
    return this.#footerLeft.children('input').val()
  }

  // 文本框的按下键盘事件
  inputKeyup(callback) {
    this.#footerLeft.children('input').keyup((event) => {
      callback(event)
    })
  }

  // 隐藏表情面板
  hideEmoji(speed = 0, slow) {
    if (this.#emojiPanel.getNode().is(':hidden')) return
    this.#emojiPanel.getNode().hide(speed, slow)
  }

  // 发送事件
  send(callback) {
    this.#send.click((event) => {
      callback(event)
    })
  }
}

export default Footer
