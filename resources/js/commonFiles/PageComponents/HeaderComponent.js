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



    // return <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
    //     <div >
    //         {(() => {
    let text = ''
    if (render == 'original') {
        text = <div dir={originalDir}>{original}</div>
    } else if (render == 'translated')
        text = <div dir={translatedDir}>{translated}</div>
    else
        text = <><div dir={originalDir}>{original}</div> <div dir={translatedDir}>{translated}</div></>
    switch (+size) {
        case 1:
            return <h1 id={1}>{text}</h1>
        case 2:
            return <h2 id={1}>{text}</h2>
        case 3:
            return <h3 id={1}>{text}</h3>
        case 4:
            return <h4 id={1}>{text}</h4>
        case 5:
            return <h5 id={1}>{text}</h5>
        default:
            return <h1 id={1}>{text}</h1>
    }
    //         })()}
    //     </div>
    // </OverlayTrigger>
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
                as="input"
                style={{ height: '100px' }}
                onChange={(e) => {
                    setoriginal(e.target.value)
                    dispatch(headerObject(e.target.value, translated, size, style))
                }}
            />
        </FloatingLabel>
        <FloatingLabel label="النص المترجم">
            <Form.Control
                as="input"
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
                    value={original ?? ''}

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
                    value={translated ?? ''}

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
    const render = props.render
    const className = props.className


    // console.log('HeaderComponentWebsiteRender size', size == 5)

    let text = ''
    if (render == 'original') {
        text = <div dir={originalDir}>{original}</div>
    } else if (render == 'translated')
        text = <div dir={translatedDir}>{translated}</div>
    else
        text = <><div dir={originalDir}>{original}</div> <div dir={translatedDir}>{translated}</div></>
    switch (+size) {
        case 1:
            return <h1 className={className ?? ''} id={1}>{text}</h1>
        case 2:
            return <h2 className={className ?? ''} id={1}>{text}</h2>
        case 3:
            return <h3 className={className ?? ''} id={1}>{text}</h3>
        case 4:
            return <h4 className={className ?? ''} id={1}>{text}</h4>
        case 5:
            return <h5 className={className ?? ''} id={1}>{text}</h5>
        default:
            return <h1 className={className ?? ''} id={1}>{text}</h1>
    }
}

