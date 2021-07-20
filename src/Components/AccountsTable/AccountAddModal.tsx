import React, {ChangeEvent, useState} from "react";
import './AccountAddModal.sass'
import {Button, FormControl, InputLabel, Select, TextField} from "@material-ui/core";
import {useSelector} from "react-redux";
import wsImitation from "../WebSoscketImitation";

function AccountAddModal(props: { setModal: Function, areas: {}, privileges: string[] }) {
    const wsImitate = useSelector((state: { websocket: { ws: wsImitation } }) => state.websocket.ws)

    const [account, setAccount] = useState({
        login: '',
        description: '',
        password: '',
        workTime: 0,
        privilege: {
            area: [] as string[],
            role: {
                name: '',
                permissions: null,
            },
            region: '',
        },
    })

    const handleSubmit = () => {
        console.log(account)
        props.setModal(false)
        wsImitate.send(JSON.stringify({type: 'createAccount', data: account}))
    }

    const handleClick = () => {
        props.setModal(false)
    }

    const handleLoginChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        account.login = event.target.value
        setAccount(Object.assign({}, account))
        if (event.target.value !== '') event.target.setCustomValidity('')
    }

    const handleDescChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        account.description = event.target.value
        setAccount(Object.assign({}, account))
        if (event.target.value !== '') event.target.setCustomValidity('')
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        account.password = event.target.value
        setAccount(Object.assign({}, account))
        if (event.target.value !== '') event.target.setCustomValidity('')
    }

    const handleAreasChange = (event: any) => {
        account.privilege.area = Array.from(event.target.selectedOptions).map((option: any) => option.value)
        setAccount(Object.assign({}, account))
        if (event.target.value !== '') event.target.setCustomValidity('')
    }

    const handlePrivilegeChange = (event: any) => {
        account.privilege.role.name = event.target.value
        setAccount(Object.assign({}, account))
        // if (event.target.value !== '') event.target.setCustomValidity('')
    }

    const handleWorkTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
        account.workTime = event.target.valueAsNumber
        setAccount(Object.assign({}, account))
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
                <TextField label="Описание" id="description" variant="outlined" onChange={handleDescChange}
                           onInvalid={handleInvalid} required={true}/>
                <TextField label="Пароль" id="password" type="password" onChange={handlePasswordChange}
                           onInvalid={handleInvalid} variant="outlined" required={true}/>
                <TextField label="Время работы" id="workTime" type="number" onChange={handleWorkTimeChange}
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
                <FormControl onInvalid={handleInvalid}>
                    {/*className={classes.formControl}>*/}
                    <InputLabel shrink htmlFor="select-multiple-native">
                        Роль ползователя
                    </InputLabel>
                    <Select
                        onChange={handlePrivilegeChange}
                        inputProps={{
                            id: 'select-privileges',
                            required: true,
                        }}
                        defaultValue={props.privileges[0]}
                    >
                        {
                            props.privileges.map((privilege, index) =>
                                <option key={index} value={privilege}>
                                    {privilege}
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

export default AccountAddModal