import React from 'react'

import { ParagraphComponentEditor, ParagraphComponentRender } from '../PageComponents/ParagraphComponent'
import { TitleComponentEditor, TitleComponentRender } from '../PageComponents/TitleComponent'
import { LinkComponentEditor, LinkComponentRender } from '../PageComponents/LinkComponent'
import { ImageComponentEditor, ImageComponentRender } from '../PageComponents/ImageComponent'
import { HeaderComponentEditor, HeaderComponentRender } from '../PageComponents/HeaderComponent'
import PageComponentsCreator from './PageComponentsCreator'
import { Col, FormCheck } from 'react-bootstrap'
import {
    ParagraphComponentClass,
    HeaderComponentClass,
    TitleComponentClass,
    LinkComponentClass,
    ImageComponentClass,
    pageContentObject
} from '../PageComponents/structure'
import { AiOutlineArrowUp, AiOutlineArrowDown, AiFillEdit } from 'react-icons/ai'


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
            let leftdown = [...page_content.pageComponents];
            if (action.index < leftdown.length - 1)
                [leftdown[action.index + 1], leftdown[action.index]] = [leftdown[action.index], leftdown[action.index + 1]]
            return pageContentObject(leftdown, page_content.originalDir, page_content.translatedDir)

        case 'set original dir':
            return pageContentObject(page_content.pageComponents, action.dir, page_content.translatedDir)
        case 'set translated dir':
            return pageContentObject(page_content.pageComponents, page_content.originalDir, action.dir)
    }
    return page_content;
}




