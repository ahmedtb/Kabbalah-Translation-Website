import React from 'react'
import { Redirect } from 'react-router'
import { Api, Routes, ApiCallHandler } from '../utility/URLs'
import { Container,  Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function CategoriesIndex(props) {
    const [categories, setcategories] = React.useState(null)

    function submit() {

        ApiCallHandler(
            async () => await Api.createCategory(name),
            (data) => {
                alert(data)
                setredirect(Routes.categoriesIndex)
            },
            'CategoryCreator submit',
            true
        )

    }
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
    const [redirect, setredirect] = React.useState(null)

    if (redirect)
        return <Redirect to={redirect} />

        
    function deleteCategory(id) {
        ApiCallHandler(async () => await Api.deleteCategory(id),
            setup,
            'CategorysIndex deleteCategory',
            true
        )
    }

    return <Container>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>العنوان</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    categories?.map((category, index) => (
                        <tr key={index}>
                            <td> <Link to={Routes.categoryShow(category.id)}> {category.id}  </Link> </td>
                            <td>{category.name}</td>
                            <td onClick={() => deleteCategory(category.id)}>حدف</td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    </Container>
}