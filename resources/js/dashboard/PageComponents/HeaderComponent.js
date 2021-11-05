import React from 'react'
import { AiOutlineOrderedList } from 'react-icons/ai'
import {
    FloatingLabel, Form, Popover, OverlayTrigger, Col
} from 'react-bootstrap'
export const HeaderComponentClass = 'App\\PageComponents\\HeaderComponent'

function headerObject(original, translated = null, size = 1) {

    return {
        class: HeaderComponentClass,
        original: original,
        translated: translated,
        size: size
    }
}

export function HeaderComponentRender(props) {
    const component = props.component
    const originalDir = component.originalDir
    const translatedDir = component.translatedDir
    
    const popover = (
        <Popover id="popover-basic" style={{maxWidth:1000}}>
            <Popover.Header as="h3">ترجمة</Popover.Header>
            <Popover.Body>
                {component.translated}
            </Popover.Body>
        </Popover>
    );



    return <Col xs={12} className='mx-2'>
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            {(() => {
                if (component.size == 1)
                    return <h1>{component.original}</h1>
                else if (component.size == 2)
                    return <h2>{component.original}</h2>
                else if (component.size == 3)
                    return <h3>{component.original}</h3>
                else if (component.size == 4)
                    return <h4>{component.original}</h4>
                else if (component.size == 5)
                    return <h5>{component.original}</h5>
                return <h1>{component.original}</h1>
            })()}
        </OverlayTrigger>
    </Col >
}

export function HeaderComponentCreator(props) {
    const set = props.set
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
                    set(headerObject(e.target.value, translated))
                }}
            />
        </FloatingLabel>
        <FloatingLabel label="النص المترجم">
            <Form.Control
                as="textarea"
                style={{ height: '100px' }}
                onChange={(e) => {
                    settranslated(e.target.value)
                    set(headerObject(original, e.target.value))
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
                    set(headerObject(original, translated, e.target.value))
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
        <Popover id="popover-basic" style={{maxWidth:1000}}>
            <Popover.Header as="h3">النص المترجم</Popover.Header>
            <Popover.Body>
                <FloatingLabel label="النص المترجم">
                    <Form.Control
                        as="textarea"
                        onChange={(e) => {
                            settranslated(e.target.value)
                            dispatch(titleObject(original, e.target.value))
                        }}
                        value={translated}

                    />
                </FloatingLabel>
            </Popover.Body>
        </Popover>
    );

    return (
        <div className='my-3'>
            <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>

                <input
                    style={{
                        backgroundColor: 'white',
                        borderWidth: 0,
                        fontSize: 50/size,
                        width: '100%',
                    }}
                    onChange={(e) => {
                        setoriginal(e.target.value)
                        dispatch(titleObject(e.target.value, translated))
                    }}
                    value={original}

                />
            </OverlayTrigger>

        </div>
    )
}