export default function PageContentEditor(props) {
    const setEditedPageContent = props.setEditedPageContent
    const pageContent = props.pageContent
    const [page_content, dispatch] = React.useReducer(reducer, null)
    
    React.useEffect(() => {
        dispatch({ actionType: 'set page_content', page_content: pageContent })
    }, [pageContent])
    
    React.useEffect(() => {
        setEditedPageContent(page_content)
    }, [page_content])
    
    function addNewComponent(componentConfig) {
        dispatch({ actionType: 'add component', newComponent: componentConfig })
    }
    
    const [editComponent, seteditComponent] = React.useState(null)
    const originalDir = page_content?.originalDir
    const translatedDir = page_content?.translatedDir


    return (
        <div>
            <div className='d-flex flex-row justify-content-between'>
                <div>
                    original direction

                    <FormCheck>
                        <FormCheck.Input type='radio' name='originalDir' onClick={() => dispatch({ actionType: 'set original dir', dir: 'rtl' })} />
                        <FormCheck.Label>rtl</FormCheck.Label>
                    </FormCheck>

                    <FormCheck>
                        <FormCheck.Input type='radio' name='originalDir' onClick={() => dispatch({ actionType: 'set original dir', dir: 'ltr' })} />
                        <FormCheck.Label>ltr</FormCheck.Label>
                    </FormCheck>
                </div>
                <div>
                    translated direction

                    <FormCheck>
                        <FormCheck.Input type='radio' name='translatedDir' onClick={() => dispatch({ actionType: 'set translated dir', dir: 'rtl' })} />
                        <FormCheck.Label>rtl</FormCheck.Label>
                    </FormCheck>

                    <FormCheck>
                        <FormCheck.Input type='radio' name='translatedDir' onClick={() => dispatch({ actionType: 'set translated dir', dir: 'ltr' })} />
                        <FormCheck.Label>ltr</FormCheck.Label>
                    </FormCheck>
                </div>

            </div>
            <Col xs={12} className='bg-white'>
                <Col xs={10} className='mx-auto'>

                    {
                        page_content?.pageComponents?.map((component, index) => {
                            if (component.class == ParagraphComponentClass) {
                                return <div key={index} className='d-flex flex-row'>
                                    <div>
                                        <AiOutlineArrowUp size={20} onClick={() => dispatch({ actionType: 'left up component', index: index })} />
                                        <AiOutlineArrowDown size={20} onClick={() => dispatch({ actionType: 'left down component', index: index })} />
                                        <AiFillEdit color={editComponent == index ? 'yellow' : 'black'} size={20} onClick={() => seteditComponent(editIndex => editIndex == index ? null : index)} />
                                    </div>
                                    {
                                        editComponent == index ? <ParagraphComponentEditor
                                            component={component}
                                            originalDir={originalDir}
                                            translatedDir={translatedDir}
                                            dispatch={(component) => dispatch({ actionType: 'change component', index: index, component: component })}
                                        /> : <ParagraphComponentRender
                                            component={component}
                                            originalDir={originalDir}
                                            translatedDir={translatedDir}
                                            render='original'
                                        />
                                    }

                                </div>
                            } else if (component.class == TitleComponentClass) {
                                return <div key={index} className='d-flex flex-row'>
                                    <div>
                                        <AiOutlineArrowUp size={20} onClick={() => dispatch({ actionType: 'left up component', index: index })} />
                                        <AiOutlineArrowDown size={20} onClick={() => dispatch({ actionType: 'left down component', index: index })} />
                                        <AiFillEdit color={editComponent == index ? 'yellow' : 'black'} size={20} onClick={() => seteditComponent(editIndex => editIndex == index ? null : index)} />
                                    </div>
                                    {
                                        editComponent == index ? <TitleComponentEditor
                                            key={index}
                                            component={component}
                                            originalDir={originalDir}
                                            translatedDir={translatedDir}
                                            dispatch={(component) => dispatch({ actionType: 'change component', index: index, component: component })}
                                        /> : <TitleComponentRender
                                            component={component}
                                            originalDir={originalDir}
                                            translatedDir={translatedDir}
                                            render='original'
                                        />
                                    }
                                </div>

                            } else if (component.class == LinkComponentClass) {
                                return <div key={index} className='d-flex flex-row'>
                                    <div>
                                        <AiOutlineArrowUp size={20} onClick={() => dispatch({ actionType: 'left up component', index: index })} />
                                        <AiOutlineArrowDown size={20} onClick={() => dispatch({ actionType: 'left down component', index: index })} />
                                        <AiFillEdit color={editComponent == index ? 'yellow' : 'black'} size={20} onClick={() => seteditComponent(editIndex => editIndex == index ? null : index)} />
                                    </div>
                                    {
                                        editComponent == index ? <LinkComponentEditor
                                            key={index}
                                            component={component}
                                            originalDir={originalDir}
                                            translatedDir={translatedDir}
                                            dispatch={(component) => dispatch({ actionType: 'change component', index: index, component: component })}

                                        /> : <LinkComponentRender
                                            component={component}
                                            originalDir={originalDir}
                                            translatedDir={translatedDir}
                                            render='original'
                                        />
                                    }
                                </div>

                            } else if (component.class == HeaderComponentClass) {
                                return <div key={index} className='d-flex flex-row'>
                                    <div>
                                        <AiOutlineArrowUp size={20} onClick={() => dispatch({ actionType: 'left up component', index: index })} />
                                        <AiOutlineArrowDown size={20} onClick={() => dispatch({ actionType: 'left down component', index: index })} />
                                        <AiFillEdit color={editComponent == index ? 'yellow' : 'black'} size={20} onClick={() => seteditComponent(editIndex => editIndex == index ? null : index)} />

                                    </div>
                                    {
                                        editComponent == index ? <HeaderComponentEditor
                                            key={index}
                                            component={component}
                                            originalDir={originalDir}
                                            translatedDir={translatedDir}
                                            dispatch={(component) => dispatch({ actionType: 'change component', index: index, component: component })}
                                        /> : <HeaderComponentRender
                                            component={component}
                                            originalDir={originalDir}
                                            translatedDir={translatedDir}
                                            render='original'
                                        />
                                    }
                                </div>
                            } else if (component.class == ImageComponentClass) {
                                return <div key={index} className='d-flex flex-row'>
                                    <div>
                                        <AiOutlineArrowUp size={20} onClick={() => dispatch({ actionType: 'left up component', index: index })} />
                                        <AiOutlineArrowDown size={20} onClick={() => dispatch({ actionType: 'left down component', index: index })} />
                                        <AiFillEdit color={editComponent == index ? 'yellow' : 'black'} size={20} onClick={() => seteditComponent(editIndex => editIndex == index ? null : index)} />

                                    </div>
                                    {
                                        editComponent == index ? <ImageComponentEditor
                                            key={index}
                                            component={component}
                                            originalDir={originalDir}
                                            translatedDir={translatedDir}
                                            dispatch={(component) => dispatch({ actionType: 'change component', index: index, component: component })}

                                        /> : <ImageComponentRender
                                            component={component}
                                            originalDir={originalDir}
                                            translatedDir={translatedDir}
                                            render='original'
                                        />
                                    }
                                </div>
                            }
                        })
                    }

                </Col>
                <PageComponentsCreator addComponent={addNewComponent} />

            </Col>
        </div>

    )
}
