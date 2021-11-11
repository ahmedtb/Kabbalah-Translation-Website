import React from "react";
import {Api, ApiCallHandler} from "../utility/Urls";
import { useParams } from "react-router";
import { Col, Container, Button } from "react-bootstrap";

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
        <div >
            <Col xs={12}>
                <h4>التصنيف {category?.name}</h4>
                <div>{category?.id}</div>

            </Col>
        </div>
    )
}