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
            {/* <h1 className='text-center'>{article?.title}</h1> */}
            <Link to={Routes.articlesIndex({ category_id: article?.category_id })}>{article?.category.name}</Link>
            {article?.description ? <div>وصف المقالة {article?.description}</div> : null }

            <PageContentRender page_content={article?.page_content} />
            
            {article?.source_url ? <div>عنوان المصدر <a href={article?.source_url} target='_blank'>{article?.source_url}</a></div> : null }
        </Col>
    </div>
}
