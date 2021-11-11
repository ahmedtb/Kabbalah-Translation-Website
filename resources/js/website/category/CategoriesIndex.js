import React from 'react'
import { Redirect } from 'react-router'
import { Api, Routes, ApiCallHandler } from '../utility/Urls'
import { Container,  Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function CategoriesIndex(props) {
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

    return <Container>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>تسمية</th>
                    <th>عدد المقالات</th>
                </tr>
            </thead>
            <tbody>
                {
                    categories?.map((category, index) => (
                        <tr key={index}>
                            <td> <Link to={Routes.categoryShow(category.id)}> {category.id}  </Link> </td>
                            <td>{category.name}</td>
                            <td>{category.articles.length}</td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    </Container>
}