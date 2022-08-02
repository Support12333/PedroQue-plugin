import $ from 'jquery'
import btn from '@/assets/btn.png'

class EntranceButton {
  #entranceBtn = null

  constructor() {
    this.#entranceBtn = $('<div class="PQ_center"><img style="width: 32px;height: 32px" /></div>').css({
      position: 'fixed',
      right: '12px',
      bottom: '24px',
      margin: '0px 12px',
      width: '60px',
      height: '60px',
      backgroundColor: 'rgba(0, 164, 236, 1)',
      borderRadius: '60px',
      cursor: 'pointer',
      boxShadow: 'rgba(0, 0, 0, 0.15) 0px 4px 12px 0px',
      zIndex: 1000,
      transition: 'all 0.4s'
    })
    this.#entranceBtn.children('img').attr('src', btn)
  }

  // 返回当前dom节点
  getNode() {
    return this.#entranceBtn
  }
}

export default EntranceButton
