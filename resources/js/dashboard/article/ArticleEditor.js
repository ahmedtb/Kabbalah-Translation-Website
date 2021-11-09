import React from "react";
import ApiEndpoints from "../utility/ApiEndpoints";
import { useParams } from "react-router";
import { Redirect } from "react-router";
import ArticleContentEditor from "../components/ArticleContentEditor";
import { Col, Container, Button, FormCheck, Form } from "react-bootstrap";
import { logError, ApiCallHandler } from "../utility/helpers";
import ArticleContentRender from "../components/ArticleContentRender";
import Routes from "../utility/Routes";

export default function ArticleEditor(props) {

    let { id } = useParams();
    const [article, setarticle] = React.useState(null)
    const [EditedArticleContent, setEditedArticleContent] = React.useState(null)
    const [title, settitle] = React.useState('');
    const [description, setdescription] = React.useState('');

    async function setup() {
        ApiCallHandler(
            async () => await ApiEndpoints.fetchArticle(id),
            (data) => { setarticle(data); settitle(data.title) },
            'ArticleEditor fetchArticle',
            true
        )
    }
    React.useEffect(() => {
        setup()
    }, [])
    React.useEffect(() => {
        // console.log('ArticleEditor', EditedArticleContent)
    }, [EditedArticleContent])

    async function submit() {
        ApiCallHandler(
            async () => await ApiEndpoints.editArticle(id, title, description, EditedArticleContent, true),
            (data) => { alert('article is updated'); setredirect(Routes.articlesIndex); },
            'ArticleEditor submit',
            true
        )
    }
    const [redirect, setredirect] = React.useState(null)

    if (redirect)
        return <Redirect to={redirect} />

    return (
        <Container >

            <FormCheck>
                <FormCheck.Label>عنوان المقالة</FormCheck.Label>
                <Form.Control type='text' onChange={(e) => settitle(e.target.value)} value={title} />
            </FormCheck>

            <FormCheck>
                <FormCheck.Label>وصف المقالة</FormCheck.Label>
                <Form.Control type='textarea' onChange={(e) => setdescription(e.target.value)} />
            </FormCheck>
            <Col xs={12}>
                <ArticleContentEditor articleContent={article?.article_content} setEditedArticleContent={setEditedArticleContent} />
                {/* <ArticleContentRender articleContent={article?.article_content} /> */}

                <Button onClick={submit}>submit</Button>
            </Col>
        </Container>
    )
}