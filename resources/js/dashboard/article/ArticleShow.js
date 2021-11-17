import React from "react";
import { Api, Routes } from "../utility/URLs";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Col, Container, Button } from "react-bootstrap";
import { ApiCallHandler, truncate } from "../../commonFiles/helpers";
import PageContentRender from "../components/PageContentRender";

export default function ArticleShow(props) {

    let { id } = useParams();
    const [article, setarticle] = React.useState(null)
    const [render, setrender] = React.useState('original')

    async function setup() {
        ApiCallHandler(
            async () => await Api.fetchArticle(id),
            setarticle,
            'ArticleShow',
            true
        )
    }
    React.useEffect(() => {
        setup()
    }, [])

    return (
        <div >
            <Link to={Routes.articleEdit(article?.id)}>
                edit
            </Link>
            <Col xs={12}>
                <div>id {article?.id}</div>
                <div>title {article?.title}</div>
                <div>category <Link to={Routes.categoryShow(article?.category_id)}>
                    {article?.category_id}
                </Link></div>
                <div>activated {article?.activated ? 'مفعل' : 'غير مفعل'}</div>
                <div>description {truncate(article?.description)}</div>
                <div>image <img src={article?.thumbnail} className='maxWidth100' /></div>


                <div>original Dir {article?.page_content.originalDir}</div>
                <div>translated Dir {article?.page_content.translatedDir}</div>
                <Button onClick={() => setrender('original')}>
                    عرض النص الاصلي
                </Button>
                <Button onClick={() => setrender('translated')}>
                    عرض الترجمة
                </Button>
                <h5>عنوان الصفحة{article?.title}</h5>
                <Button onClick={() => setrender('both')}>
                    both
                </Button>
                <PageContentRender pageContent={article?.page_content} render={render} />
            </Col>
        </div>
    )
}