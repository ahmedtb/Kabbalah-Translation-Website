import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { ParagraphComponentClass, ParagraphComponentCreator } from './ParagraphComponent'
// import { TextAreaComponentClass, TextAreaComponentCreator } from './TextAreaComponent'
// import { ImageComponentClass, ImageComponentCreator } from './ImageComponent'
// import { LocationComponentClass, LocationComponentCreator } from './LocationComponent'
// import { OptionsComponentClass, OptionsComponentCreator } from './OptionsComponent'

export const PageContentClass = 'App\\PageComponents\\PageContent'

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
        // console.log('PageComponentsCreator', selectedType)
    }, [selectedType])

    return (
        <div>

            <div style={{ flexDirection: 'row' }}>
                <div style={{ flex: 1, borderWidth: 0.5,  borderRadius: 8 }}>
                    {/* <Picker
                        style={{}}
                        selectedValue={selectedType}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedType(itemValue)
                        }>
                        <Picker.Item label={'اختر نوع الحقل'} value={'dummey'} />
                        {
                            Object.keys(componentsTypes).map(function (key, index) {
                                return <Picker.Item key={index} label={componentsTypes[key]} value={key} />
                            })
                        }
                    </Picker> */}
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

            <button
                onClick={() => {
                    addComponent(component)
                    setcomponent({})
                    setSelectedType(null)
                }}
                style={{ alignSelf: 'flex-end', backgroundColor: 'red', width: '20%', padding: 10,  justifyContent: 'center', borderRadius: 19 }}
            >
                <strong style={{ textAlign: 'center', color: 'white', fontSize: 40 }}>اضف</strong>
            </button>
        </div>
    )

}