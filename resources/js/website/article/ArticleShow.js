import React from "react";
import { Api, Routes, ApiCallHandler } from "../utility/Urls";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Col, Container, Button, Row } from 'react-bootstrap';
import PageContentRender from '../components/PageContentRender'
import { Helmet } from 'react-helmet'
import { truncate } from "../../commonFiles/helpers";
import LoadingIndicator from '../../commonFiles/LoadingIndicator'
import { trackPromise } from 'react-promise-tracker'
import { BsDot } from 'react-icons/bs'
export default function ArticleShow(props) {
    let { id } = useParams();
    const [article, setarticle] = React.useState(null)

    async function setup() {
        trackPromise(
            ApiCallHandler(
                async () => await Api.fetchArticle(id),
                setarticle,
                'ArticleShow',
                true
            )
        )
    }

    const [articlesSuggestion, setarticlesSuggestion] = React.useState(null)

    function fetchArticlesSuggestion() {
        ApiCallHandler(
            () => Api.articlesSuggestion(),
            setarticlesSuggestion,
            'ArticleShow fetchArticlesSuggestion',
            true
        )
    }

    React.useEffect(() => {
        setup()
        fetchArticlesSuggestion()
    }, [id])
    return <div>

        <Helmet>
            <title>
                {article?.title}
            </title>

        </Helmet>
        <Row>

            <Col xl={10} lg={12}>
                {/* <h1 className='text-center'>{article?.title}</h1> */}
                <Link to={Routes.articlesIndex({ category_id: article?.category_id })}>{article?.category.name}</Link>
                {article?.description ? <div>وصف المقالة {article?.description}</div> : null}

                <PageContentRender page_content={article?.page_content} />
                <LoadingIndicator />

                {article?.source_url ? <div>عنوان المصدر <a href={article?.source_url} target='_blank'>{truncate(article?.source_url, 20)}</a></div> : null}

            </Col>
            <Col xl={2} lg={12} className='border rounded p-2 my-2 bg-white'>
                <div className="fs-5">إقرا ايضا</div>
                {articlesSuggestion?.map((arti, index) => {
                    return <Link key={index} className="" to={Routes.articleShow(arti.id)}>
                        <div className="d-flex my-2">
                            {/* <BsDot className="" size={30} /> */}
                            <div>
                                {arti.title}
                            </div>
                        </div>
                    </Link >
                })}
            </Col>
        </Row>
    </div>
}
