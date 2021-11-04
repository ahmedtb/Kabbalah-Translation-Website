import React from "react";
import ApiEndpoints from "../utility/ApiEndpoints";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import PageContentRender from "../PageComponents/PageContentRender";
import { Col, Container, Button } from "react-bootstrap";
import Routes from '../utility/Routes'
import {logError} from "../utility/helpers";
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
    return (
        <Container >
            <Link to={Routes.pageEdit(page?.id)}>
                edit
            </Link>
            <div>original Dir {page?.page_content.originalDir}</div>
            <div>translated Dir {page?.page_content.translatedDir}</div>

            <Col xs={12}>
                <PageContentRender pageContent={page?.page_content} />
            </Col>
        </Container>
    )
}