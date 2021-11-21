import React from 'react'
import { Dropdown, Button, Col, Form } from 'react-bootstrap'
import { HeaderComponentCreator } from '../../commonFiles/PageComponents/HeaderComponent'
import { ParagraphComponentCreator, ParagraphsComponentCreator } from '../../commonFiles/PageComponents/ParagraphComponent'
import { TitleComponentCreator } from '../../commonFiles/PageComponents/TitleComponent'
import { ImageComponentCreator } from '../../commonFiles/PageComponents/ImageComponent'
import { LinkComponentCreator } from '../../commonFiles/PageComponents/LinkComponent'
import { YoutubeEmbedComponentCreator } from '../../commonFiles/PageComponents/YoutubeEmbedComponent'

import {
    ParagraphComponentClass,
    TitleComponentClass,
    LinkComponentClass,
    ImageComponentClass,
    HeaderComponentClass,
    YoutubeEmbedComponentClass
} from '../../commonFiles/PageComponents/structure'

const paragraphsComponent = 'فقرات متتالية'

const componentsTypes = {
    [ParagraphComponentClass]: 'نص عادي',
    [paragraphsComponent]: 'فقرات متتالية',
    [HeaderComponentClass]: 'عنوان فرعي',
    [TitleComponentClass]: 'عنوان صفحة',
    [ImageComponentClass]: 'صورة',
    [LinkComponentClass]: 'رابط',
    [YoutubeEmbedComponentClass]: 'رابط فيديو',
    JsonFormat: 'Json'
}

function JsonFormatField(props) {
    const dispatch = props.dispatch
    const [json, setjson] = React.useState()
    const [scrollHeight, setscrollHeight] = React.useState(300)

    return <textarea
        style={{
            borderWidth: 1,
            width: '100%',
            height: scrollHeight
        }}
        dir={'ltr'}
        onChange={(e) => {
            setjson(e.target.value)
            setscrollHeight(e.target.scrollHeight)
            dispatch(JSON.parse(`[${e.target.value}]`))
        }}
        value={json ?? ''}
    />
}

export default function PageComponentsCreator(props) {

    const addComponent = props.addComponent
    const [selectedType, setSelectedType] = React.useState();
    const [component, setcomponent] = React.useState(null);
    const [paragraphs, setparagraphs] = React.useState(null);

    // React.useEffect(() => {
    //     console.log('paragraphs', paragraphs)
    // }, [paragraphs])

    return (
        <div>
            <Col xs={2} className='mx-auto'>
                <Dropdown onSelect={(e) => { setSelectedType(e); setcomponent(null); setparagraphs(null); }}>
                    <Dropdown.Toggle variant="success">
                        اختر نوع العنصر
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {
                            Object.keys(componentsTypes).map(function (key, index) {
                                return <Dropdown.Item
                                    key={index}
                                    eventKey={key} >
                                    {componentsTypes[key]}
                                </Dropdown.Item>
                            })
                        }
                    </Dropdown.Menu>
                </Dropdown>
            </Col>

            {
                (() => {
                    if (selectedType == ParagraphComponentClass) {
                        return (
                            <ParagraphComponentCreator dispatch={(component) => setcomponent(component)} />
                        )
                    } else if (selectedType == HeaderComponentClass) {
                        return (
                            <HeaderComponentCreator dispatch={(component) => setcomponent(component)} />
                        )
                    } else if (selectedType == TitleComponentClass) {
                        return (
                            <TitleComponentCreator dispatch={(component) => setcomponent(component)} />
                        )
                    } else if (selectedType == ImageComponentClass) {
                        return (
                            <ImageComponentCreator dispatch={(component) => setcomponent(component)} />
                        )
                    } else if (selectedType == LinkComponentClass) {
                        return (
                            <LinkComponentCreator dispatch={(component) => setcomponent(component)} />
                        )
                    } else if (selectedType == YoutubeEmbedComponentClass) {
                        return (
                            <YoutubeEmbedComponentCreator dispatch={(component) => setcomponent(component)} />
                        )
                    } else if (selectedType == paragraphsComponent) {
                        return (
                            <ParagraphsComponentCreator dispatch={(paragraphs) => setparagraphs(paragraphs)} />
                        )
                    } else if (selectedType == 'JsonFormat') {
                        return (
                            <JsonFormatField dispatch={(json) => setparagraphs(json)} />
                        )
                    }
                })()
            }
            <Col xs={1} className='mx-auto'>
                {component ?
                    <Button
                        className='my-2'
                        onClick={() => {
                            addComponent(component)
                            setcomponent(null)
                            setSelectedType(null)
                        }} variant="primary">اضف</Button>
                    : null}
                {paragraphs ?
                    <Button
                        className='my-2'
                        onClick={() => {
                            paragraphs.forEach(component => {
                                addComponent(component)
                            });
                            // console.log('paragraphs button', paragraphs)
                            setparagraphs(null)
                            setSelectedType(null)
                        }} variant="primary">اضافة فقرات</Button>
                    : null}
            </Col>

        </div>
    )

}
