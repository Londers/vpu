import React from "react"
import AuthorizationDialog from "./AuthorizationDialog";
import './MainPage.sass'
import {useSelector} from "react-redux";
import DeviceTable from "./DeviceTable";

function MainPage() {

    const logged = useSelector((state: { logged: boolean }) => state.logged)
    // const login = useSelector((state: { login: string }) => state.login)

    return (
        <div id="main">
            {(() => {
                if (logged) {
                    return (
                        // <React.Fragment>
                        //     <text>Вы зашли как {login}</text>
                        // </React.Fragment>
                        <DeviceTable />
                    )
                } else {
                    return <AuthorizationDialog/>
                }
            })()}
        </div>
    )
}

export default MainPage