import React from "react";
import { Api, Routes, ApiCallHandler } from "../utility/Urls";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Col, Container, Button } from "react-bootstrap";
import PageContentRender from '../components/PageContentRender'

export default function ArticleShow(props) {
    let { id } = useParams();
    const [article, setarticle] = React.useState(null)

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
    return <div>
        <Col xs={12}>
            <div>تصنيف المقالة {article?.category.name}</div>
            <div>عنوان المقالة {article?.page.title}</div>
            <PageContentRender page={article?.page} />
        </Col>
    </div>
}
