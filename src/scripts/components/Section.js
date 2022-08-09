export default class Section {
  constructor({ /* items, */ renderer }, containerSelector) {
    /* this._items = items */
    this.renderer = renderer
    this._container = document.querySelector(containerSelector)
  }

  /*   renderItems() {
    this._items.forEach(item => {
      this.renderer(item)
    })
  } */

  renderItems(items) {
    items.forEach(item => {
      this.renderer(item)
    })
  }

  addItem(element, method) {
    this._container[method](element)
  }
}
