import React from 'react'
import PagesTable from '../components/PagesTable'
import ApiEndpoints from '../utility/ApiEndpoints'
export default function PagesIndex(props) {
    const [pages, setpages] = React.useState([])
    async function setup() {
        ApiEndpoints.fetchPages(setpages)
        // get(ApiEndpoints.fetchPages, null, 'PagesIndex', setpages)
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