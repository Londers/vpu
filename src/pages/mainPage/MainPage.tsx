import React from "react"
import AuthorizationDialog from "./AuthorizationDialog";
import './MainPage.sass'

function MainPage(props: {
    setLogged: Function
}) {
    return (
        <div id="main">
            <AuthorizationDialog setLogged={props.setLogged}/>
        </div>
    )
}

export default MainPage