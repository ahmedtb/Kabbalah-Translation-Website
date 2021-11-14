import React from 'react'
import { Redirect } from 'react-router'
import { Api, Routes, ApiCallHandler } from '../utility/URLs'
import { Container, Button } from 'react-bootstrap'

export default function CategoryCreator(props) {
    const [name, setname] = React.useState(null)

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

    const [redirect, setredirect] = React.useState(null)

    if (redirect)
        return <Redirect to={redirect} />

    return <div>
        <input type='text' onChange={e => setname(e.target.value)} />
        <Button onClick={submit}>submit</Button>
    </div>
}