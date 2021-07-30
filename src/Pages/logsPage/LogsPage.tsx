import React, {useState} from "react";
import LogsToolbar from "../../Components/LogsTables/LogsToolbar";
import CrossListTable from "../../Components/LogsTables/CrossListTable";
import LogsTable from "../../Components/LogsTables/LogsTable";
import './LogsPage.sass';

function LogsPage() {

    const [selectedCrosses, setSelectedCrosses] = useState([] as string[])

    return (
        <React.Fragment>
            <LogsToolbar selectedCrosses={selectedCrosses}/>
            <div className="log_tables">
                <CrossListTable setSelectedCrosses={setSelectedCrosses}/>
                <LogsTable/>
            </div>
        </React.Fragment>
    )
}

export default LogsPage