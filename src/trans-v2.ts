import { forEach, addIndex } from "ramda"

const forEachIndexed = addIndex<string>(forEach)

const trans = new Map<string, string>()


// Functions

/**
 * Hash the semantic key
 * 
 * TODO: implementation + check necessity
 */
const hash = (a: string): string => {
  return a
}


/**
 * Handle placeholders
 * 
 * A minimal templating engine for prototyping
 */
const replacePlaceholders = (key: string, translation: string, values: string[]) => {
  let result = translation

  const placeholders = translation.match(/({{.*?}})/g) || []
  // iterate over placeholders
  forEachIndexed((placeholder, i) => {
    const v = values[i]
    if (v) {
      result = result.replace(placeholder, values[i])
    } else {
      result = result.replace(placeholder, "")
      console.error(`Translation: There is no value for placeholder ${placeholder} in "${key}".`)
    }
  }, placeholders)

  return result
}


/**
 *  Handle translations
 * 
 *  A minimal "translation" function. For prototyping
 */
const getTranslation = (a: string) => {
  const t = trans.get(hash(a))
  if (t) {
    return t
  } else {
    trans.set(hash(a), a)
    return a
  }
}


const getRandomId = () => {
  return Math.round(Math.random() * 1e8).toString(16)
}


/**
 * Translation WebComponent
 * 
 */
class TransV2 extends HTMLElement {

  constructor() {
    super()
  }

  connectedCallback() {
    const key = this.getAttribute("trans-desc")
    const valuesEncoded = this.getAttribute("trans-vars")
    const values = valuesEncoded ? JSON.parse(valuesEncoded) : []

    if (!key) {
      const id = getRandomId()
      console.error(`Missing trans-desc attribute. Node marked with id ${id}`)
      this.setAttribute("id", id)
      return
    }

    const t1 = getTranslation(key)
    const t2 = replacePlaceholders(key, t1, values)

    this.setContent(t2)
  }

  setContent(content: string) {
    this.textContent = content
  }
}

customElements.define("x-trans-v2", TransV2)

