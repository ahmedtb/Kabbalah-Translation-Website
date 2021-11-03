import React from "react";
import ApiEndpoints from "../utility/ApiEndpoints";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import PageContentRender from "../PageComponents/PageContentRender";
import { Col, Container, Button } from "react-bootstrap";
import Routes from '../utility/Routes'
export default function PageShow(props) {

    let { id } = useParams();
    const [page, setpage] = React.useState(null)
    async function setup() {
        ApiEndpoints.fetchPage(id, setpage)
        // get(ApiEndpoints.fetchPage.replace(':id', id), null, 'PageShow', setpage)
    }
    React.useEffect(() => {
        setup()
    }, [])
    return (
        <Container >
            <Link to={Routes.pageEdit(page?.id)}>
                edit
            </Link>
            <Col xs={12}>
                <PageContentRender pageContent={page?.page_content} />
            </Col>
        </Container>
    )
}