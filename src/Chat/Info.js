import $ from "jquery";

class Info {
  #info = null;
  #text = null;

  constructor() {
    this.#info = $('<div class="PQ_info" style="max-width:275px"></div>');
    this.#information();
  }

  #information(value) {
    this.#text = $(
      `<div style="background:#fff;box-shadow:0 3px 4px 0 rgba(87,116,151,.1);padding:8px 16px;border-radius:16px;font-size:12px;margin:16px 0;">${value}</div>`
    );
    this.Info.append(this.#text)
  }

  // 返回当前类的dom实例
  getNode() {
    return this.#info;
  }
}
export default Info;
