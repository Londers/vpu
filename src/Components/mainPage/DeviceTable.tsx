import React from "react";
import {DataGrid, GridColDef, ruRU} from '@material-ui/data-grid';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

const theme = createMuiTheme(
    {
        palette: {
            primary: {main: '#1976d2'},
        },
    },
    ruRU,
);

function* idMaker() {
    let index = 0;
    while (true)
        yield index++;
}

let generateID = idMaker();

const columns: GridColDef[] = [
    {field: 'login', headerName: 'Логин', editable: true, width: 150},
    {field: 'name', headerName: 'Оператор', editable: true, width: 150},
    {field: 'areas', headerName: 'Районы', width: 150},
    {field: 'dateDB', headerName: 'Время обновления базы данных', width: 300},
    {field: 'ltime', headerName: 'Время последней операции', width: 300},
    {field: 'laspOP', headerName: 'Последней операция', width: 250},
    {field: 'connect', headerName: 'Статус', width: 200},
    {field: 'nfaze', headerName: 'Текущая фаза', width: 200},
    {field: 'cfaze', headerName: 'Запрошенная фаза', width: 200},
];

function createData(login: string, name: string, areas: string, dateDB: string, ltime: string, laspOP: string,
                    device: string, connect: boolean | string, nfaze?: number, cfaze?: number) {
    connect = connect ? 'Подключён' : 'Отключён'
    dateDB = new Date(dateDB).toLocaleString()
    ltime = new Date(ltime).toLocaleString()
    return {id: generateID.next().value, login, name, areas, dateDB, ltime, laspOP, device, connect, nfaze, cfaze};
}

const rows = [
    createData('rura', 'Пупкин', ['Первая', 'Вторая'].join(', '), '2021-05-21T11:49:31.41061099+06:00',
        '2021-05-21T11:49:32.999856791+06:00', 'Отмена РУ на 1:2', '1:2', false),
    createData('admin', 'Петров', ['Первая', 'Вторая'].join(', '), '2021-05-21T11:49:31.41061099+06:00',
        '2021-05-21T11:49:32.999856791+06:00', 'Отмена РУ на 1:2', '1:2', false),
    createData('moscow', 'Баширов', ['Первая', 'Вторая'].join(', '), '2021-05-21T11:49:31.41061099+06:00',
        '2021-05-21T11:49:32.999856791+06:00', 'Отмена РУ на 1:2', '1:2', true, 1, 2),
]

function DeviceTable() {
    // const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <div style={{height: 400, width: 1800}}>
                <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection={false}
                          onCellValueChange={(e) => console.log(e)}/>
            </div>
        </ThemeProvider>
    )
}

export default DeviceTable;