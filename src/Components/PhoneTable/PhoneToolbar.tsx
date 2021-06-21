import React from "react";
import {Button} from "@material-ui/core";
import {GridRowId} from "@material-ui/data-grid";
import {useSelector} from "react-redux";

function PhoneToolbar(props: {selectedLogin: GridRowId}) {

    const ws = useSelector((state: {websocket: { ws: WebSocket }}) => state.websocket.ws)

    const handleAdd = () => {}
    const handleDelete = () => {
        ws.send(JSON.stringify({type: 'phonesDelete', data: {login: props.selectedLogin}}))
    }

    return (
        <React.Fragment>
            <Button variant="contained" color="primary" onClick={handleAdd}>
                Добавить
            </Button>
            <Button variant="contained" color="primary" onClick={handleDelete}>
                Удалить
            </Button>
        </React.Fragment>
    )
}

export default PhoneToolbar