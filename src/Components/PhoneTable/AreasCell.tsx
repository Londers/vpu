import React from "react";
import {FormControl, Input, MenuItem, Select} from "@material-ui/core";
import {useSelector} from "react-redux";
import {GridCellParams} from "@material-ui/data-grid";


// function AreasCell(props: {id: number, name: string, areasArr: string[], areasList: {}}) {
function AreasCell(props: {params: GridCellParams}) {
    // const id = props.params.id
    const login = props.params.row.login
    const name = props.params.row.name
    const areasArr = props.params.row.areasArr
    const areasList = props.params.row.areasList

    const ws = useSelector((state: {websocket: { ws: WebSocket }}) => state.websocket.ws)

    function handleChange(event: React.ChangeEvent<{ value: unknown }>) {
        ws.send(JSON.stringify({type: 'updatePhone', data: {login: login, name: name, areas: event.target.value}}))
    }

    if (areasArr === null) return <div>null</div>

    return (
        <FormControl>
            {/*<InputLabel id="demo-mutiple-name-label">Name</InputLabel>*/}
            <Select
                multiple
                value={areasArr}
                onChange={handleChange}
                input={<Input />}
                // MenuProps={MenuProps}
            >
                {Object.entries(areasList).map((entry: [string, unknown]) => (
                    <MenuItem key={Number(entry[0])} value={Number(entry[0])} selected={areasArr.includes(entry[0] as string)}>
                        {entry[1] as string}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default AreasCell;

