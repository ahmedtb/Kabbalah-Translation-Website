import React from "react";
import ApiEndpoints from "../utility/ApiEndpoints";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import PageContentRender from "../components/PageContentRender";
import { Col, Container, Button } from "react-bootstrap";
import Routes from '../utility/Routes'
import { logError } from "../utility/helpers";
export default function PageShow(props) {

    let { id } = useParams();
    const [page, setpage] = React.useState(null)

    async function setup() {
        try {
            const response = await ApiEndpoints.fetchPage(id)
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
        <Container >
            <Link to={Routes.pageEdit(page?.id)}>
                edit
            </Link>
            <div>original Dir {page?.page_content.originalDir}</div>
            <div>translated Dir {page?.page_content.translatedDir}</div>
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
                <PageContentRender pageContent={page?.page_content} render={render} />
            </Col>
        </Container>
    )
}