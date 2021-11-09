import React from "react"
import { Redirect } from "react-router";
import { Container, Button, } from "react-bootstrap";
import { Api, Routes } from "../utility/URLs";
import { ApiCallHandler } from "../utility/helpers";

export default function ArticleCreator(props) {
    const [pages, setpages] = React.useState([]);
    const [categories, setcategories] = React.useState([]);

    const [page_id, setpage_id] = React.useState(null);
    const [category_id, setcategory_id] = React.useState(null);
    const [activated, setactivated] = React.useState(null);

    function submit() {

        ApiCallHandler(
            async () => await Api.createArticle(page_id, category_id, activated),
            (data) => {
                alert(data)
                setredirect(Routes.dashboard)
            },
            'ArticleCreator submit',
            true
        )

    }
    const [redirect, setredirect] = React.useState(null)

    if (redirect)
        return <Redirect to={redirect} />

    return <Container >

        <Button onClick={submit}>submit</Button>

    </Container >
}