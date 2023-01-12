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

view : Model -> Html Msg
view _ =
    root
        (column
            []
            [
            -- A translation is implemented by the coder via a random generated key
            -- The copy team can then add the translations as an overlay 
               buttonWith (trans "HTuFzfsQpom58JYmLZeWo") NoOp
            -- We could generate this key with a simple editor-plug-in
            , buttonWith (trans "Mlvc0CGpoEUsVSNml20dA") NoOp
            ]
        )
```

## Trans module

The translations web-component (again, could be anything!) just handles some keys passed down.

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

## Edit mode

To edit the user interface copy there could be an overlay application that attatches itself to every `x-trans` component and writes the edits to a database.


