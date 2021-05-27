import React from "react"
import AuthorizationDialog from "./AuthorizationDialog";
import './MainPage.sass'
import {useSelector} from "react-redux";
import DeviceTable from "./DeviceTable";

function MainPage() {

    const logged = useSelector((state: { auth: { logged: boolean } }) => state.auth.logged)

    return (
        <div id="main">
            {(() => {
                if (logged) {
                    return <DeviceTable/>
                } else {
                    return <AuthorizationDialog/>
                }
            })()}
        </div>
    )
}

export default MainPage