import React from "react";
// import {makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {DataGrid, GridColDef} from '@material-ui/data-grid';

// const useStyles = makeStyles({
//     table: {
//         minWidth: 650,
//     },
// });

function* idMaker() {
    let index = 0;
    while (true)
        yield index++;
}

let generateID = idMaker();

const columns: GridColDef[] = [
    {field: 'login', headerName: 'Логин', width: 150},
    {field: 'name', headerName: 'Оператор', width: 150},
    {field: 'areas', headerName: 'Районы', width: 150},
    {field: 'dateDB', headerName: 'Запуск БД', width: 250},
    {field: 'ltime', headerName: 'Запуск устройства', width: 250},
    {field: 'laspOP', headerName: 'Последняя операция', width: 150},
    {field: 'connect', headerName: 'Статус', width: 150},
    {field: 'nfaze', headerName: 'н фаза', width: 150},
    {field: 'cfaze', headerName: 'с фаза', width: 150},
];

// const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

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
        <div style={{height: 400, width: 1600}}>
            <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection/>
        </div>
        // <TableContainer component={Paper}>
        //     <Table className={classes.table} aria-label="simple table">
        //         <TableHead>
        //             <TableRow>
        //                 <TableCell align="center">login</TableCell>
        //                 <TableCell align="center">name</TableCell>
        //                 <TableCell align="center">areas</TableCell>
        //                 <TableCell align="center">dateDB</TableCell>
        //                 <TableCell align="center">ltime</TableCell>
        //                 <TableCell align="center">lastOP</TableCell>
        //                 <TableCell align="center">device</TableCell>
        //                 <TableCell align="center">connect</TableCell>
        //                 <TableCell align="center">nfaze</TableCell>
        //                 <TableCell align="center">cfaze</TableCell>
        //             </TableRow>
        //         </TableHead>
        //         <TableBody>
        //             {rows.map((row) => (
        //                 <TableRow key={row.login}>
        //                     <TableCell component="th" scope="row" align="center">
        //                         {row.login}
        //                     </TableCell>
        //                     <TableCell align="center">{row.name}</TableCell>
        //                     <TableCell align="center">{row.areas.join(', ')}</TableCell>
        //                     <TableCell align="center">{new Date(row.dateDB).toLocaleString()}</TableCell>
        //                     <TableCell align="center">{new Date(row.ltime).toLocaleString()}</TableCell>
        //                     <TableCell align="center">{row.laspOP}</TableCell>
        //                     <TableCell align="center">{row.device}</TableCell>
        //                     <TableCell align="center">{row.connect ? 'Подключён' : 'Отключён'}</TableCell>
        //                     <TableCell align="center">{row.nfaze}</TableCell>
        //                     <TableCell align="center">{row.cfaze}</TableCell>
        //                 </TableRow>
        //             ))}
        //         </TableBody>
        //     </Table>
        // </TableContainer>
    )
}

export default DeviceTable;