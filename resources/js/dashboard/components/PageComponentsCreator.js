import React from 'react'
import { Dropdown, Button, Col } from 'react-bootstrap'
import { HeaderComponentCreator } from '../PageComponents/HeaderComponent'
import { ParagraphComponentCreator } from '../PageComponents/ParagraphComponent'
import { TitleComponentCreator } from '../PageComponents/TitleComponent'
import { ImageComponentCreator } from '../PageComponents/ImageComponent'
import { LinkComponentCreator } from '../PageComponents/LinkComponent'

import {
    ParagraphComponentClass,
    TitleComponentClass,
    LinkComponentClass,
    ImageComponentClass,
    HeaderComponentClass
} from '../PageComponents/structure'


const componentsTypes = {
    [ParagraphComponentClass]: 'نص عادي',
    [HeaderComponentClass]: 'عنوان فرعي',
    [TitleComponentClass]: 'عنوان صفحة',
    [ImageComponentClass]: 'صورة',
    [LinkComponentClass]: 'رابط',

}

export default function PageComponentsCreator(props) {

    const addComponent = props.addComponent
    const [selectedType, setSelectedType] = React.useState();
    const [component, setcomponent] = React.useState({});

    React.useEffect(() => {
        // console.log('PageComponentsCreator', component)
    }, [component])

    return (
        <div>


            <Col xs={2} className='mx-auto'>
                <Dropdown onSelect={(e) => setSelectedType(e)}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
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
                            <ParagraphComponentCreator set={(component) => setcomponent(component)} />
                        )
                    } else if (selectedType == HeaderComponentClass) {
                        return (
                            <HeaderComponentCreator set={(component) => setcomponent(component)} />
                        )
                    } else if (selectedType == TitleComponentClass) {
                        return (
                            <TitleComponentCreator set={(component) => setcomponent(component)} />
                        )
                    } else if (selectedType == ImageComponentClass) {
                        return (
                            <ImageComponentCreator set={(component) => setcomponent(component)} />
                        )
                    } else if (selectedType == LinkComponentClass) {
                        return (
                            <LinkComponentCreator set={(component) => setcomponent(component)} />
                        )
                    }
                })()
            }
            <Col xs={1} className='mx-auto'>
                <Button
                    className='my-2'
                    onClick={() => {
                        addComponent(component)
                        setcomponent({})
                        setSelectedType(null)
                    }} variant="primary">اضف</Button>
            </Col>

        </div>
    )

}