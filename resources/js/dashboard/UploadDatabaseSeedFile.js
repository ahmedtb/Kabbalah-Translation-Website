import React from 'react'
import axios from 'axios';
import { logError } from '../commonFiles/helpers';



export default function UploadDatabaseSeedFile(props) {
    const [sqlFile, setsqlFile] = React.useState(null)


    async function submit() {
        try {
            const data = new FormData()

            if (sqlFile) {
                data.append('sqlFile', sqlFile)
            }

            const res = await axios.post('/dashboardAPI/uploadDatabaseSeedFile', data)
            console.log(res.data)
        } catch (error) {
            logError(error)
        }
    }


    return (
        <div className="card">
            <div className="card-header">sql file</div>

            <div className="card-body">
                <div className="row align-items-start justify-content-center">
                    <div className="col p-2 border rounded m-2 text-center">
                        <label className="">sql file</label>
                        <input className="form-control" onChange={(e) => {
                            // console.log(e.target.files[0])
                            setsqlFile(e.target.files[0])
                        }} type="file" accept=".sql" />

                    </div>

                    <div className="col-12 d-flex justify-content-center">
                        <button onClick={submit} type="button" className="btn btn-success">
                            seed
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
