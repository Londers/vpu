import React, {useEffect} from "react"
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {DataGrid, GridColDef, GridEditCellValueParams, ruRU} from "@material-ui/data-grid";
import {useSelector} from "react-redux";
import wsImitation from "../WebSoscketImitation";

const theme = createMuiTheme(
    {
        palette: {
            primary: {main: '#1976d2'},
        },
    },
    ruRU,
)

const columns: GridColDef[] = [
    {field: 'area', headerName: 'Район', flex: 1},
    {field: 'crossId', headerName: 'ID', flex: 0.75},
    {field: 'idevice', headerName: '№ модема', flex: 1.2},
    {field: 'name', headerName: 'Место размещения', flex: 4},
    {field: 'host', headerName: 'Хост', editable: true, flex: 1.1},
    {field: 'port', headerName: 'Порт', editable: true, flex: 0.9},
    {field: 'ssid', headerName: 'Wi-Fi', editable: true, flex: 1},
    {field: 'passid', headerName: 'Пароль для Wi-Fi', editable: true, flex: 1.75},
    {field: 'login', headerName: 'Логин', editable: true, flex: 1},
    {field: 'password', headerName: 'Пароль', editable: true, flex: 1.25},
    {field: 'fazes', headerName: 'Фазы', flex: 1.5},
]

function convertData(index: number, area: number, crossId: number, idevice: number, name: string, host: string,
                     port: number, ssid: string, passid: string, login: string, password: string, fazes: number[]) {
    return {id: index, area, crossId, idevice, name, host, port, ssid, passid, login, password, fazes}
}

function CrossesPage() {
    const tableData = useSelector((state: { tables: { crossesTableData: { crosses: any } } }) =>
        state.tables.crossesTableData)

    const wsImitate = useSelector((state: { websocket: { ws: wsImitation } }) => state.websocket.ws)

    const getRowsInitialState = () => {
        return (tableData.crosses === undefined) ? [] :
            tableData.crosses.map((record: any, index: number) => {
                return convertData(index, record.area, record.id, record.idevice, record.name, record.host, record.port,
                    record.ssid, record.passid, record.login, record.password, record.fazes)
            })
    }
    const rowsInitialState = getRowsInitialState()

    useEffect(() => {
        if (wsImitate === null) return
        wsImitate.send(JSON.stringify({type: 'getCrosses'}))
    }, [wsImitate])

    const onCellChange = (e: GridEditCellValueParams) => {
        // console.log(e)
        // console.log(rows[e.id])
        // console.log(tableData.phones[e.id])
        tableData.crosses[e.id][e.field] = e.value
        wsImitate.send(JSON.stringify({type: 'updateCross', data: tableData.crosses[e.id]}))
    }

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <div style={{height: 400, width: window.innerWidth}}>
                    <DataGrid rows={rowsInitialState}
                              columns={columns}
                              pageSize={10}
                              checkboxSelection={false}
                              onCellValueChange={(e) => onCellChange(e)}/>
                </div>
            </ThemeProvider>
        </React.Fragment>
    )
}

export default CrossesPage