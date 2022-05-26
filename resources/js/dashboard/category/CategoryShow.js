import React from "react";
import { Api, Routes, ApiCallHandler } from "../utility/URLs";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Col, Container, Button } from "react-bootstrap";
import ArticlesTable from '../components/ArticlesTable'
import Paginator from "../../commonFiles/Paginator";

export default function CategoryShow(props) {

    let { id } = useParams();
    const [category, setcategory] = React.useState()
    const [categoriesPag, setcategoriesPag] = React.useState()

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

    function fetchArticles(params = null) {

        return Api.fetchArticles({ ...params, category_id: id })

    }

    return (
        <div className="bg-white p-2 rounded">
            <div className="d-flex justify-content-around p-2">
                <div><strong>رقم التصنيف</strong> {category?.id}</div>
                <div><strong>تسمية التصنيف</strong> {category?.name}</div>

                <Link to={Routes.categoryEdit(id)}>
                    تعديل
                </Link>
            </div>
            <ArticlesTable articles={categoriesPag?.data} />
            <Paginator log={'fetch category articles'} apiCall={fetchArticles} useState={[categoriesPag, setcategoriesPag]} />

        </div>
    )
}