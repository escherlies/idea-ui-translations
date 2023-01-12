
const trans = new Map()

trans.set("HTuFzfsQpom58JYmLZeWo", "Hello, World!")
trans.set("Mlvc0CGpoEUsVSNml20dA", "Very, nice!")


class Trans extends HTMLElement {
  constructor() {
    super()
    this.innerText = trans.get(this.getAttribute("trans-key"))
  }
}

customElements.define("x-trans", Trans)
