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
import { AiOutlineArrowUp, AiOutlineArrowDown, AiFillEdit, AiFillDelete, AiOutlinePlusCircle } from 'react-icons/ai'
import { textNewLines } from '../../commonFiles/helpers'

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
        dispatch({ actionType: 'add component', component: componentConfig })
    }

    function addComponentAt(component, index) {
        dispatch({ actionType: 'insert component', index: index, component: component })

    }

    const [editComponent, seteditComponent] = React.useState(null)
    const [showCreator, setshowCreator] = React.useState(null)

    const [render, setrender] = React.useState('original')

    const originalDir = page_content?.originalDir
    const translatedDir = page_content?.translatedDir
    const pageComponents = page_content?.pageComponents

    function EditorAndRender(Editor, Render, index, component, originalDir, translatedDir) {

        return <div>
            <div className='text-center'>
                {
                    showCreator == index ?
                        <PageComponentsCreator addComponent={(component) => { addComponentAt(component, index); setshowCreator(null) }} />
                        : null
                }

            </div>
            <div className='d-flex flex-grow-1 flex-row border rounded'>

                <div className='d-flex flex-column'>
                    <AiOutlinePlusCircle color={showCreator == index ? 'yellow' : 'black'} size={20} onClick={() => setshowCreator(pre => pre == index ? null : index)} />
                    <AiOutlineArrowUp size={20} onClick={() => dispatch({ actionType: 'left up component', index: index })} />
                    <AiOutlineArrowDown size={20} onClick={() => dispatch({ actionType: 'left down component', index: index })} />
                    <AiFillEdit color={editComponent == index ? 'yellow' : 'black'} size={20} onClick={() => seteditComponent(editIndex => editIndex == index ? null : index)} />
                    <AiFillDelete size={20} onClick={() => {
                        if (confirm(`do you want to delete ${index} ?`))
                            dispatch({ actionType: 'remove component', index: index })
                    }} />
                </div>
                <div className='flex-grow-1'>

                    {
                        editComponent == index || editComponent == -1 ? <Editor
                            component={component}
                            originalDir={originalDir}
                            translatedDir={translatedDir}
                            dispatch={(component) => dispatch({ actionType: 'change component', index: index, component: component })}
                        /> : <Render
                            component={component}
                            originalDir={originalDir}
                            translatedDir={translatedDir}
                            render={render}
                        />
                    }
                </div>

            </div>
        </div>
    }

    return (
        <div className='mb-5'>
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

                <div>
                    <FormCheck>
                        <FormCheck.Input type='checkbox' checked={editComponent == -1} onChange={(e) => seteditComponent(old => old == null ? -1 : null)} />
                        <FormCheck.Label>عرض التعديل</FormCheck.Label>
                    </FormCheck>
                    <FormCheck>
                        <FormCheck.Input type='radio' checked={render == 'original'} onChange={(e) => setrender('original')} />
                        <FormCheck.Label>عرض الاصلي</FormCheck.Label>
                    </FormCheck>

                    <FormCheck>
                        <FormCheck.Input type='radio' checked={render == 'translated'} onChange={(e) => setrender('translated')} />
                        <FormCheck.Label>عرض الترجمة</FormCheck.Label>
                    </FormCheck>
                    <FormCheck>
                        <FormCheck.Input type='radio' checked={render == 'both'} onChange={(e) => setrender('both')} />
                        <FormCheck.Label>عرض الاصلي والترجمة</FormCheck.Label>
                    </FormCheck>

                    <FormCheck>
                        <FormCheck.Input type='radio' checked={render == 'json'} onChange={(e) => setrender('json')} />
                        <FormCheck.Label>عرض json</FormCheck.Label>
                    </FormCheck>
                </div>

            </div>
            <Col xs={12} className=''>
                <Col xs={10} className='mx-auto bg-white'>

                    {
                        render == 'json' ? <div dir='ltr'>{JSON.stringify(pageComponents)}</div>
                            :
                            pageComponents?.map((component, index) => {


                                if (component.class == ParagraphComponentClass) {
                                    return <div key={index}>
                                        {EditorAndRender(ParagraphComponentEditor, ParagraphComponentRender, index, component, originalDir, translatedDir)}

                                    </div>

                                } else if (component.class == TitleComponentClass) {
                                    return <div key={index}>
                                        {EditorAndRender(TitleComponentEditor, TitleComponentRender, index, component, originalDir, translatedDir)}

                                    </div>

                                } else if (component.class == LinkComponentClass) {
                                    return <div key={index}>
                                        {EditorAndRender(LinkComponentEditor, LinkComponentRender, index, component, originalDir, translatedDir)}

                                    </div>

                                } else if (component.class == HeaderComponentClass) {
                                    return <div key={index}>
                                        {EditorAndRender(HeaderComponentEditor, HeaderComponentRender, index, component, originalDir, translatedDir)}

                                    </div>

                                } else if (component.class == ImageComponentClass) {
                                    return <div key={index}>
                                        {EditorAndRender(ImageComponentEditor, ImageComponentRender, index, component, originalDir, translatedDir)}

                                    </div>

                                } else if (component.class == YoutubeEmbedComponentClass) {
                                    return <div key={index}>
                                        {EditorAndRender(YoutubeEmbedComponentEditor, YoutubeEmbedComponentRender, index, component, originalDir, translatedDir)}

                                    </div>

                                }
                            })
                    }

                </Col >
                <PageComponentsCreator addComponent={addNewComponent} />
            </Col >

        </div >

    )
}
