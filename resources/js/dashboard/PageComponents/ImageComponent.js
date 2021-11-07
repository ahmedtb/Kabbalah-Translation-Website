import React from 'react'
import { AiOutlineOrderedList } from 'react-icons/ai'
import {
    FloatingLabel, Form, Popover, OverlayTrigger, Col
} from 'react-bootstrap'
import { convertFileToBase64 } from '../utility/helpers.js'
import ImagePicker from '../components/ImagePicker'
import { imageObject } from './structure.js'

export function ImageComponentRender(props) {
    const component = props.component
    const popover = (
        <Popover id="popover-basic" style={{ maxWidth: 1000 }}>
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

export function ImageComponentCreator(props) {
    const set = props.set
    const [original, setoriginal] = React.useState('')
    const [translated, settranslated] = React.useState('')

    return <div className='my-3'>
        <img src={original} width={100} />
        <FloatingLabel label="الصورة الاصلي">
            <ImagePicker
                maxSize={100000}
                setImage={(base64) => {
                    setoriginal(base64)
                    set(imageObject(base64, translated))
                }}
            />
        </FloatingLabel>
        <img src={translated} width={100} />

        <FloatingLabel label="الصورة المترجم">
            <ImagePicker
                maxSize={100000}
                setImage={(base64) => {
                    settranslated(base64)
                    set(imageObject(original, base64))
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
        <Popover id="popover-basic" style={{ maxWidth: 1000 }}>
            <Popover.Header as="h3">النص المترجم</Popover.Header>
            <Popover.Body>

            </Popover.Body>
        </Popover>
    );

    return (
        <div className='my-3'>
            {/* <OverlayTrigger trigger="click" placement="bottom" overlay={popover}> */}
            <div>
                <img src={original} width='100%' />
                <ImagePicker
                    maxSize={100000}
                    setImage={(base64) => {
                        setoriginal(base64)
                        dispatch(imageObject(base64, translated))
                    }}
                />
                <img src={translated} width='100%' />
                <ImagePicker
                    maxSize={100000}
                    setImage={(base64) => {
                        settranslated(base64)
                        dispatch(imageObject(original, base64))
                    }}
                />
            </div>
            {/* </OverlayTrigger> */}

        </div>
    )
}