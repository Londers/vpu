import React, {useState} from "react";
import {Button, Modal} from "@material-ui/core";
import websocketImitation from "../WebSoscketImitation";
import {useSelector} from "react-redux";
import AccountAddModal from "./AccountAddModal";

function AccountsToolbar(props: {selectedLogin: string, areas: string[], privileges: string[]}) {

    const wsImitation = useSelector((state: { websocket: { ws: websocketImitation } }) => state.websocket.ws)
    const [openAddModal, setOpenAddModal] = useState(false)

    const handleAdd = () => {
        setOpenAddModal(true)
    }

    const handleDelete = () => {
        wsImitation.send(JSON.stringify({type: 'removeAccount', data: {login: props.selectedLogin}}))
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
                <AccountAddModal setModal={setOpenAddModal} areas={props.areas} privileges={props.privileges}/>
            </Modal>
        </div>
    )
}

export default AccountsToolbar