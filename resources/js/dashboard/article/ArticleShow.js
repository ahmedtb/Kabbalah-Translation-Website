import React from "react";
import {Api, Routes} from "../utility/URLs";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ArticleContentRender from "../components/ArticleContentRender";
import { Col, Container, Button } from "react-bootstrap";
import { ApiCallHandler } from "../utility/helpers";

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

    return (
        <Container >
            <Link to={Routes.articleEdit(article?.id)}>
                edit
            </Link>
            <Col xs={12}>
            </Col>
        </Container>
    )
}