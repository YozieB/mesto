export default class Section {
  constructor({ renderer }, containerSelector) {
    this.renderer = renderer
    this._container = document.querySelector(containerSelector)
  }
  renderItems(items) {
    items.forEach(item => {
      this.renderer(item)
    })
  }

  addItem(element, method) {
    this._container[method](element)
  }
}
