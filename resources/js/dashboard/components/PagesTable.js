import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { HeaderComponentClass, ImageComponentClass, LinkComponentClass, ParagraphComponentClass, TitleComponentClass } from '../PageComponents/structure'
import {Routes} from '../utility/URLs'

function ContentPageStatistics(props) {
    const page_content = props.page_content
    const [paragraphsCount, setparagraphsCount] = React.useState(null)
    const [linksCount, setlinksCount] = React.useState(null)
    const [headersCount, setheadersCount] = React.useState(null)
    const [titlesCount, settitlesCount] = React.useState(null)
    const [imagesCount, setimagesCount] = React.useState(null)

    React.useEffect(() => {
        let paragraphsCount = 0
        let linksCount = 0
        let headersCount = 0
        let titlesCount = 0
        let imagesCount = 0

        page_content.pageComponents.forEach(element => {
            if (element.class == ParagraphComponentClass)
                paragraphsCount++
            else if (element.class == TitleComponentClass)
                titlesCount++
            else if (element.class == LinkComponentClass)
                linksCount++
            else if (element.class == HeaderComponentClass)
                headersCount++
            else if (element.class == ImageComponentClass)
                imagesCount++
        });
        setparagraphsCount(paragraphsCount)
        setlinksCount(linksCount)
        setheadersCount(headersCount)
        settitlesCount(titlesCount)
        setimagesCount(imagesCount)

    }, [])

    return (
        <div>
            <div>عدد الفقرات: {paragraphsCount}</div>
            <div>عدد الروابط: {linksCount}</div>
            <div>عدد العناوين: {headersCount}</div>
            <div>عدد العناوين الصفحات: {titlesCount}</div>
            <div>عدد الصورة: {imagesCount}</div>

        </div>
    )
}

export default function PagesTable(props) {
    const pages = props.pages
    const deletePage = props.deletePage
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>العنوان</th>
                    {/* <th>محتوى الصفحة</th> */}
                    <th>مفعل؟</th>
                    <th></th>

                </tr>
            </thead>
            <tbody>
                {
                    pages?.map((page, index) => (
                        <tr key={index}>
                            <td>
                                <Link to={Routes.pageShow(page.id)}>
                                    {page.id}
                                </Link>
                            </td>
                            <td>{page.title}</td>
                            {/* <td><ContentPageStatistics page_content={page.page_content} /></td> */}
                            <td>{page.activated == 1 ? 'نعم' : 'لا'}</td>
                            <td onClick={() => deletePage(page.id)}>حدف</td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}