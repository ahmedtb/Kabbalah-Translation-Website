import React from 'react'
import { AiOutlineOrderedList } from 'react-icons/ai'
import { FloatingLabel, Form } from 'react-bootstrap'
export const ImageComponentClass = 'App\\PageComponents\\ImageComponent'


function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  }

function imageObject(original, translated = null) {

    return {
        class: ImageComponentClass,
        original: original,
        translated: translated,
    }
}

export function ImageComponentInput(props) {
    const component = props.component
    const dispatch = props.dispatch

    return <div >
        <strong >{component.label}</strong>
        <input
            onChangeText={(text) => {
                dispatch(text)
            }}
            value={component.value}
        />
    </div>
}

export function ImageComponentRender(props) {
    const component = props.component
    const [showTranslated, setShowTranslated] = React.useState(0)
    return <div >
        <strong
            onMouseOver={() => { setShowTranslated(1) }}
            onMouseLeave={() => setShowTranslated(0)}
        >{component.original}</strong>
        <strong style={{ opacity: showTranslated }}>{component.translated}</strong>
    </div >
}

export function ImageComponentFormdiv(props) {
    const component = props.component
    return <div >
        <div >
            <AiOutlineOrderedList />
            <div style={{ marginLeft: 5, flex: 1, }}>
                <strong style={{ color: 'black', fontSize: 17, flex: 1, fontWeight: 'bold' }}>{component.label}</strong>
                <strong style={{ color: 'grey', fontSize: 10, }}>حقل نصي</strong>
            </div>
        </div>
        <strong style={{ color: 'black', fontSize: 20, flex: 1, textAlign: 'center', padding: 10, backgroundColor: '#f5f0f0' }}>{component.value}</strong>
    </div>
}



export function ImageComponentCreator(props) {
    const set = props.set
    const [original, setoriginal] = React.useState('')
    const [translated, settranslated] = React.useState(null)

    return <div className='my-3'>
        <img src={original} width={100} />
        <FloatingLabel label="الصورة الاصلي">
            <Form.Control
                as="input"
                type='file'
                accept=".jpg"
                style={{ height: '100px' }}
                onChange={(e) => {
                    const file = e.target.files[0]
                    console.log('ImageComponentCreator', file)
                    convertFileToBase64(file).then((base64) => {
                        console.log('convertImgToBase64URL', base64)
                        setoriginal(base64)
                    })
                    // setoriginal(e.target.value)
                    // set(imageObject(e.target.value, translated))
                }}
            />
        </FloatingLabel>
        <img src={translated} width={100} />

        <FloatingLabel label="الصورة المترجم">
            <Form.Control
                as="input"
                type='file'
                accept=".jpg"
                style={{ height: '100px' }}
                onChange={(e) => {
                    const file = e.target.files[0]
                    console.log('ImageComponentCreator', file)
                    convertFileToBase64(file).then((base64) => {
                        console.log('convertImgToBase64URL', base64)
                        settranslated(base64)
                    })
                }}
            />
        </FloatingLabel>

    </div>
}

export function ImageComponentEditor(props) {
    const component = props.component
    const dispatch = props.dispatch
    const [label, setlabel] = React.useState(component.label)
    const [value, setvalue] = React.useState(component.value)

    return (
        <div style={{ marginVertical: 15 }}>

            <div style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <strong>حقل نصي</strong>
            </div>

            <input style={{ fontSize: 12, borderWidth: 1, borderColor: '#dec9c8', borderRadius: 10 }}
                onChangeText={(text) => {
                    setlabel(text)
                    dispatch({
                        class: ImageComponentClass, label: text, value: value
                    })
                }}
                value={label}
            />
            <input
                type='textarea'
                style={{ borderWidth: 1, borderColor: '#dec9c8', borderRadius: 10, marginVertical: 5 }}
                onChangeText={(text) => {
                    setvalue(text)
                    dispatch({
                        class: ImageComponentClass, label: label, value: value
                    })
                }}
                value={value}
            />

        </div>
    )
}