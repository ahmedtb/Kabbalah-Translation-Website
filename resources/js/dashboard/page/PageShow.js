import React from "react";
import { Api, Routes } from "../utility/URLs";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import PageContentRender from "../components/PageContentRender";
import { Col, Container, Button } from "react-bootstrap";
import { logError } from "../../commonFiles/helpers";
export default function PageShow(props) {

    let { id } = useParams();
    const [page, setpage] = React.useState(null)

    async function setup() {
        try {
            const response = await Api.fetchPage(id)
            setpage(response.data)
            console.log('fetchPage', response.data)
        } catch (error) {
            logError(error, 'fetchPage')
        }
    }
    React.useEffect(() => {
        setup()
    }, [])
    const [render, setrender] = React.useState('original')

    return (
        <div >
            <Link to={Routes.pageEdit(page?.id)}>
                edit
            </Link>
            <h5 className='text-center'>عنوان الصفحة {page?.title}</h5>
            <div className='text-center'>رابط المصدر {page?.source_url}</div>
            
            <div className='text-center'>ينتمي للكتاب {page?.book_id}</div>
            <div className='text-center'>وصف المحتوى {page?.meta_description}</div>

            <div className='text-center'> هل مترجمة {page?.isTranslated ? 'نعم' : 'لا'}</div>


            <div className='text-center'>اتجاه النص الاصلي {page?.page_content.originalDir}</div>
            <div className='text-center'>اتجاه النص المترجم {page?.page_content.translatedDir}</div>
            <Button onClick={() => setrender('original')}>
                عرض النص الاصلي
            </Button>
            <Button onClick={() => setrender('translated')}>
                عرض الترجمة
            </Button>
            <Button onClick={() => setrender('both')}>
                both
            </Button>
            <Col xs={12}>
                <PageContentRender pageContent={page?.page_content} render={render} />
            </Col>
        </div>
    )
}