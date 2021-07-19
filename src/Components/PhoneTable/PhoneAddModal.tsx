import React, {ChangeEvent, FormEvent, useState} from "react";
import './PhoneAddModal.sass'
import {Button, FormControl, InputLabel, Select, TextField} from "@material-ui/core";
import {useSelector} from "react-redux";
import wsImitation from "../WebSoscketImitation";

function PhoneAddModal(props: { setModal: Function, areas: {} }) {
    const wsImitate = useSelector((state: { websocket: { ws: wsImitation } }) => state.websocket.ws)

    const [phone, setPhone] = useState({
        areas: [] as string[], login: '', name: '', password: '',
        status: {
            cfaze: 0,
            connect: false,
            dateDB: "2021-06-15T14:58:40.8717014+06:00",
            device: "1:48",
            last_ops: "Загрузка БД",
            ltime: "2021-05-31T14:00:20.4008958+06:00",
            nfaze: 0
        }
    })

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
        phone.areas = Array.from(event.target.selectedOptions).map((option: any) => option.value)
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