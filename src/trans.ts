
const trans = new Map()

trans.set("HTuFzfsQpom58JYmLZeWo", "Hello, World!")
trans.set("Mlvc0CGpoEUsVSNml20dA", "Very, nice!")

/**
 * Translation WebComponent
 * 
 * Parcel v1 
 * 
 * Use shadow doom, see https://stackblitz.com/edit/customelements?file=app.js
 *                  and https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM
 * 
 */
class Trans extends HTMLElement {
  shadowDOM: ShadowRoot

  constructor() {
    super()
    this.shadowDOM = this.attachShadow({ mode: "open" })
  }

  connectedCallback() {
    this.setContent(trans.get(this.getAttribute("trans-key")))
  }

  setContent(content: string) {
    this.shadowDOM.textContent = content
  }
}

customElements.define("x-trans", Trans)
