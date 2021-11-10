import React from 'react'
import { Redirect, useParams } from 'react-router'
import { Api, Routes, ApiCallHandler } from '../utility/URLs'
import { Container, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default function CategoryEditor(props) {
    const [name, setname] = React.useState(null)

    let { id } = useParams();
    const [category, setcategory] = React.useState(null)

    async function setup() {
        ApiCallHandler(
            async () => await Api.fetchCategory(id),
            setcategory,
            'CategoryEditor',
            true
        )
    }
    React.useEffect(() => {
        setup()
    }, [])

    async function submit() {
        ApiCallHandler(
            async () => await Api.editCategory(id, name),
            (data) => { alert('category is updated'); setredirect(Routes.categoriesIndex); },
            'CategoryEditor submit',
            true
        )
    }
    const [redirect, setredirect] = React.useState(null)

    if (redirect)
        return <Redirect to={redirect} />

    return (
        <Container >
            <Link to={Routes.categoryEdit(category?.id)}>
                edit
            </Link>
            <Col xs={12}>
                <div>{category?.name}</div>
                <input onChange={e => setname(e.target.value)} />
                <Button onClick={submit}>submit</Button>

            </Col>
        </Container>
    )
}