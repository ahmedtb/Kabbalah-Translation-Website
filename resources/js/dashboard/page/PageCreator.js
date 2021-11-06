import React from "react"
import PageComponentsCreator from "../components/PageComponentsCreator"
import PageContentRender from "../components/PageContentRender";
import { Container, Button, Col, FormCheck, Form } from "react-bootstrap";
import ApiEndpoints from "../utility/ApiEndpoints";
import { pageContentObject } from "../PageComponents/structure";

const creatorReducer = (pageContent, action) => {
    switch (action.actionType) {
        case 'remove component':
            let filtered = pageContent.pageComponents.filter((value, index) => {
                return index != action.index;
            });
            return pageContentObject(filtered)
        case 'add component':
            const components = [...pageContent.pageComponents, action.component]
            return pageContentObject(components, pageContent.originalDir, pageContent.translatedDir)
        case 'set original dir':
            return pageContentObject(pageContent.pageComponents, action.originalDir, pageContent.translatedDir)
        case 'set translated dir':
            return pageContentObject(pageContent.pageComponents, pageContent.originalDir, action.translatedDir)
    }
    return pageContent;
}


export default function PageCreator(props) {

    const [pageContent, dispatch] = React.useReducer(creatorReducer, pageContentObject([]));
    const [title, settitle] = React.useState('');

    function addComponent(component) {
        dispatch({ actionType: 'add component', component: component })
    }

    React.useEffect(() => {
        console.log('PageCreator', pageContent)
    }, [pageContent])

    async function submit() {

        try {
            const response = await ApiEndpoints.createPage(title, pageContent, true)
            console.log('PageCreator submit', response.data)
        } catch (error) {
            console.log(error.response.data)
            // logError(error, 'PageCreator submit')
        }

    }
    function setOriginalDir(dir) {
        dispatch({ actionType: 'set original dir', originalDir: dir })
    }
    function setTranslatedDir(dir) {
        dispatch({ actionType: 'set translated dir', translatedDir: dir })
    }
    const [render, setrender] = React.useState('original')

    return <Container >
        <div className='d-flex flex-row justify-content-between'>
            <div>
                original direction

                <FormCheck>
                    <FormCheck.Input type='radio' name='originalDir' onClick={() => setOriginalDir('rtl')} />
                    <FormCheck.Label>rtl</FormCheck.Label>
                </FormCheck>

                <FormCheck>
                    <FormCheck.Input type='radio' name='originalDir' onClick={() => setOriginalDir('ltr')} />
                    <FormCheck.Label>ltr</FormCheck.Label>
                </FormCheck>
            </div>
            <div>
                translated direction

                <FormCheck>
                    <FormCheck.Input type='radio' name='translatedDir' onClick={() => setTranslatedDir('rtl')} />
                    <FormCheck.Label>rtl</FormCheck.Label>
                </FormCheck>

                <FormCheck>
                    <FormCheck.Input type='radio' name='translatedDir' onClick={() => setTranslatedDir('ltr')} />
                    <FormCheck.Label>ltr</FormCheck.Label>
                </FormCheck>
            </div>

        </div>
        <FormCheck>
            <FormCheck.Label>عنوان المقالة</FormCheck.Label>
            <Form.Control type='text' onChange={(e) => settitle(e.target.value)} />
        </FormCheck>

        <Col xs={12}>
            <PageContentRender pageContent={pageContent} render='original' />
            <PageComponentsCreator addComponent={addComponent} />
            <Button onClick={submit}>submit</Button>
        </Col>

    </Container >
}