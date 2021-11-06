import React from 'react'

import { ParagraphComponentEditor } from '../PageComponents/ParagraphComponent'
import { TitleComponentEditor } from '../PageComponents/TitleComponent'
import { LinkComponentEditor } from '../PageComponents/LinkComponent'
import { ImageComponentEditor } from '../PageComponents/ImageComponent'
import { HeaderComponentEditor } from '../PageComponents/HeaderComponent'
import PageComponentsCreator from './PageComponentsCreator'
import { Col } from 'react-bootstrap'
import {
    ParagraphComponentClass,
    HeaderComponentClass,
    TitleComponentClass,
    LinkComponentClass,
    ImageComponentClass,
    pageContentObject
} from '../PageComponents/structure'
import { mapRandomKey } from '../utility/helpers'
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'


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
            return pageContentObject(pageComponents1, page_content.originalDir, page_content.translatedDir)
        case 'remove component':
            let filtered = page_content.pageComponents.filter((value, index) => {
                return index != action.index;
            });
            return pageContentObject(filtered, page_content.originalDir, page_content.translatedDir)
        case 'add component':
            let increased = [...page_content.pageComponents, action.newComponent]
            return pageContentObject(increased, page_content.originalDir, page_content.translatedDir)
        case 'left up component':
            let leftup = [...page_content.pageComponents];
            if (action.index >= 1)
                [leftup[action.index - 1], leftup[action.index]] = [leftup[action.index], leftup[action.index - 1]]
            return pageContentObject(leftup, page_content.originalDir, page_content.translatedDir)
        case 'left down component':
            leftdown = [...page_content.pageComponents];
            if (action.index < leftdown.length - 1)
                [leftdown[action.index + 1], leftdown[action.index]] = [leftdown[action.index], leftdown[action.index + 1]]
            return pageContentObject(leftdown, page_content.originalDir, page_content.translatedDir)
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
                            return <div key={mapRandomKey()} className='d-flex flex-row'>
                                <div>
                                    <AiOutlineArrowUp size={20} onClick={() => dispatch({ actionType: 'left up component', index: index })} />
                                    <AiOutlineArrowDown size={20} onClick={() => dispatch({ actionType: 'left down component', index: index })} />
                                </div>
                                <ParagraphComponentEditor
                                    component={component}
                                    originalDir={page_content.originalDir}
                                    translatedDir={page_content.translatedDir}
                                    dispatch={(component) => dispatch({ actionType: 'change component', index: index, component: component })}
                                />
                            </div>
                        } else if (component.class == TitleComponentClass) {
                            return <div key={mapRandomKey()} className='d-flex flex-row'>
                                <div>
                                    <AiOutlineArrowUp size={20} onClick={() => dispatch({ actionType: 'left up component', index: index })} />
                                    <AiOutlineArrowDown size={20} onClick={() => dispatch({ actionType: 'left down component', index: index })} />
                                </div>
                                <TitleComponentEditor
                                    key={index}
                                    component={component}
                                    originalDir={page_content.originalDir}
                                    translatedDir={page_content.translatedDir}
                                    dispatch={(component) => dispatch({ actionType: 'change component', index: index, component: component })}
                                />
                            </div>

                        } else if (component.class == LinkComponentClass) {
                            return <div key={mapRandomKey()} className='d-flex flex-row'>
                                <div>
                                    <AiOutlineArrowUp size={20} onClick={() => dispatch({ actionType: 'left up component', index: index })} />
                                    <AiOutlineArrowDown size={20} onClick={() => dispatch({ actionType: 'left down component', index: index })} />
                                </div>
                                <LinkComponentEditor
                                    key={index}
                                    component={component}
                                    originalDir={page_content.originalDir}
                                    translatedDir={page_content.translatedDir}
                                    dispatch={(component) => dispatch({ actionType: 'change component', index: index, component: component })}

                                />
                            </div>

                        } else if (component.class == HeaderComponentClass) {
                            return <div key={mapRandomKey()} className='d-flex flex-row'>
                                <div>
                                    <AiOutlineArrowUp size={20} onClick={() => dispatch({ actionType: 'left up component', index: index })} />
                                    <AiOutlineArrowDown size={20} onClick={() => dispatch({ actionType: 'left down component', index: index })} />
                                </div>
                                <HeaderComponentEditor
                                    key={index}
                                    component={component}
                                    originalDir={page_content.originalDir}
                                    translatedDir={page_content.translatedDir}
                                    dispatch={(component) => dispatch({ actionType: 'change component', index: index, component: component })}
                                />
                            </div>
                        } else if (component.class == ImageComponentClass) {
                            return <div key={mapRandomKey()} className='d-flex flex-row'>
                                <div>
                                    <AiOutlineArrowUp size={20} onClick={() => dispatch({ actionType: 'left up component', index: index })} />
                                    <AiOutlineArrowDown size={20} onClick={() => dispatch({ actionType: 'left down component', index: index })} />
                                </div> <ImageComponentEditor
                                key={index}
                                component={component}
                                originalDir={page_content.originalDir}
                                translatedDir={page_content.translatedDir}
                                dispatch={(component) => dispatch({ actionType: 'change component', index: index, component: component })}

                            />
                            </div>
                        }
                    })
                }

            </Col>
            <PageComponentsCreator addComponent={addNewComponent} />

        </Col>

    )
}
