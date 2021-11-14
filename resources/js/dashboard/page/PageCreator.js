import React from "react"
import { Redirect } from "react-router";
import PageComponentsCreator from "../components/PageComponentsCreator"
import { Container, Button, Col, FormCheck, Form } from "react-bootstrap";
import { Api } from "../utility/URLs";
import { Routes } from "../utility/URLs";
import { ApiCallHandler } from "../../commonFiles/helpers";
import { ParagraphComponentEditor, ParagraphComponentRender } from '../../commonFiles/PageComponents/ParagraphComponent'
import { TitleComponentEditor, TitleComponentRender } from '../../commonFiles/PageComponents/TitleComponent'
import { LinkComponentEditor, LinkComponentRender } from '../../commonFiles/PageComponents/LinkComponent'
import { ImageComponentEditor, ImageComponentRender } from '../../commonFiles/PageComponents/ImageComponent'
import { HeaderComponentEditor, HeaderComponentRender } from '../../commonFiles/PageComponents/HeaderComponent'
import { YoutubeEmbedComponentEditor, YoutubeEmbedComponentRender } from '../../commonFiles/PageComponents/YoutubeEmbedComponent'

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

export default function PageCreator(props) {

    const [page_content, dispatch] = React.useReducer(pageContentReducer, pageContentObject([], 'ltr', 'rtl'));
    const [title, settitle] = React.useState('');
    const [meta_description, setmeta_description] = React.useState('');

    function addComponent(component) {
        dispatch({ actionType: 'add component', component: component })
    }

    React.useEffect(() => {
        console.log('PageCreator', page_content)
    }, [page_content])

    function submit() {

        ApiCallHandler(
            async () => await Api.createPage(title, meta_description, page_content, true),
            (data) => {
                alert(data)
                setredirect(Routes.dashboard)
            },
            'PageCreator submit',
            true
        )

    }
    function setOriginalDir(dir) {
        dispatch({ actionType: 'set original dir', originalDir: dir })
    }
    function setTranslatedDir(dir) {
        dispatch({ actionType: 'set translated dir', translatedDir: dir })
    }
    const [editComponent, seteditComponent] = React.useState(null)
    const originalDir = page_content?.originalDir
    const translatedDir = page_content?.translatedDir

    const [redirect, setredirect] = React.useState(null)

    if (redirect)
        return <Redirect to={redirect} />

    return <div >
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
            <FormCheck.Label>عنوان الصفحة</FormCheck.Label>
            <Form.Control as='input' onChange={(e) => settitle(e.target.value)} />
        </FormCheck>
        <FormCheck>
            <FormCheck.Label>وصف تفاصيل</FormCheck.Label>
            <Form.Control as='textarea' onChange={(e) => setmeta_description(e.target.value)} rows={3} />
        </FormCheck>
        <Col xs={12}>
            {
                page_content?.pageComponents?.map((component, index) => {
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
                                <AiFillDelete size={20} onClick={() => {
                                    if (confirm('are you sure?'))
                                        dispatch({ actionType: 'remove component', index: index })
                                }} />

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
                                <AiFillDelete size={20} onClick={() => {
                                    if (confirm('are you sure?'))
                                        dispatch({ actionType: 'remove component', index: index })
                                }} />

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
                    } else if (component.class == YoutubeEmbedComponentClass) {
                        return <div key={index} className='d-flex flex-row'>
                            <div>
                                <AiOutlineArrowUp size={20} onClick={() => dispatch({ actionType: 'left up component', index: index })} />
                                <AiOutlineArrowDown size={20} onClick={() => dispatch({ actionType: 'left down component', index: index })} />
                                <AiFillEdit color={editComponent == index ? 'yellow' : 'black'} size={20} onClick={() => seteditComponent(editIndex => editIndex == index ? null : index)} />

                            </div>
                            {
                                editComponent == index ? <YoutubeEmbedComponentEditor
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

            <PageComponentsCreator addComponent={addComponent} />


            <Button onClick={submit}>submit</Button>
        </Col>

    </div >
}
