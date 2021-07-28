import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import wsImitation from "../WebSoscketImitation";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {DataGrid, GridColDef, GridEditCellValueParams, GridRowId, ruRU} from "@material-ui/data-grid";
import AccountsToolbar from "./AccountsToolbar";

const theme = createMuiTheme(
    {
        palette: {
            primary: {main: '#1976d2'},
        },
    },
    ruRU,
)

const columns: GridColDef[] = [
    {field: 'login', headerName: 'Логин', editable: true, flex: 1},
    {field: 'description', headerName: 'Описание', editable: true, flex: 1.5},
    {field: 'workTime', headerName: 'Рабочее время', editable: true, flex: 1},
    {field: 'region', headerName: 'Регион', flex: 1.5},
    {field: 'areas', headerName: 'Районы', flex: 1.5},
    {field: 'privileges', headerName: 'Права', flex: 1.5},
]

function convertData(index: number, login: string, description: string, workTime: number, region: string, areasArr: string[],
                     areasList: any, privileges: string) {
    let areas = ''
    if (areasArr.indexOf('*') !== -1) {
        areas = Object.values(areasList).join(', ')
    } else {
        areasArr.forEach(area => {
            areas += areasList[area] + ', '
        })
    }

    return {id: index, login, description, workTime, region, areas, privileges}
}

function AccountsTable() {
    const tableData = useSelector((state: { tables: { accountsTableData: { accounts: any, areas: string[],
                privileges: string[] } } }) => state.tables.accountsTableData)

    const wsImitate = useSelector((state: { websocket: { ws: wsImitation } }) => state.websocket.ws)

    const areas = tableData.areas
    const getRowsInitialState = () => {
        return (tableData.accounts === undefined) ? [] :
            tableData.accounts.map((record: any, index: number) => {
                const privilege = record.privilege
                return convertData(index, record.login, record.description, record.workTime, privilege.region,
                    privilege.area, areas, privilege.role.name)
            })
    }

    const rowsInitialState = getRowsInitialState()
    const [selectedLogin, setSelectedLogin] = useState<{ id: GridRowId, login: string }>({id: -1, login: ''})

    useEffect(() => {
        if (wsImitate === null) return
        wsImitate.send(JSON.stringify({type: 'getAccounts'}))
    }, [wsImitate])

    const onCellChange = (e: GridEditCellValueParams) => {
        tableData.accounts[e.id][e.field] = e.value
        wsImitate.send(JSON.stringify({type: 'updateAccount', data: tableData.accounts[e.id]}))
    }

    const findLogin = (id: GridRowId) => {
        return rowsInitialState.find((row: { id: GridRowId | number }) => row.id === id).login
    }

    return (
        <React.Fragment>
            <AccountsToolbar selectedLogin={selectedLogin.login} areas={areas} privileges={tableData.privileges}/>
            <ThemeProvider theme={theme}>
                <div style={{height: 400, width: window.innerWidth}}>
                    <DataGrid rows={rowsInitialState}
                              columns={columns}
                              pageSize={10}
                              checkboxSelection={false}
                              onRowClick={(row) => setSelectedLogin({id: row.id, login: findLogin(row.id)})}
                              onCellValueChange={(e) => onCellChange(e)}
                    />
                </div>
            </ThemeProvider>
        </React.Fragment>
    )
}

export default AccountsTable