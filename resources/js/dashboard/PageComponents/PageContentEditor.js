import React from 'react'

import { ParagraphComponentClass, ParagraphComponentEditor } from './ParagraphComponent'
import { TitleComponentClass, TitleComponentEditor } from './TitleComponent'
import { LinkComponentClass, LinkComponentEditor } from './LinkComponent'
import { ImageComponentClass, ImageComponentEditor } from './ImageComponent'
import { HeaderComponentClass, HeaderComponentEditor } from './HeaderComponent'

import PageComponentsCreator, { PageContentClass } from './PageComponentsCreator'
import { Col } from 'react-bootstrap'
import Button from '@restart/ui/esm/Button'

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
            return { class: PageContentClass, pageComponents: pageComponents1 }
        case 'remove component':
            let filtered = page_content.pageComponents.filter((value, index) => {
                return index != action.index;
            });
            return { class: PageContentClass, pageComponents: filtered }
        case 'add component':
            let increased = [...page_content.pageComponents, action.newComponent]
            return { class: PageContentClass, pageComponents: increased }
    }
    return page_content;
}




export default function PageContentEditor(props) {
    const setEditedPageContent = props.setEditedPageContent
    const [page_content, dispatch] = React.useReducer(reducer, props.pageContent)

    React.useEffect(() => {
        // console.log('PageContentEditor useEffect', props.pageContent)
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
                <PageComponentsCreator addComponent={addNewComponent} />

            </Col>
        </Col>

    )
}
