import $ from 'jquery'
import Logo from '@/assets/logo.png'
import Narrow from '@/assets/narrow.png'

class Head {
  #head = null
  #headLeft = null
  #headRight = null

  constructor() {
    this.#head = $('<div class="PQ_vertical_center"></div>').css({
      padding: '0 14px',
      height: '60px',
      boxShadow: '0 1px 0 rgba(0, 0, 0, 0.08)',
      justifyContent: 'space-between'
    })
    this.#initLeft()
    this.#initRight()
  }

  // 头部的左边内容
  #initLeft() {
    this.#headLeft = $('<div class="PQ_vertical_center"><img style="height: 26px" /><span>Tuiker bot</span></div>')
    this.#headLeft.children('img').attr('src', Logo)
    this.#headLeft.children('span').css({
      marginLeft: '12px',
      fontSize: '18px',
      fontWeight: 600,
      color: '#1c1e21'
    })
    this.#head.append(this.#headLeft)
  }

  // 头部的右侧内容
  #initRight() {
    this.#headRight = $('<div class="PQ_vertical_center" style="margin: 0 -12px"><div class="PQ_head_btn PQ_center"><img style="width: 16px; height: 16px" /></div></div>')
    this.#headRight.children('div').children('img').attr('src', Narrow)
    this.#head.append(this.#headRight)
  }

  // 返回当前类的dom实例
  getNode() {
    return this.#head
  }

  // 缩小箭头点击事件
  narrowClick(callback) {
    this.#headRight.children('div').click((event) => {
      callback(event)
    })
  }
}

export default Head
