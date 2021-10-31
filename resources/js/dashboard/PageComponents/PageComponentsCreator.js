import React from 'react'
import { Dropdown, Button } from 'react-bootstrap'
import { ParagraphComponentClass, ParagraphComponentCreator } from './ParagraphComponent'
// import { TextAreaComponentClass, TextAreaComponentCreator } from './TextAreaComponent'
// import { ImageComponentClass, ImageComponentCreator } from './ImageComponent'
// import { LocationComponentClass, LocationComponentCreator } from './LocationComponent'
// import { OptionsComponentClass, OptionsComponentCreator } from './OptionsComponent'

export const PageContentClass = 'App\\PageComponents\\PageContent'
export function pageContentObject(pageComponents){
    return {
        class: PageContentClass,
        pageComponents: pageComponents
    }
}
const componentsTypes = {
    [ParagraphComponentClass]: 'حقل نص عادي',
    // [TextAreaComponentClass]: 'مساحة نصية',
    // [OptionsComponentClass]: 'قائمة اختيار',
    // [LocationComponentClass]: 'تحديد موقع المستخدم',
    // [ImageComponentClass]: 'حقل صورة'
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

            <div>
                <div style={{ flex: 1, borderWidth: 0.5, borderRadius: 8 }}>
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
                </div>
            </div>

            {
                (() => {
                    if (selectedType == ParagraphComponentClass) {
                        return (
                            <ParagraphComponentCreator set={(component) => setcomponent(component)} />
                        )
                    }
                    //  else if (selectedType == TextAreaComponentClass) {
                    //     return (
                    //         <strongAreaComponentCreator set={(component) => setcomponent(component)} />
                    //     )
                    // } else if (selectedType == OptionsComponentClass) {
                    //     return (
                    //         <OptionsComponentCreator set={(component) => setcomponent(component)} />
                    //     )
                    // } else if (selectedType == LocationComponentClass) {
                    //     return (
                    //         <LocationComponentCreator set={(component) => setcomponent(component)} />
                    //     )
                    // } else if (selectedType == ImageComponentClass) {
                    //     return (
                    //         <ImageComponentCreator set={(component) => setcomponent(component)} />
                    //     )
                    // }
                })()
            }

            <Button onClick={() => {
                addComponent(component)
                setcomponent({})
                setSelectedType(null)
            }} variant="primary">اضف</Button>
        </div>
    )

}