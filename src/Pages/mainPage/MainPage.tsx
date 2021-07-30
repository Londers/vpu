import React from "react"
import AuthorizationDialog from "../../Components/AuthorizationDialog/AuthorizationDialog"
import './MainPage.sass'
import {useSelector} from "react-redux"
import PhoneTable from "../../Components/PhoneTable/PhoneTable"

function MainPage() {

    const logged = useSelector((state: { auth: { logged: boolean } }) => state.auth.logged)

    return (
        <div id="main">
            {(() => {
                if (logged) {
                    return <PhoneTable/>
                } else {
                    return <AuthorizationDialog/>
                }
            })()}
        </div>
    )
}

export default MainPage