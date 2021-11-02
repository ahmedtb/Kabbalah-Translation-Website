import { setPublicPath } from "laravel-mix";
import React from "react";
import ApiEndpoints from "../utility/ApiEndpoints";
import { get } from "../utility/AxiosCalls";

export default function PageShow(props) {
    const id = props.route.params.id
    const [page, setpage] = React.useState(null)
    async function setup() {
        ApiEndpoints.fetchPage(id, 'PageShow', setpage)
        // get(ApiEndpoints.fetchPage.replace(':id', id), null, 'PageShow', setpage)
    }
    React.useEffect(() => {
        setup()
    }, [])
    return <div>

    </div>
}