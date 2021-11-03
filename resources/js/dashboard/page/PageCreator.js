import React from "react"
import PageComponentsCreator, { pageContentObject } from "../PageComponents/PageComponentsCreator"
import PageContentRender from "../PageComponents/PageContentRender";
import { Container, Button, Col } from "react-bootstrap";
import axios from "axios";
import ApiEndpoints from "../utility/ApiEndpoints";
import logError from "../utility/logError";

const creatorReducer = (pageContent, action) => {
    switch (action.actionType) {
        case 'remove component':
            let filtered = pageContent.pageComponents.filter((value, index) => {
                return index != action.index;
            });
            return pageContentObject(filtered)
        case 'add component':
            const components = [...pageContent.pageComponents, action.component]
            return pageContentObject(components)
    }
    return pageContent;
}


export default function PageCreator(props) {

    const [pageContent, dispatch] = React.useReducer(creatorReducer, pageContentObject([]));

    function addComponent(component) {
        dispatch({ actionType: 'add component', component: component })
    }

    async function submit() {
        console.log(pageContent)
        try {
            const response = await ApiEndpoints.createPage(pageContent, true)
            console.log('PageCreator submit', response.data)
        } catch (error) {
            console.log(error.response.data)
            // logError(error, 'PageCreator submit')
        }

    }
    // React.useEffect(() => {
    //     console.log('PageCreator', pageContent)
    // }, [pageContent])

    return <Container >
        <Col xs={12}>
            <PageContentRender pageContent={pageContent} />
            <PageComponentsCreator addComponent={addComponent} />
            <Button onClick={submit}>submit</Button>
        </Col>

    </Container >
}