import React, {useState} from "react";
import {DataGrid, GridColDef, GridRowId, ruRU} from '@material-ui/data-grid';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {useSelector} from "react-redux";
import PhoneToolbar from "./PhoneToolbar";

const theme = createMuiTheme(
    {
        palette: {
            primary: {main: '#1976d2'},
        },
    },
    ruRU,
)

function* idMaker() {
    let index = -1
    while (true)
        yield index++
}

let generateID = idMaker()

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
];

function convertData(areasList: any, login: string, name: string, areasArr: string[], dateDB: string, ltime: string, laspOP: string,
                     device: string, connect: boolean | string, nfaze?: number, cfaze?: number,) {
    let areas = ''
    areasArr.forEach(area => {
        areas += areasList[area] + ', '
    })
    // areas.slice(-2, areas.length)
    connect = connect ? 'Подключён' : 'Отключён'
    dateDB = new Date(dateDB).toLocaleString()
    ltime = new Date(ltime).toLocaleString()
    return {id: generateID.next().value, login, name, areas, dateDB, ltime, laspOP, device, connect, nfaze, cfaze};
}

function PhoneTable() {
    const tableData = useSelector((state: { tables: { phoneTableData: { phones: any, areas: any } } }) =>
        state.tables.phoneTableData)

    const areas = tableData.areas
    const getRowsInitialState = () => {
        return (tableData.phones === undefined) ? [] :
            tableData.phones.map((record: any) => {
                const status = record.status
                return convertData(areas, record.login, record.name, record.areas, status.dateDB, status.ltime, status.last_ops,
                    status.device, status.connect, status.nfaze, status.cfaze)
            })
    }
    const rowsInitialState = getRowsInitialState()

    const [rows, setRows] = useState(rowsInitialState)
    const [selectedLogin, setSelectedLogin] = useState<GridRowId>(-1)

    // const handleDelete = (rowId: number) => {
    //     setRows(rows.filter((row: { id: number }) => row.id !== rowId))
    // }

    return (
        <React.Fragment>
            <PhoneToolbar selectedLogin={selectedLogin}/>
            <ThemeProvider theme={theme}>
                <div style={{height: 400, width: 1600}}>
                    <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection={false}
                              onRowClick={(row) => setSelectedLogin(row.id)}
                              onCellValueChange={(e) => console.log(e)}/>
                </div>
            </ThemeProvider>
        </React.Fragment>

    )
}

export default PhoneTable;