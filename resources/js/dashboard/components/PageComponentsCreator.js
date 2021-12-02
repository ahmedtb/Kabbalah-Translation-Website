import React from 'react'
import { Dropdown, Button, Col, Form } from 'react-bootstrap'
import { HeaderComponentCreator } from '../../commonFiles/PageComponents/HeaderComponent'
import { ParagraphComponentCreator, ParagraphsComponentCreator } from '../../commonFiles/PageComponents/ParagraphComponent'
import { TitleComponentCreator } from '../../commonFiles/PageComponents/TitleComponent'
import { ImageComponentCreator } from '../../commonFiles/PageComponents/ImageComponent'
import { LinkComponentCreator } from '../../commonFiles/PageComponents/LinkComponent'
import { YoutubeEmbedComponentCreator } from '../../commonFiles/PageComponents/YoutubeEmbedComponent'
import { SeperatorComponentCreator } from '../../commonFiles/PageComponents/SeperatorComponent'
import { QuoteComponentCreator } from '../../commonFiles/PageComponents/QuoteComponent'

import {
    ParagraphComponentClass,
    TitleComponentClass,
    LinkComponentClass,
    ImageComponentClass,
    HeaderComponentClass,
    YoutubeEmbedComponentClass,
    SeperatorComponentClass,
    QuoteComponentClass,
} from '../../commonFiles/PageComponents/structure'

const paragraphsComponent = 'فقرات متتالية'

const componentsTypes = {
    [ParagraphComponentClass]: { label: 'نص عادي', Creator: ParagraphComponentCreator },
    [paragraphsComponent]: { label: 'فقرات متتالية', Creator: ParagraphsComponentCreator },
    [HeaderComponentClass]: { label: 'عنوان فرعي', Creator: HeaderComponentCreator },
    [TitleComponentClass]: { label: 'عنوان صفحة', Creator: TitleComponentCreator },
    [ImageComponentClass]: { label: 'صورة', Creator: ImageComponentCreator },
    [LinkComponentClass]: { label: 'رابط', Creator: LinkComponentCreator },
    [YoutubeEmbedComponentClass]: { label: 'رابط فيديو', Creator: YoutubeEmbedComponentCreator },
    [SeperatorComponentClass]: { label: 'فاصل', Creator: SeperatorComponentCreator },
    [QuoteComponentClass]: { label: 'اقتباس', Creator: QuoteComponentCreator },

    JsonFormat: { label: 'Json', Creator: JsonFormatField }
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
    const [SelectedType, setSelectedType] = React.useState();
    const [component, setcomponent] = React.useState(null);

    return (
        <div>
            <Col xs={2} className='mx-auto'>
                <Dropdown onSelect={(e) => { setSelectedType(componentsTypes[e]); setcomponent(null); }}>
                    <Dropdown.Toggle variant="success">
                        اختر نوع العنصر
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {
                            Object.keys(componentsTypes).map(function (key, index) {
                                return <Dropdown.Item
                                    key={index}
                                    eventKey={key} >
                                    {componentsTypes[key].label}
                                </Dropdown.Item>
                            })
                        }
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
            {SelectedType ? <SelectedType.Creator dispatch={(component) => setcomponent(component)} /> : null}
            
            <Col xs={1} className='mx-auto'>
                {component ?
                    <Button
                        className='my-2'
                        onClick={() => {
                            if (!Array.isArray(component)) {
                                addComponent(component)
                                setcomponent(null)
                                setSelectedType(null)

                            } else {
                                component.forEach(component => {
                                    addComponent(component)
                                });
                                setcomponent(null)
                                setSelectedType(null)
                            }
                        }} variant="primary">اضف</Button>
                    : null}
            </Col>

        </div>
    )

}
