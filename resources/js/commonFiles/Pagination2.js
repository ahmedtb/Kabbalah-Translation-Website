import React from 'react'
import { Pagination } from 'react-bootstrap'
import { ApiCallHandler } from './helpers'
import { useHistory } from "react-router-dom"

export default function Pagination2(props) {
    const apiCall = props.apiCall
    const [data, setdata] = props.useState
    // console.log('links',links)
    const history = useHistory()


    const [links, setlinks] = React.useState([])

    function fetchPage(link = null, params = null) {
        let linkParams = Object.fromEntries(new URLSearchParams(link?.split('?')[1]))
        let allParams = { ...linkParams, ...params }
        ApiCallHandler(
            async () => await apiCall(allParams),
            (data) => { setdata(data.data); setlinks(data.links ?? []); },
            'Pagination2 fetchPage',
            true
        )
        console.log('all params', allParams)
        history.replace({
            pathname: window.location.pathname,
            search: (new URLSearchParams(allParams)).toString()
        })
    }

    React.useEffect(() => {
        var params = Object.fromEntries(new URLSearchParams(location.search));
        fetchPage(null, params)
    }, [])

    return (
            <Pagination>
                {
                    // if only one page don't show links
                    links?.length != 3 ?
                        links?.map((link, index) => {
                            if (link['url'] && index == 0) {
                                return <Pagination.Prev key={index} onClick={() => fetchPage(link['url'])}>السابق</Pagination.Prev>
                            }
                            if (link['url'] && index == links.length - 1) {
                                return <Pagination.Next key={index} onClick={() => fetchPage(link['url'])}>التالي</Pagination.Next>
                            }
                            if (link['url'] && index && index != links.length - 1)
                                return <Pagination.Item active={link.active} key={index} onClick={() => fetchPage(link['url'])}>{link['label']}</Pagination.Item>
                        }) : null
                }
            </Pagination>
    )
}