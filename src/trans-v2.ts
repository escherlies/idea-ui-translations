
const trans = new Map<string, string>()

/**
 * Translation WebComponent
 * 
 * 
 * Use shadow doom, see https://stackblitz.com/edit/customelements?file=app.js
 *                  and https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM
 * 
 */
class TransV2 extends HTMLElement {
  shadowDOM: ShadowRoot

  constructor() {
    super()
    this.shadowDOM = this.attachShadow({ mode: "open" })
  }

  connectedCallback() {
    const a = this.getAttribute("trans-desc")
    if (!a) {
      this.setContent("Missing trans-desc attribute.")
      return
    }

    const t = trans.get(hash(a))
    if (t) {
      this.setContent(t)
    } else {
      trans.set(hash(a), a)
      this.setContent(a)
    }
  }

  setContent(content: string) {
    this.shadowDOM.textContent = content
  }
}

customElements.define("x-trans-v2", TransV2)


function hash(a: string): string {
  // TODO: implementation + check necessity
  return a
}

