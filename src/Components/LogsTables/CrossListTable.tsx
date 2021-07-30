import React, {useEffect} from "react"
import {useSelector} from "react-redux";
import wsImitation from "../WebSoscketImitation";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {DataGrid, GridColDef, GridSelectionModelChangeParams, ruRU} from "@material-ui/data-grid";

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
]

function convertData(index: number, area: number, crossId: number, idevice: number, name: string) {
    return {id: index, area, crossId, idevice, name}
}

function CrossListTable(props: { setSelectedCrosses: React.Dispatch<React.SetStateAction<string[]>> }) {
    const tableData = useSelector((state: { tables: { crossesTableData: { crosses: any } } }) =>
        state.tables.crossesTableData)

    const wsImitate = useSelector((state: { websocket: { ws: wsImitation } }) => state.websocket.ws)

    const getRowsInitialState = () => {
        return (tableData.crosses === undefined) ? [] :
            tableData.crosses.map((record: any, index: number) => {
                return convertData(index, record.area, record.id, record.idevice, record.name)
            })
    }
    const rowsInitialState = getRowsInitialState()

    useEffect(() => {
        if (wsImitate === null) return
        wsImitate.send(JSON.stringify({type: 'getCrosses'}))
    }, [wsImitate])

    const handleSelectionModelChange = (selected: GridSelectionModelChangeParams) => {
        const selectedCrosses = selected.selectionModel.map(selection => tableData.crosses[selection].area + ':'
            + tableData.crosses[selection].id)
        props.setSelectedCrosses(selectedCrosses)
    }

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <div style={{height: 400, width: window.innerWidth * 0.5}}>
                    <DataGrid rows={rowsInitialState}
                              columns={columns}
                              pageSize={15}
                              checkboxSelection={true}
                              onSelectionModelChange={handleSelectionModelChange}/>
                </div>
            </ThemeProvider>
        </React.Fragment>
    )
}

export default CrossListTable