import React from "react";
import ApiEndpoints from "../utility/ApiEndpoints";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ArticleContentRender from "../components/ArticleContentRender";
import { Col, Container, Button } from "react-bootstrap";
import Routes from '../utility/Routes'
import { logError } from "../utility/helpers";

export default function ArticleShow(props) {

    let { id } = useParams();
    const [article, setarticle] = React.useState(null)

    async function setup() {
        try {
            const response = await ApiEndpoints.fetchArticle(id)
            setarticle(response.data)
            console.log('fetchArticle', response.data)
        } catch (error) {
            logError(error, 'fetchArticle')
        }
    }
    React.useEffect(() => {
        setup()
    }, [])
    const [render, setrender] = React.useState('original')

    return (
        <Container >
            <Link to={Routes.articleEdit(article?.id)}>
                edit
            </Link>
            <div>original Dir {article?.article_content.originalDir}</div>
            <div>translated Dir {article?.article_content.translatedDir}</div>
            <Button onClick={() => setrender( 'original' )}>
                عرض النص الاصلي
            </Button>
            <Button onClick={() => setrender('translated')}>
                عرض الترجمة
            </Button>
            <Button onClick={() => setrender('both')}>
                both
            </Button>
            <Col xs={12}>
                <ArticleContentRender articleContent={article?.article_content} render={render} />
            </Col>
        </Container>
    )
}