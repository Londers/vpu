import React, {useEffect, useState} from "react";
import {
    DataGrid,
    GridColDef,
    GridEditCellValueParams,
    GridRowId,
    ruRU
} from '@material-ui/data-grid';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {useSelector} from "react-redux";
import PhoneToolbar from "./PhoneToolbar";
import wsImitation from "../WebSoscketImitation";

const theme = createMuiTheme(
    {
        palette: {
            primary: {main: '#1976d2'},
        },
    },
    ruRU,
)

// function* idMaker() {
//     let index = -1
//     while (true)
//         yield ++index
// }
//
// let generateID = idMaker()
// generateID.next().value

const columns: GridColDef[] = [
    {field: 'login', headerName: 'Логин', editable: true, flex: 1},
    {field: 'name', headerName: 'Оператор', editable: true, flex: 1.25},
    {field: 'areas', headerName: 'Районы', flex: 1.5},
    {field: 'dateDB', headerName: 'Время обновления БД', flex: 1.5},
    {field: 'ltime', headerName: 'Время последней операции', flex: 1.5},
    {field: 'laspOP', headerName: 'Последней операция', flex: 1},
    {field: 'connect', headerName: 'Статус', flex: 1},
    {field: 'nfaze', headerName: 'Текущая фаза', flex: 1.5},
    {field: 'cfaze', headerName: 'Запрошенная фаза', flex: 1.75},
]

function convertData(index: number, areasList: any, login: string, name: string, areasArr: string[], dateDB: string, ltime: string, laspOP: string,
                     device: string, connect: boolean | string, nfaze?: number, cfaze?: number,) {
    let areas = ''
    areasArr.forEach(area => {
        areas += areasList[area] + ', '
    })
    // areas.slice(-2, areas.length)
    connect = connect ? 'Подключён' : 'Отключён'
    dateDB = new Date(dateDB).toLocaleString()
    ltime = new Date(ltime).toLocaleString()
    return {id: index, login, name, areas, dateDB, ltime, laspOP, device, connect, nfaze, cfaze};
}

function PhoneTable() {
    const tableData = useSelector((state: { tables: { phonesTableData: { phones: any, areas: string[] } } }) =>
        state.tables.phonesTableData)
    console.log('phoneTable', tableData)

    const wsImitate = useSelector((state: { websocket: { ws: wsImitation } }) => state.websocket.ws)

    const areas = tableData.areas
    const getRowsInitialState = () => {
        return (tableData.phones === undefined) ? [] :
            tableData.phones.map((record: any, index: number) => {
                const status = record.status
                return convertData(index, areas, record.login, record.name, record.areas, status.dateDB, status.ltime, status.last_ops,
                    status.device, status.connect, status.nfaze, status.cfaze)
            })
    }
    const rowsInitialState = getRowsInitialState()

    // const [rows, setRows] = useState((tableData.phones === undefined) ? [] :
    //     tableData.phones.map((record: any, index: number) => {
    //         const status = record.status
    //         return convertData(index, areas, record.login, record.name, record.areas, status.dateDB, status.ltime, status.last_ops,
    //             status.device, status.connect, status.nfaze, status.cfaze)
    //     }))
    // const [rows, setRows] = useState(rowsInitialState)
    const [selectedLogin, setSelectedLogin] = useState<{ id: GridRowId, login: string }>({id: -1, login: ''})

    useEffect(() => {
        if (wsImitate === null) return
        wsImitate.send(JSON.stringify({type: 'phoneTable'}))
    }, [wsImitate])

    const onCellChange = (e: GridEditCellValueParams) => {
        console.log(e)
        // console.log(rows[e.id])
        console.log(tableData.phones[e.id])
        tableData.phones[e.id][e.field] = e.value
        wsImitate.send(JSON.stringify({type: 'updatePhone', data: tableData.phones[e.id]}))
    }

    const findLogin = (id: GridRowId) => {
        return rowsInitialState.find((row: { id: GridRowId | number }) => row.id === id).login
    }

    return (
        <React.Fragment>
            <PhoneToolbar selectedLogin={selectedLogin.login} areas={areas}/>
            <ThemeProvider theme={theme}>
                <div style={{height: 400, width: 1600}}>
                    <DataGrid rows={rowsInitialState} columns={columns} pageSize={10} checkboxSelection={false}
                              onRowClick={(row) => setSelectedLogin({id: row.id, login: findLogin(row.id)})}
                              onCellValueChange={(e) => onCellChange(e)}/>
                </div>
            </ThemeProvider>
        </React.Fragment>
    )
}

export default PhoneTable;