import React from 'react'
import { AiOutlineOrderedList } from 'react-icons/ai'
import {
    FloatingLabel, Form, Popover, OverlayTrigger, Col
} from 'react-bootstrap'
import { headerObject } from './structure'

export function HeaderComponentRender(props) {
    const component = props.component
    const originalDir = props.originalDir
    const translatedDir = props.translatedDir
    
    const original = component.original
    const translated = component.translated
    const size = component.size

    const popover = (
        <Popover id="popover-basic" style={{ maxWidth: 1000 }}>
            <Popover.Header as="h3">ترجمة</Popover.Header>
            <Popover.Body>
                {translated}
            </Popover.Body>
        </Popover>
    );



    return <Col xs={12} className='mx-2'>
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <div dir={originalDir} className='text-center'>
            {(() => {
                switch (size) {
                    case 1:
                        return <h1>{original}</h1>
                    case 2:
                        return <h2>{original}</h2>
                    case 3:
                        return <h3>{original}</h3>
                    case 4:
                        return <h4>{original}</h4>
                    case 5:
                        return <h5>{original}</h5>
                    default:
                        return <h1>{original}</h1>
                }
            })()}
            </div>
        </OverlayTrigger>
    </Col >
}

export function HeaderComponentCreator(props) {
    const dispatch = props.dispatch
    const [original, setoriginal] = React.useState('')
    const [translated, settranslated] = React.useState(null)
    const [size, setsize] = React.useState(1)

    return <div className='my-3'>
        <FloatingLabel label="النص الاصلي">
            <Form.Control
                as="textarea"
                style={{ height: '100px' }}
                onChange={(e) => {
                    setoriginal(e.target.value)
                    dispatch(headerObject(e.target.value, translated))
                }}
            />
        </FloatingLabel>
        <FloatingLabel label="النص المترجم">
            <Form.Control
                as="textarea"
                style={{ height: '100px' }}
                onChange={(e) => {
                    settranslated(e.target.value)
                    dispatch(headerObject(original, e.target.value))
                }}
            />
        </FloatingLabel>
        <FloatingLabel label="حجم">
            <Form.Control
                as="input"
                type='number'
                min={1}
                max={5}
                value={size}
                style={{ height: '100px' }}
                onChange={(e) => {
                    setsize(e.target.value)
                    dispatch(headerObject(original, translated, e.target.value))
                }}
            />
        </FloatingLabel>
    </div>
}

export function HeaderComponentEditor(props) {
    const component = props.component
    const dispatch = props.dispatch
    const [original, setoriginal] = React.useState(component.original)
    const [translated, settranslated] = React.useState(component.translated)
    const [size, setsize] = React.useState(component.size)


    const popover = (
        <Popover id="popover-basic" style={{ maxWidth: 1000 }}>
            <Popover.Header as="h3">النص المترجم</Popover.Header>
            <Popover.Body>
                <FloatingLabel label="النص المترجم">

                </FloatingLabel>
            </Popover.Body>
        </Popover>
    );

    return (
        <div className='my-3'>
            {/* <OverlayTrigger trigger="click" placement="bottom" overlay={popover}> */}

            <input
                style={{
                    backgroundColor: 'white',
                    borderWidth: 0,
                    fontSize: 50 / size,
                    width: '100%',
                }}
                onChange={(e) => {
                    setoriginal(e.target.value)
                    dispatch(titleObject(e.target.value, translated))
                }}
                value={original}

            />
            <Form.Control
                as="textarea"
                onChange={(e) => {
                    settranslated(e.target.value)
                    dispatch(titleObject(original, e.target.value))
                }}
                value={translated}

            />
            {/* </OverlayTrigger> */}

        </div>
    )
}