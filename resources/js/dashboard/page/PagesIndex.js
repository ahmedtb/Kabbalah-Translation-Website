import React from 'react'
import PagesTable from '../components/PagesTable'
import { get } from '../utility/AxiosCalls'
import ApiEndpoints from '../utility/ApiEndpoints'
export default function PagesIndex(props) {
    const [pages, setpages] = React.useState([])
    async function setup() {
        get(ApiEndpoints.fetchPages, null, 'PagesIndex', setpages)
    }
    React.useEffect(() => {
        setup()
    }, [])

    return (
        <div>
            <PagesTable pages={pages}/>
        </div>
    )
}