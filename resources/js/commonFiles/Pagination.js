import React from 'react'
import { Pagination } from 'react-bootstrap'

export default function Pagination1(props) {
    const fetchPage = props.fetchPage
    const links = props.links
    // console.log('links',links)
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