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
            [ buttonWith (trans "HTuFzfsQpom58JYmLZeWo") NoOp
            , buttonWith (trans "Mlvc0CGpoEUsVSNml20dA") NoOp
            ]
        )
