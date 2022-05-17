import React from 'react'

import { Col, FormCheck } from 'react-bootstrap'
import { AiOutlineArrowUp, AiOutlineArrowDown, AiFillEdit, AiFillDelete, AiOutlinePlusCircle } from 'react-icons/ai'

import { ParagraphComponentEditor, ParagraphComponentRender } from '../../commonFiles/PageComponents/ParagraphComponent'
import { TitleComponentEditor, TitleComponentRender } from '../../commonFiles/PageComponents/TitleComponent'
import { LinkComponentEditor, LinkComponentRender } from '../../commonFiles/PageComponents/LinkComponent'
import { ImageComponentEditor, ImageComponentRender } from '../../commonFiles/PageComponents/ImageComponent'
import { HeaderComponentEditor, HeaderComponentRender } from '../../commonFiles/PageComponents/HeaderComponent'
import { YoutubeEmbedComponentEditor, YoutubeEmbedComponentRender } from '../../commonFiles/PageComponents/YoutubeEmbedComponent'
import { SeperatorComponentEditor, SeperatorComponentRender } from '../../commonFiles/PageComponents/SeperatorComponent'
import { QuoteComponentEditor, QuoteComponentRender } from '../../commonFiles/PageComponents/QuoteComponent'
import {
    ParagraphComponentClass,
    HeaderComponentClass,
    TitleComponentClass,
    LinkComponentClass,
    ImageComponentClass,
    YoutubeEmbedComponentClass,
    pageContentObject,
    pageContentReducer,
    SeperatorComponentClass,
    QuoteComponentClass
} from '../../commonFiles/PageComponents/structure'
import PageComponentsCreator from './PageComponentsCreator'

const componentsTypes = {
    [ParagraphComponentClass]: { Editor: ParagraphComponentEditor, Render: ParagraphComponentRender },
    [HeaderComponentClass]: { Editor: HeaderComponentEditor, Render: HeaderComponentRender },
    [TitleComponentClass]: { Editor: TitleComponentEditor, Render: TitleComponentRender },
    [ImageComponentClass]: { Editor: ImageComponentEditor, Render: ImageComponentRender },
    [LinkComponentClass]: { Editor: LinkComponentEditor, Render: LinkComponentRender },
    [YoutubeEmbedComponentClass]: { Editor: YoutubeEmbedComponentEditor, Render: YoutubeEmbedComponentRender },
    [SeperatorComponentClass]: { Editor: SeperatorComponentEditor, Render: SeperatorComponentRender },
    [QuoteComponentClass]: { Editor: QuoteComponentEditor, Render: QuoteComponentRender },
}

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

    const [render, setrender] = React.useState('both')

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
                    اتجاه النص الاصلي

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
                    اتجاه النص المترجم

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
                        (render == 'json')
                            ?
                            <textarea
                                dir='ltr'
                                style={{ width: '100%', height: 1000 }}
                                defaultValue={JSON.stringify(pageComponents, null, '\t')}
                                onChange={e => {
                                    dispatch({ actionType: 'set page_content', page_content: pageContentObject(JSON.parse(e.target.value), 'ltr', 'rtl') });
                                }}
                            />
                            :
                            pageComponents?.map((component, index) => {

                                if (componentsTypes[component.class])
                                    return <div key={index}>
                                        {EditorAndRender(componentsTypes[component.class].Editor, componentsTypes[component.class].Render, index, component, originalDir, translatedDir)}
                                    </div>

                            })
                    }

                </Col >
                <PageComponentsCreator addComponent={addNewComponent} />
            </Col >

        </div >

    )
}
