import React from 'react'

import {  ParagraphComponentEditor } from '../PageComponents/ParagraphComponent'
import {  TitleComponentEditor } from '../PageComponents/TitleComponent'
import {  LinkComponentEditor } from '../PageComponents/LinkComponent'
import {  ImageComponentEditor } from '../PageComponents/ImageComponent'
import {  HeaderComponentEditor } from '../PageComponents/HeaderComponent'
import PageComponentsCreator from './PageComponentsCreator'
import { Col } from 'react-bootstrap'
import { pageContentObject } from '../PageComponents/structure'


const reducer = (page_content, action) => {

    switch (action.actionType) {
        case 'set page_content':
            return action.page_content
        case 'change component':
            let pageComponents1 = page_content.pageComponents.map((component, index) => {
                if (index == action.index)
                    return action.component;
                return component;
            })
            return pageContentObject(pageComponents1,page_content.originalDir, page_content.translatedDir)
        case 'remove component':
            let filtered = page_content.pageComponents.filter((value, index) => {
                return index != action.index;
            });
            return pageContentObject(filtered,page_content.originalDir, page_content.translatedDir)
        case 'add component':
            let increased = [...page_content.pageComponents, action.newComponent]
            return pageContentObject(increased,page_content.originalDir, page_content.translatedDir)

    }
    return page_content;
}




export default function PageContentEditor(props) {
    const setEditedPageContent = props.setEditedPageContent
    const [page_content, dispatch] = React.useReducer(reducer, null)

    React.useEffect(() => {
        dispatch({ actionType: 'set page_content', page_content: props.pageContent })
    }, [props.pageContent])

    React.useEffect(() => {
        setEditedPageContent(page_content)
    }, [page_content])

    function addNewComponent(componentConfig) {
        dispatch({ actionType: 'add component', newComponent: componentConfig })
    }

    return (
        <Col xs={12} className='bg-white'>
            <Col xs={10} className='mx-auto'>

                {
                    page_content?.pageComponents?.map((component, index) => {
                        if (component.class == ParagraphComponentClass) {
                            return <ParagraphComponentEditor
                                key={index}
                                component={component}
                                originalDir={page_content.originalDir}
                                translatedDir={page_content.translatedDir}
                                dispatch={(component) => dispatch({ actionType: 'change component', index: index, component: component })}
                            />
                        } else if (component.class == TitleComponentClass) {
                            return <TitleComponentEditor
                                key={index}
                                component={component}
                                originalDir={page_content.originalDir}
                                translatedDir={page_content.translatedDir}
                                dispatch={(component) => dispatch({ actionType: 'change component', index: index, component: component })}
                            />
                        } else if (component.class == LinkComponentClass) {
                            return <LinkComponentEditor
                                key={index}
                                component={component}
                                originalDir={page_content.originalDir}
                                translatedDir={page_content.translatedDir}
                                dispatch={(component) => dispatch({ actionType: 'change component', index: index, component: component })}

                            />
                        } else if (component.class == HeaderComponentClass) {
                            return <HeaderComponentEditor
                                key={index}
                                component={component}
                                originalDir={page_content.originalDir}
                                translatedDir={page_content.translatedDir}
                                dispatch={(component) => dispatch({ actionType: 'change component', index: index, component: component })}
                            />
                        } else if (component.class == ImageComponentClass) {
                            return <ImageComponentEditor
                                key={index}
                                component={component}
                                originalDir={page_content.originalDir}
                                translatedDir={page_content.translatedDir}
                                dispatch={(component) => dispatch({ actionType: 'change component', index: index, component: component })}

                            />
                        }
                    })
                }

            </Col>
            <PageComponentsCreator addComponent={addNewComponent} />

        </Col>

    )
}
