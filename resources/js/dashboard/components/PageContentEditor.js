import React from 'react'

import { ParagraphComponentEditor, ParagraphComponentRender } from '../../commonFiles/PageComponents/ParagraphComponent'
import { TitleComponentEditor, TitleComponentRender } from '../../commonFiles/PageComponents/TitleComponent'
import { LinkComponentEditor, LinkComponentRender } from '../../commonFiles/PageComponents/LinkComponent'
import { ImageComponentEditor, ImageComponentRender } from '../../commonFiles/PageComponents/ImageComponent'
import { HeaderComponentEditor, HeaderComponentRender } from '../../commonFiles/PageComponents/HeaderComponent'
import { YoutubeEmbedComponentEditor, YoutubeEmbedComponentRender } from '../../commonFiles/PageComponents/YoutubeEmbedComponent'

import PageComponentsCreator from './PageComponentsCreator'
import { Col, FormCheck } from 'react-bootstrap'
import {
    ParagraphComponentClass,
    HeaderComponentClass,
    TitleComponentClass,
    LinkComponentClass,
    ImageComponentClass,
    YoutubeEmbedComponentClass,
    pageContentObject,
    pageContentReducer
} from '../../commonFiles/PageComponents/structure'
import { AiOutlineArrowUp, AiOutlineArrowDown, AiFillEdit, AiFillDelete } from 'react-icons/ai'


export default function PageContentEditor(props) {
    const setEditedPageContent = props.setEditedPageContent
    const pageContent = props.pageContent
    const [page_content, dispatch] = React.useReducer(pageContentReducer, pageContentObject([], 'ltr', 'rtl'))

    React.useEffect(() => {
        if (pageContent)
            dispatch({ actionType: 'set page_content', page_content: pageContent })
    }, [pageContent])

    React.useEffect(() => {
        setEditedPageContent(page_content)
    }, [page_content])

    function addNewComponent(componentConfig) {
        // console.log('PageContentEditor componentConfig',componentConfig)
        dispatch({ actionType: 'add component', component: componentConfig })
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
                        <FormCheck.Input type='radio' checked={originalDir == 'rtl'} onChange={(e) => dispatch({ actionType: 'set original dir', dir: 'rtl' })} />
                        <FormCheck.Label>rtl</FormCheck.Label>
                    </FormCheck>

                    <FormCheck>
                        <FormCheck.Input type='radio' checked={originalDir == 'ltr'} onChange={(e) => dispatch({ actionType: 'set original dir', dir: 'ltr' })} />
                        <FormCheck.Label>ltr</FormCheck.Label>
                    </FormCheck>
                </div>
                <div>
                    translated direction

                    <FormCheck>
                        <FormCheck.Input type='radio' checked={translatedDir == 'rtl'} onChange={(e) => dispatch({ actionType: 'set translated dir', dir: 'rtl' })} />
                        <FormCheck.Label>rtl</FormCheck.Label>
                    </FormCheck>

                    <FormCheck>
                        <FormCheck.Input type='radio' checked={translatedDir == 'ltr'} onChange={(e) => dispatch({ actionType: 'set translated dir', dir: 'ltr' })} />
                        <FormCheck.Label>ltr</FormCheck.Label>
                    </FormCheck>
                </div>


            </div>
            <Col xs={12} className='bg-white'>
                <Col xs={10} className='mx-auto'>

                    {
                        page_content?.pageComponents?.map((component, index) => {
                            // console.log('PageContentEditor component', component)
                            if (component.class == ParagraphComponentClass) {
                                return <div key={index} className='d-flex flex-row'>
                                    <div>
                                        <AiOutlineArrowUp size={20} onClick={() => dispatch({ actionType: 'left up component', index: index })} />
                                        <AiOutlineArrowDown size={20} onClick={() => dispatch({ actionType: 'left down component', index: index })} />
                                        <AiFillEdit color={editComponent == index ? 'yellow' : 'black'} size={20} onClick={() => seteditComponent(editIndex => editIndex == index ? null : index)} />
                                        <AiFillDelete size={20} onClick={() => {
                                            if (confirm('are you sure?'))
                                                dispatch({ actionType: 'remove component', index: index })
                                        }} />
                                    </div>
                                    {
                                        true ? <ParagraphComponentEditor
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
                                        <AiFillDelete size={20} onClick={() => {
                                            if (confirm('are you sure?'))
                                                dispatch({ actionType: 'remove component', index: index })
                                        }} />
                                    </div>
                                    {
                                        true ? <TitleComponentEditor
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
                                        <AiFillDelete size={20} onClick={() => {
                                            if (confirm('are you sure?'))
                                                dispatch({ actionType: 'remove component', index: index })
                                        }} />
                                    </div>
                                    {
                                        true ? <LinkComponentEditor
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
                                        <AiFillDelete size={20} onClick={() => {
                                            if (confirm('are you sure?'))
                                                dispatch({ actionType: 'remove component', index: index })
                                        }} />

                                    </div>
                                    {
                                        true ? <HeaderComponentEditor
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
                                        <AiFillDelete size={20} onClick={() => {
                                            if (confirm('are you sure?'))
                                                dispatch({ actionType: 'remove component', index: index })
                                        }} />

                                    </div>
                                    {
                                        true ? <ImageComponentEditor
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
                            } else if (component.class == YoutubeEmbedComponentClass) {
                                return <div key={index} className='d-flex flex-row'>
                                    <div>
                                        <AiOutlineArrowUp size={20} onClick={() => dispatch({ actionType: 'left up component', index: index })} />
                                        <AiOutlineArrowDown size={20} onClick={() => dispatch({ actionType: 'left down component', index: index })} />
                                        <AiFillEdit color={editComponent == index ? 'yellow' : 'black'} size={20} onClick={() => seteditComponent(editIndex => editIndex == index ? null : index)} />
                                        <AiFillDelete size={20} onClick={() => {
                                            if (confirm('are you sure?'))
                                                dispatch({ actionType: 'remove component', index: index })
                                        }} />

                                    </div>
                                    {
                                        true ? <YoutubeEmbedComponentEditor
                                            key={index}
                                            component={component}
                                            originalDir={originalDir}
                                            translatedDir={translatedDir}
                                            dispatch={(component) => dispatch({ actionType: 'change component', index: index, component: component })}

                                        /> : <YoutubeEmbedComponentRender
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
