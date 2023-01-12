# Translations

A sketch of an idea.

# Idea

Seperating the concerns via WebComponents.

## UI

```elm
view : Model -> Html Msg
view _ =
    root
        (column
            []
            [ buttonWith (trans "HTuFzfsQpom58JYmLZeWo") NoOp
            , buttonWith (trans "Mlvc0CGpoEUsVSNml20dA") NoOp
            ]
        )
```

## Trans module

```ts
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
```

