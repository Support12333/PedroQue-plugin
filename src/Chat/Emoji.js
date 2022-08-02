import $ from 'jquery'
import Face from '@/assets/face.png'
import FaceActive from '@/assets/face-active.png'
import Animal from '@/assets/animal.png'
import AnimalActive from '@/assets/animal-active.png.png'
import Fruit from '@/assets/fruit.png'
import FruitActive from '@/assets/fruit-active.png'
import Activity from '@/assets/activity.png'
import ActivityActive from '@/assets/activity-active.png'
import Travel from '@/assets/travel.png'
import TravelActive from '@/assets/travel-active.png'
import Objects from '@/assets/objects.png'
import ObjectsActive from '@/assets/objects-active.png'
import Symbols from '@/assets/symbols.png'
import SymbolsActive from '@/assets/symbols-active.png'
import EmojiList from '@/utils/emoji'

class Emoji {
  #emoji = null
  #navbar = null
  #main = null
  // 未激活的图标
  #navbarBoxIcon = [Face, Animal, Fruit, Activity, Travel, Objects, Symbols]
  // 激活的图标
  #navbarBoxIconActive = [FaceActive, AnimalActive, FruitActive, ActivityActive, TravelActive, ObjectsActive, SymbolsActive]
  // emoji数组
  #emojiList = EmojiList

  constructor() {
    this.#emoji = $('<div class="PQ_emoji_panel"></div>')
    this.#emoji.click(event => {
      event.preventDefault()
      event.stopPropagation()
    })
    this.#initNavbar()
    this.#initMain()
  }

  // 初始化navbar
  async #initNavbar() {
    this.#navbar = $('<div class="PQ_vertical_center PQ_emoji_navbar"></div>').css({
      position: 'relative',
      padding: '0 6px',
      justifyContent: 'space-between'
    })
    // 渲染navbar
    this.#navbarBoxIcon.forEach((icon, index) => {
      const boxIcon = $('<a class="PQ_center"><img style="width: 18px; height: 18px" /></a>').css({
        width: '34px',
        height: '42px',
        transition: 'all .4s'
      })
      // 初始化时，为第一个nav按钮附选中色
      if (index == 0) {
        boxIcon.children('img').attr('src', this.#navbarBoxIconActive[0])
      } else {
        boxIcon.children('img').attr('src', icon)
      }
      this.#navbar.append(boxIcon)
    })
    this.#navbar.css('--left', `${this.#navbar.children('a')[0].offsetLeft}`)
    const self = this
    // 事件委托为子元素绑定事件
    this.#navbar.delegate('a', 'click', function (event) {
      event.preventDefault()
      event.stopPropagation()
      // 获取当前点击元素的下标
      const index = $(this).index()
      // 获取对应内容区所在位置
      const offsetTop = self.#main.children('section')[index].offsetTop
      // 滚动到指定位置
      self.#main.animate({ scrollTop: offsetTop }, 500)
    })
    this.#emoji.append(this.#navbar)
  }

  // 初始化内容区域
  #initMain() {
    this.#main = $('<div class="PQ_emoji_main"></div>')
    this.#emojiList.forEach(item => {
      const section = $(`<section><div class="PQ_emoji_title">${item.name}</div><ul class="PQ_emoji_ul"></ul></section>`)
      item.list.forEach(emoji => {
        const li = $(`<li class="PQ_emoji_li"><span>${emoji}</span></li>`)
        section.children('ul').append(li)
      })
      this.#main.append(section)
    })
    this.#main.scroll(() => {
      // 获取当前滚动条的位置
      const scrollTop = this.#main.scrollTop()
      const navbarList = this.#navbar.children('a')
      for (let i = 0; i < navbarList.length; i++) {
        const section = this.#main.children('section')[i]
        if (scrollTop >= section.offsetTop) {
          for (let j = 0; j < navbarList.length; j++) {
            $(navbarList[j]).children('img').attr('src', this.#navbarBoxIcon[j])
          }
          $(navbarList[i]).children('img').attr('src', this.#navbarBoxIconActive[i])
          this.#navbar.css('--left', `${navbarList[i].offsetLeft}px`)
        }
      }
    })
    this.#emoji.append(this.#main)
  }

  // 返回当前dom实例
  getNode() {
    return this.#emoji
  }

  // 返回当前mian的实例
  getMainNode() {
    return this.#main
  }
}

export default Emoji
