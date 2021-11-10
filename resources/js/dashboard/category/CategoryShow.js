import React from "react";
import {Api, Routes} from "../utility/URLs";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Col, Container, Button } from "react-bootstrap";
import { ApiCallHandler } from "../utility/helpers";

export default function CategoryShow(props){
    
    let { id } = useParams();
    const [category, setcategory] = React.useState(null)

    async function setup() {
        ApiCallHandler(
            async () => await Api.fetchCategory(id),
            setcategory,
            'CategoryShow',
            true
        )
    }
    React.useEffect(() => {
        setup()
    }, [])

    return (
        <Container >
            {/* <Link to={Routes.categoryEdit(category?.id)}>
                edit
            </Link> */}
            <Col xs={12}>
                <div>{category?.name}</div>
                <div>{category?.id}</div>

            </Col>
        </Container>
    )
}