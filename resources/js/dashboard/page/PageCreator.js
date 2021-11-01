import React from "react"
import PageComponentsCreator, { pageContentObject } from "../PageComponents/PageComponentsCreator"
import PageContentRender from "../PageComponents/PageContentRender";
import { Container, Row, Col } from "react-bootstrap";

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
    // React.useEffect(() => {
    //     console.log('PageCreator', pageContent)
    // }, [pageContent])

    return <Container >
        <Col xs={12}>
            <PageContentRender pageContent={pageContent} />
            <PageComponentsCreator addComponent={addComponent} />
        </Col>

    </Container >
}