import React, {useState} from "react";
import {Button, Modal} from "@material-ui/core";
import {useSelector} from "react-redux";
import websocketImitation from "../WebSoscketImitation";
import PhoneAddModal from "./PhoneAddModal";
// import PhoneTable from "./PhoneTable";
// import AuthorizationDialog from "../AuthorizationDialog/AuthorizationDialog";

function PhoneToolbar(props: { selectedLogin: string, areas: {}}) {

    // const ws = useSelector((state: {websocket: { ws: WebSocket }}) => state.websocket.ws)
    const wsImitation = useSelector((state: { websocket: { ws: websocketImitation } }) => state.websocket.ws)
    const [openAddModal, setOpenAddModal] = useState(false)

    const handleAdd = () => {
        setOpenAddModal(true)
    }
    const handleDelete = () => {
        wsImitation.send(JSON.stringify({type: 'removePhone', data: {login: props.selectedLogin}}))
    }

    return (
        <div style={{display: 'inline-block', marginRight: 'auto', marginTop: '2%'}}>
            <Button variant="contained" color="primary" onClick={handleAdd}>
                Добавить
            </Button>
            <Button variant="contained" color="primary" onClick={handleDelete}>
                Удалить
            </Button>
            <Modal open={openAddModal}
                   onBackdropClick={() => setOpenAddModal(false)}>
                <PhoneAddModal setModal={setOpenAddModal} areas={props.areas}/>
            </Modal>
        </div>
    )
}

export default PhoneToolbar