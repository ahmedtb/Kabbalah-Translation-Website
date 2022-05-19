import React from "react";
import { Col, Container, ListGroup } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Api } from "../utility/URLs";
import { ApiCallHandler } from "../../commonFiles/helpers";
import { Routes } from '../utility/URLs'
import PagesTable from '../components/PagesTable'
import Pagination from '../../commonFiles/Pagination'
import { useHistory } from "react-router-dom"
import ChangePageTitle from '../../commonFiles/ChangePageTitle'

function Chapter(props) {
    const chapter = props.chapter

    return <ListGroup as="ol" numbered>
        <div>{chapter?.title}</div>
        {
            chapter?.sections?.map((element, index) => {
                if (element.type == 'section')
                    return <Section key={index} section={element} />

                else if (element.type == 'chapter')
                    return <Chapter key={index} chapter={element} />
            })
        }
    </ListGroup>
}
function Section(props) {
    const section = props.section

    return <ListGroup.Item as="li">
        <Link to={Routes.pageShow(section.page_id)}>
            {section.title}
        </Link>
    </ListGroup.Item>
}

export default function BookShow(props) {
    const { id } = useParams()
    const [book, setbook] = React.useState(null)

    function fetchBook() {
        ApiCallHandler(
            async () => await Api.fetchBook(id, {}),
            setbook,
            'BookShow fetchBook',
            true
        )

    }
    const history = useHistory()


    const [pages, setpages] = React.useState([])
    const [links, setlinks] = React.useState([])
    function fetchPages(link = null, params = null) {
        let linkParams = Object.fromEntries(new URLSearchParams(link?.split('?')[1]))
        let allParams = { book_id: id, page_size: 10, ...linkParams, ...params }
        ApiCallHandler(
            async () => await Api.fetchPages(allParams),
            (data) => { setpages(data.data); setlinks(data.links ?? []); },
            'PagesIndex fetchPages',
            true
        )
        console.log('all params', allParams)
        history.replace({
            pathname: window.location.pathname,
            search: (new URLSearchParams(allParams)).toString()
        })
    }

    React.useEffect(() => {
        fetchBook()
        var params = Object.fromEntries(new URLSearchParams(location.search));
        fetchPages(null, params)
    }, [])
    return <div className="bg-light p-2">
        <ChangePageTitle pageTitle={'عرض:' + book?.title} />
        <Link to={Routes.bookEdit(book?.id)}>
            edit
        </Link>
        <h1 className='text-center'>{book?.title}</h1>
        <div className="border rounded my-2">
            <div className="fw-bold">حول الكتاب</div>
            <div>
                {book?.about}
            </div>
        </div>
        <div className="border rounded my-2">
            <div className="fw-bold">وصف الكتاب "يعرض للمتصفحين"</div>
            <div>
                {book?.description}
            </div>
        </div>
        
        <div className="border rounded my-2">
            <div className="fw-bold">عرض الكتاب</div>
            <div>
                {book?.activated ? 'مفعل' : 'غير مفعل'}
            </div>
        </div>

        <h3 className='text-center'>جدول المحتوى</h3>

        <Col xs={8} className='mx-auto'>

            <ListGroup as="ol">
                {
                    book?.content_table.map((element, index) => {
                        if (element.type == 'chapter')
                            return <Chapter chapter={element} key={index} />
                        else
                            return <Section section={element} key={index} />

                    })
                }
            </ListGroup>
        </Col>
        <h3 className='text-center'>صفحات تشير للكتاب</h3>

        <div>
            <PagesTable pages={pages} />
        </div>
        <Pagination fetchPage={fetchPages} links={links} />
    </div>
}