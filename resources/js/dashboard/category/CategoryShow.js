import React from "react";
import { Api, Routes, ApiCallHandler } from "../utility/URLs";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Col, Container, Button } from "react-bootstrap";
import ArticlesTable from '../components/ArticlesTable'

export default function CategoryShow(props) {

    let { id } = useParams();
    const [category, setcategory] = React.useState(null)

    async function setup() {
        ApiCallHandler(
            async () => await Api.fetchCategory(id, { with: ['articles'] }),
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
            <Link to={Routes.categoryEdit(category?.id)}>
                edit
            </Link>
            <Col xs={12}>
                <div>تسمية التصنيف {category?.name}</div>
                <div>Id {category?.id}</div>
                <ArticlesTable articles={category?.articles} />
            </Col>
        </div>
    )
}