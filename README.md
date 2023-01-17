# Translations

A sketch of an idea.

# Problem

The developer should not be concerned with the copy and translations of the UI they are developing, especially for larger bodys of copy text.

# Idea

Seperating the concerns via WebComponents.

## UI

This is actually language agnostic and could use anything that can create a webcomponent!

```elm
-- A Translation function that just implements a custom html node where the webcomponent will be attatched
trans : String -> Element msg
trans key =
    html
        (Html.node "x-trans"
            [ Html.Attributes.attribute
                "trans-key"
                key
            ]
            []
        )


transV2 : String -> Element msg
transV2 description =
    html
        (Html.node "x-trans-v2"
            [ Html.Attributes.attribute "trans-desc" description
            ]
            []
        )


view : Model -> Html Msg
view _ =
    root
        (column
            [ padding 20, spacing 20 ]
            [ -- ***** V1 *****
              -- A translation is implemented by the coder via a random generated key
              -- The copy team can then add the translations as an overlay
              buttonWith (trans "HTuFzfsQpom58JYmLZeWo") NoOp

            -- We could generate this key with a simple editor-plug-in
            , buttonWith (trans "Mlvc0CGpoEUsVSNml20dA") NoOp

            -- ***** V2 *****
            -- Instead a random key, we could use a "semantic key".
            -- This should help the developer, as this is way more declarative
            -- Now we also have a nice default value for when there is no translation presend
            -- Additionally, text that is semantically the same does not get to translated
            -- multiple times
            , buttonWith (transV2 "Logout") NoOp

            -- Simple string interpolation
            -- To work with userdata inside a translation, let's just use simple templating engine
            , paragraph []
                [ transInterpolated
                    "Hi {{username}}, welcome to our translations showcase."
                    --    ^- This is arbitrary since at the moment the order of strings supplied
                    --       to our translation component is used to replace each template placeholder
                    [ "Alice" ]
                ]
            ]
        )
```

## Trans module

### V1

The translations web-component (again, could be anything!) just handles some keys passed down.

```ts

const trans = new Map()

trans.set("HTuFzfsQpom58JYmLZeWo", "Hello, World!")
trans.set("Mlvc0CGpoEUsVSNml20dA", "Very, nice!")

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
```

### V2

The next iteration handles a more semantic key.
This key is hashed and used as default value if no translation is present.

```ts
const trans = new Map<string, string>()

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
```

## Edit mode

To edit the user interface copy there could be an overlay application that attatches itself to every `x-trans` component and writes the edits to a database.


# Performance

_To be tested_