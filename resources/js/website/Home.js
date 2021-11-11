import React from "react"
import { Api, ApiCallHandler, Routes } from "./utility/Urls"
import { Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
export default function Home(props) {
    const [categories, setcategories] = React.useState(null)

    async function setup() {
        ApiCallHandler(async () => await Api.fetchCategories(),
            setcategories,
            'CategoriesIndex setup',
            true
        )
    }
    React.useEffect(() => {
        setup()
    }, [])
    return (
        <div>
            <Row>
            <Col xs={9}>
                <h1>translation</h1>
            </Col>
            <Col xs={3}>
                {
                    categories?.map((category, index) => (
                        <div key={index}>
                            <Link to={Routes.articlesIndex({ category_id: category.id })}> {category.name}  </Link>
                        </div>
                    ))
                }
            </Col>
            </Row>
        </div>
    )
}