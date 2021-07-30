import React from "react"
import {Button} from "@material-ui/core";
import {useSelector} from "react-redux";
import wsImitation from "../WebSoscketImitation";

function LogsToolbar(props: {selectedCrosses: string[]}) {

    const wsImitate = useSelector((state: { websocket: { ws: wsImitation } }) => state.websocket.ws)

    const handleClick = () => {
        wsImitate.send(JSON.stringify({type: 'getLogs', data: {keys: props.selectedCrosses}}))
    }

    return (
        <div className="log_buttons">
            <Button variant="contained" color="primary" onClick={handleClick}>Сутки</Button>
            {/*<Button variant="contained" color="primary">Создать</Button>*/}
        </div>
    )
}

export default LogsToolbar