import React from "react"
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {DataGrid, GridColDef, ruRU} from "@material-ui/data-grid";
import {useSelector} from "react-redux";

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
    {field: 'tm', headerName: 'TM', flex: 1},
    {field: 'login', headerName: 'Логин', flex: 1},
    {field: 'txt', headerName: 'Событие', flex: 1},
]

function convertData(index: number, key: string, tm: string, login: string, txt: string) {
    const [area, crossId] = key.split(':')
    return {id: index, area, crossId, tm, login, txt}
}

function LogsTable() {
    const tableData = useSelector((state: { tables: { logsTableData: { logs: any } } }) =>
        state.tables.logsTableData)

    const getRowsInitialState = () => {
        return (tableData.logs === undefined) ? [] :
            tableData.logs.map((record: any, index: number) => {
                return convertData(index, record.key, record.tm, record.login, record.txt)
            })
    }
    const rowsInitialState = getRowsInitialState()

    console.log(tableData)

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <div style={{height: 400, width: window.innerWidth}}>
                    <DataGrid rows={rowsInitialState}
                              columns={columns}
                              pageSize={15}
                              checkboxSelection={false}/>
                </div>
            </ThemeProvider>
        </React.Fragment>)
}

export default LogsTable