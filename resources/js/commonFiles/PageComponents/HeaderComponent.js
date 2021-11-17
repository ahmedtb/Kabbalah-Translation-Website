import React from 'react'
import { AiOutlineOrderedList } from 'react-icons/ai'
import {
    FloatingLabel, Form, Popover, OverlayTrigger, div
} from 'react-bootstrap'
import { headerObject } from './structure'

export function HeaderComponentRender(props) {
    const component = props.component
    const originalDir = props.originalDir
    const translatedDir = props.translatedDir
    const render = props.render

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



    return <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
        <div dir={originalDir}>
            {(() => {
                let text = ''
                if (render == 'original') {
                    text = original
                } else if (render == 'translated')
                    text = translated
                else
                    text = <><p>{original}</p> <p>{translated}</p></>
                switch (size) {
                    case '1':
                        return <h1>{text}</h1>
                    case '2':
                        return <h2>{text}</h2>
                    case '3':
                        return <h3>{text}</h3>
                    case '4':
                        return <h4>{text}</h4>
                    case '5':
                        return <h5>{text}</h5>
                    default:
                        return <h1>{text}</h1>
                }
            })()}
        </div>
    </OverlayTrigger>
}

export function HeaderComponentCreator(props) {
    const dispatch = props.dispatch
    const [original, setoriginal] = React.useState('')
    const [translated, settranslated] = React.useState(null)
    const [style, setstyle] = React.useState({})

    const [size, setsize] = React.useState(1)

    return <div className='my-3'>
        <FloatingLabel label="النص الاصلي">
            <Form.Control
                as="textarea"
                style={{ height: '100px' }}
                onChange={(e) => {
                    setoriginal(e.target.value)
                    dispatch(headerObject(e.target.value, translated, size, style))
                }}
            />
        </FloatingLabel>
        <FloatingLabel label="النص المترجم">
            <Form.Control
                as="textarea"
                style={{ height: '100px' }}
                onChange={(e) => {
                    settranslated(e.target.value)
                    dispatch(headerObject(original, e.target.value, size, style))
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
                    dispatch(headerObject(original, translated, e.target.value, style))
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


    return (
        <div className='mx-2 my-3'>

            <FloatingLabel label="النص الاصلي">
                <Form.Control
                    as="textarea"
                    className='my-2'
                    onChange={(e) => {
                        setoriginal(e.target.value)
                        dispatch(headerObject(e.target.value, translated, size))
                    }}
                    defaultValue={original}

                />
            </FloatingLabel>
            <FloatingLabel label="النص المترجم">
                <Form.Control
                    as="textarea"
                    className='my-2'
                    onChange={(e) => {
                        settranslated(e.target.value)
                        dispatch(headerObject(original, e.target.value, size))
                    }}
                    defaultValue={translated}

                />
            </FloatingLabel>
            <FloatingLabel label="حجم">
                <Form.Control
                    as="input"
                    type='number'
                    min={1}
                    max={5}
                    value={size}
                    className='my-2'
                    onChange={(e) => {
                        setsize(e.target.value)
                        dispatch(headerObject(original, translated, e.target.value))
                    }}
                />
            </FloatingLabel>

        </div>
    )
}

export function HeaderComponentWebsiteRender(props) {
    const component = props.component
    const originalDir = props.originalDir
    const translatedDir = props.translatedDir

    const original = component.original
    const translated = component.translated
    const size = component.size

    // console.log('HeaderComponentWebsiteRender size', size == 5)

    return <div dir={translatedDir} >
        {(() => {
            switch (size) {
                case '1':
                    return <h1>{translated}</h1>
                case '2':
                    return <h2>{translated}</h2>
                case '3':
                    return <h3>{translated}</h3>
                case '4':
                    return <h4>{translated}</h4>
                case '5':
                    return <h5>{translated}</h5>
                default:
                    return <h1>{translated}</h1>
            }
        })()}
    </div>
}

