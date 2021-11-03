import React from 'react'
import { AiOutlineOrderedList } from 'react-icons/ai'
import {
    FloatingLabel, Form, Popover, OverlayTrigger, Col
} from 'react-bootstrap'
import convertFileToBase64 from '../utility/convertFileToBase64'
import ImagePicker from '../components/ImagePicker'
export const ImageComponentClass = 'App\\PageComponents\\ImageComponent'



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
    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">ترجمة</Popover.Header>
            <Popover.Body>
                <img src={component.translated} width='100%' />

            </Popover.Body>
        </Popover>
    );
    return <Col xs={10} className='mx-auto'>
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <img src={component.original} width='100%' />
        </OverlayTrigger>

    </Col >
}

export function ImageComponentFormView(props) {
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
                accept=".jpg,.jpeg,.png"
                style={{ height: '100px' }}
                onChange={(e) => {
                    const file = e.target.files[0]
                    // console.log('ImageComponentCreator', file)
                    convertFileToBase64(file).then((base64) => {
                        // console.log('convertImgToBase64URL', base64)
                        setoriginal(base64)
                        set(imageObject(base64, translated))
                    })
                }}
            />
        </FloatingLabel>
        <img src={translated} width={100} />

        <FloatingLabel label="الصورة المترجم">
            <Form.Control
                as="input"
                type='file'
                accept=".jpg,.jpeg,.png"
                style={{ height: '100px' }}
                onChange={(e) => {
                    const file = e.target.files[0]
                    // console.log('ImageComponentCreator', file)
                    convertFileToBase64(file).then((base64) => {
                        // console.log('convertImgToBase64URL', base64)
                        settranslated(base64)
                        set(imageObject(original, base64))
                    })
                }}
            />
        </FloatingLabel>

    </div>
}

export function ImageComponentEditor(props) {
    const component = props.component
    const dispatch = props.dispatch
    const [original, setoriginal] = React.useState(component.original)
    const [translated, settranslated] = React.useState(component.translated)


    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">النص المترجم</Popover.Header>
            <Popover.Body>
                <img src={translated} width='100%' />
                <ImagePicker setImage={settranslated} />
            </Popover.Body>
        </Popover>
    );

    return (
        <div className='my-3'>
            <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                <div>
                    <img src={original} width='100%' />
                    <ImagePicker setImage={setoriginal} />
                </div>
            </OverlayTrigger>

        </div>
    )
}