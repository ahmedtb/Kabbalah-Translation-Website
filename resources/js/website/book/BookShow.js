import React from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Col, ListGroup } from 'react-bootstrap'
import { Routes, Api, ApiCallHandler } from '../utility/Urls'
import { Helmet } from 'react-helmet'
import LoadingIndicator from '../../commonFiles/LoadingIndicator'
import { trackPromise } from 'react-promise-tracker'


export default function BookShow(props) {
    const { id } = useParams()
    const [book, setbook] = React.useState()
    
    function setup() {
        trackPromise(
            ApiCallHandler(
                async () => await Api.fetchBook(id),
                setbook,
                'BookShow',
                false
            )
        )

    }
    React.useEffect(() => { setup() }, [])


    function Chapter(props) {
        const chapter = props.chapter
        const path = props.path

        return <ListGroup as="ol" numbered>
            <Link to={Routes.bookChapterShow(id, path)}>{chapter?.title}</Link>
            {
                chapter?.sections?.map((element, index) => {
                    if (element.type == 'section')
                        return <Section path={`${path}-${index}`} key={index} section={element} />

                    else if (element.type == 'chapter')
                        return <Chapter path={`${path}-${index}`} key={index} chapter={element} />
                })
            }
        </ListGroup>
    }
    function Section(props) {
        const section = props.section
        const path = props.path
        console.log('section path', path)
        return <ListGroup.Item as="li">
            <Link to={Routes.bookBrowser(id, path)}>
                {section.title}
            </Link>
        </ListGroup.Item>
    }


    return <Col xs={12}>
        <LoadingIndicator />
        <Helmet>
            <meta property="og:image" content={book?.thumbnail} />
            <title>{book?.title}</title>
        </Helmet>
        <h1 className='text-center'>{book?.title}</h1>
        <div>{book?.description}</div>
        {/* <div>{book?.activated ? 'عرض الكتاب مفعل' : 'عرض الكتاب غير مفعل'}</div> */}
        <h3 className='text-center'>جدول المحتوى</h3>

        <Col xs={8} className='mx-auto'>

            <ListGroup as="ol" numbered>
                {
                    book?.content_table.map((element, index) => {
                        if (element.type == 'chapter')
                            return <Chapter path={`${index}`} chapter={element} key={index} />
                        else
                            return <Section path={`${index}`} section={element} key={index} />

                    })
                }
            </ListGroup>
        </Col>
    </Col>
}