import React from 'react'
import PagesTable from '../components/PagesTable'
import ApiEndpoints from '../utility/ApiEndpoints'
import { ApiCallHandler } from '../utility/helpers'
export default function PagesIndex(props) {
    const [pages, setpages] = React.useState([])
    async function setup() {
        ApiCallHandler(async () => await ApiEndpoints.fetchPages(),
            setpages,
            'PagesIndex setup',
            true
        )
    }
    React.useEffect(() => {
        setup()
    }, [])

    function deletePage(id) {
        ApiCallHandler(async () => await ApiEndpoints.deletePage(id),
            setup,
            'PagesIndex deletePage',
            true
        )
    }
    return (
        <div>
            <PagesTable pages={pages} deletePage={deletePage} />
        </div>
    )
}