import React, {ChangeEvent, useState} from "react";
import './PhoneAddModal.sass'
import {Button, FormControl, InputLabel, Select, TextField} from "@material-ui/core";
import {useSelector} from "react-redux";
import wsImitation from "../WebSoscketImitation";

type Phone = {
    areas: number[],
    login: string,
    name: string,
    password: string,
    status: {
        cfaze: number,
        connect: boolean,
        dateDB: string,
        device: string,
        last_ops: string,
        ltime: string,
        nfaze: number
    }
}

function PhoneAddModal(props: { setModal: Function, areas: {} }) {
    const wsImitate = useSelector((state: { websocket: { ws: wsImitation } }) => state.websocket.ws)

    const [phone, setPhone] = useState({} as Phone)

    const handleSubmit = () => {
        console.log(phone)
        props.setModal(false)
        wsImitate.send(JSON.stringify({type: 'createPhone', data: phone}))
    }

    const handleClick = () => {
        props.setModal(false)
    }

    const handleLoginChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        phone.login = event.target.value
        setPhone(Object.assign({}, phone))
        if (event.target.value !== '') event.target.setCustomValidity('')
    }

    const handleNameChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        phone.name = event.target.value
        setPhone(Object.assign({}, phone))
        if (event.target.value !== '') event.target.setCustomValidity('')
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        phone.password = event.target.value
        setPhone(Object.assign({}, phone))
        if (event.target.value !== '') event.target.setCustomValidity('')
    }

    const handleAreasChange = (event: any) => {
        phone.areas = Array.from(event.target.selectedOptions).map((option: any) => Number(option.value))
        setPhone(Object.assign({}, phone))
        if (event.target.value !== '') event.target.setCustomValidity('')
    }

    const handleInvalid = (e: React.InvalidEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            if (e.target.tagName === 'SELECT') {
                e.target.setCustomValidity('Пожалуйста, выберите хотя бы один район.')
            } else {
                e.target.setCustomValidity('Пожалуйста, заполните поле.')
            }
        }
    }

    return (
        <div className="back">
            <span className="close" onClick={handleClick}>&times;</span>
            {/*<div className="inputsGroup">*/}
            <form className="inputsGroup" onSubmit={handleSubmit} autoComplete="off">
                <TextField label="Логин" id="login" variant="outlined" onChange={handleLoginChange}
                           onInvalid={handleInvalid} required={true}/>
                <TextField label="Имя" id="name" variant="outlined" onChange={handleNameChange}
                           onInvalid={handleInvalid} required={true}/>
                <TextField label="Пароль" id="password" type="password" onChange={handlePasswordChange}
                           onInvalid={handleInvalid} variant="outlined" required={true}/>
                <FormControl onInvalid={handleInvalid}>
                    {/*className={classes.formControl}>*/}
                    <InputLabel shrink htmlFor="select-multiple-native">
                        Районы
                    </InputLabel>
                    <Select
                        multiple
                        native
                        onChange={handleAreasChange}
                        inputProps={{
                            id: 'select-areas',
                            required: true,
                        }}
                    >
                        {
                            Object.entries(props.areas).map(([key, value]) =>
                                <option key={key} value={key}>
                                    {value as string}
                                </option>
                            )
                        }
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary">Создать</Button>
                {/*<input type="submit" value="Submit" />*/}
            </form>
            {/*</div>*/}
        </div>
    )
}

export default PhoneAddModal