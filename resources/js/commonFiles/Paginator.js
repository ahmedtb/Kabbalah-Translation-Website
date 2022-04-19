import React from 'react'
import { Pagination } from 'react-bootstrap'
import { ApiCallHandler } from './helpers'
import { trackPromise } from "react-promise-tracker";
import LoadingIndicator from './LoadingIndicator';

export default function Paginator(props) {
    const apiCall = props.apiCall
    const update = props.update
    const log = props.log
    const includeURLSearchParams = props.includeURLSearchParams

    const [data, setdata] = props.useState

    function fetchData(link = null, params = null) {
        let linkParams = Object.fromEntries(new URLSearchParams(link?.split('?')[1]))
        let allParams = { ...linkParams, ...params }
        // console.log('Paginator fetchData', link)
        trackPromise(
            ApiCallHandler(
                async () => { setdata([]); return await apiCall(allParams) },
                (data) => { setdata(data); },
                log ?? 'Paginator fetchData',
                log ?? false
            )
        )

    }

    React.useEffect(() => {
        var params = includeURLSearchParams ? Object.fromEntries(new URLSearchParams(location.search)) : {};
        fetchData(null, params)
    }, [update])

    return (
        <Pagination>
            <LoadingIndicator />

            {
                // if only one page don't show links
                data?.links?.length != 3 ?
                    data?.links?.map((link, index) => {
                        if (link['url'] && index == 0) {
                            return <Pagination.Prev key={index} onClick={() => fetchData(link['url'])}>السابق</Pagination.Prev>
                        }
                        if (link['url'] && index == data?.links.length - 1) {
                            return <Pagination.Next key={index} onClick={() => fetchData(link['url'])}>التالي</Pagination.Next>
                        }
                        if (link['url'] && index && index != data?.links.length - 1)
                            return <Pagination.Item active={link.active} key={index} onClick={() => fetchData(link['url'])}>{link['label']}</Pagination.Item>
                    }) : null
            }
        </Pagination>
    )
}