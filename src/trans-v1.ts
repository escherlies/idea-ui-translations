
const trans = new Map()

trans.set("HTuFzfsQpom58JYmLZeWo", "Hello, World!")
trans.set("Mlvc0CGpoEUsVSNml20dA", "Very, nice!")

/**
 * Translation WebComponent
 * 
 */
class Trans extends HTMLElement {

  constructor() {
    super()
  }

  connectedCallback() {
    this.setContent(trans.get(this.getAttribute("trans-key")))
  }

  setContent(content: string) {
    this.textContent = content
  }
}

customElements.define("x-trans", Trans)
