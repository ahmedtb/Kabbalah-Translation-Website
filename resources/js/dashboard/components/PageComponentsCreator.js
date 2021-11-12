import React from 'react'
import { Dropdown, Button, Col } from 'react-bootstrap'
import { HeaderComponentCreator } from '../../commonFiles/PageComponents/HeaderComponent'
import { ParagraphComponentCreator } from '../../commonFiles/PageComponents/ParagraphComponent'
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


const componentsTypes = {
    [ParagraphComponentClass]: 'نص عادي',
    [HeaderComponentClass]: 'عنوان فرعي',
    [TitleComponentClass]: 'عنوان صفحة',
    [ImageComponentClass]: 'صورة',
    [LinkComponentClass]: 'رابط',
    [YoutubeEmbedComponentClass]: 'رابط فيديو',

}

export default function PageComponentsCreator(props) {

    const addComponent = props.addComponent
    const [selectedType, setSelectedType] = React.useState();
    const [component, setcomponent] = React.useState(null);

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
            </Col>

        </div>
    )

}