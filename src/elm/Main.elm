port module Main exposing (..)

import Browser
import Element exposing (Element, column, html)
import Html exposing (Html)
import Html.Attributes
import UI exposing (..)


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ portReceive GotMessage
        ]



-- PORTS


port portSend : String -> Cmd msg


port portReceive : (String -> msg) -> Sub msg



-- Model


type alias Model =
    { counter : Int
    , messages : List String
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { counter = 0
      , messages = []
      }
    , Cmd.none
    )


type Msg
    = Increment
    | Decrement
    | SendMessage
    | GotMessage String
    | NoOp


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        Increment ->
            ( { model | counter = model.counter + 1 }, Cmd.none )

        Decrement ->
            ( { model | counter = model.counter - 1 }, Cmd.none )

        SendMessage ->
            ( model, portSend "Hello!" )

        GotMessage m ->
            ( { model | messages = m :: model.messages }, Cmd.none )



-- [README START]


trans : String -> Element msg
trans key =
    html
        (Html.node "x-trans"
            [ Html.Attributes.attribute "trans-key" key
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
            []
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
            ]
        )



-- [README END]
