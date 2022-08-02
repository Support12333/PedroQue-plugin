import $ from 'jquery'
import ErrorIcon from '@/assets/error.png'

class Main {
  #main = null

  constructor() {
    this.#main = $('<div class="PQ_main"></div>')
    // this.#initWrapper({type:1})
  }

  async #initWrapper(item) {
    const wrapper = $('<div class="PQ_wrapper" style="position: relative; margin: 8px 0; padding: 0 50px;"></div>')
    // 聊天内容
    const content = $('<div style="color: rgba(98, 98, 98, 1); display: flex;"></div>')
    // 判断类型为2，则右对齐，表示用户所发消息
    if (item.type == 2) {
      content.css('justify-content', 'flex-end')
    }
    const record = item?.record || {}
    // 卡片类型
    if (record?.type == 'card') {
      const card = $('')
    } else {
      const block = $('<div style="margin: 8px 0; display: inline-block; overflow: hidden; border-radius: 20px; border: 1px solid #00a4ec; word-wrap: break-word;"></div>')
      // 是否有按钮
      if (record.button && record.button.length) {
        // 创建按钮消息的父级
        const menu = $('<div style="position: relative; min-width: 260px"></div>')
        // 判断是否为文字
        if (record?.type == 'text') {
          menu.html(`<div style="padding: 10px 14px; white-space: pre-wrap">${record?.text}</div>`)
        } else {
          // 判断是否为图片
          const image = $('<div class="PQ_center" style="position: relative; min-width: 260px; max-width: 480px; min-height: 100px; overflow: hidden;"></div>')
          // 调用检查url是否有效方法，有效则添加图片节点，无效则添加错误提示节点
          image.append(await this.#checkImgExists())
          menu.append(image)
        }
        block.append(menu)
        record.button.forEach(btn => {
          // 创建按钮节点
          const button = $(`<div style="padding: 10px 14px; border: 1px solid #e1e5ea; color: #00a4ec; text-align: center; background-color: #fff; cursor: pointer">${btn.title}</div>`)
          // 判断是否添加点击跳转到指定地址事件
          if (btn.type == "web_url" && btn.url) {
            button.click((event) => {
              event.preventDefault()
              event.stopPropagation()
              window.open(btn.url)
            })
          }
          block.append(button)
        })
      } else {
        // 没有按钮的文本或图片消息
        if (record?.type == 'text') {
          block.html(`<div style="padding: 8px 16px; font-size: 15px; line-height: 20px; white-space: pre-wrap;">${record?.text}</div>`)
        } else {
          const image = $('<div class="PQ_center" style="position: relative; min-width: 260px; max-width: 480px; min-height: 100px; overflow: hidden;"></div>')
          image.append(await this.#checkImgExists())
          block.append(image)
        }
      }
      content.append(block)
    }
    wrapper.append(content)
    return wrapper
  }

  // 判断图片链接是否有效
  #checkImgExists(url) {
    return new Promise((resolve, reject) => {
      const imgObj = new Image()
      imgObj.src = url
      imgObj.onload = () => {
        imgObj = $(imgObj).css({
          width: '100%',
          height: '100%',
          maxWidth: '100%',
          maxHeight: '100%',
          display: 'block',
          verticalAlign: 'top',
          cursor: 'pointer'
        })
        resolve(imgObj)
      }
      imgObj.onerror = () => {
        const error = $(`<div style="text-align: center"><div style="display: flex; justify-content: center"><img src="${ErrorIcon}" style="width: 30px; height: 30px" /></div><div style="margin-top: 4px; font-size: 12px">加载失败</div></div>`)
        reject(error)
      }
    })
  }

  // 返回当前类的dom实例
  getNode() {
    return this.#main
  }
}

export default Main
