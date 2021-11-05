import React from 'react'
import { AiOutlineOrderedList } from 'react-icons/ai'
import {
    FloatingLabel, Form, Popover, OverlayTrigger, Col
} from 'react-bootstrap'
import { mapRandomKey } from '../utility/helpers'
export const ParagraphComponentClass = 'App\\PageComponents\\ParagraphComponent'

function paragraphObject(original, translated = null) {

    return {
        class: ParagraphComponentClass,
        original: original,
        translated: translated
    }
}

export function ParagraphComponentRender(props) {
    const component = props.component
    const originalDir = props.originalDir
    const translatedDir = props.translatedDir
    const popover = (
        <Popover id="popover-basic" style={{ maxWidth: 1000 }}>
            <Popover.Header as="h3">ترجمة</Popover.Header>
            <Popover.Body dir={translatedDir}>
                {component.translated}
            </Popover.Body>
        </Popover>
    );

    return <Col xs={12} className='mx-auto my-2'>
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <div dir={originalDir}>{component.original.split('\n').map(str => <p key={mapRandomKey()}>{str}</p>)}</div>
        </OverlayTrigger>
    </Col >
}

export function ParagraphComponentCreator(props) {
    const set = props.set
    const [original, setoriginal] = React.useState('')
    const [translated, settranslated] = React.useState(null)

    return <div className='my-3'>
        <FloatingLabel label="النص الاصلي">
            <Form.Control
                as="textarea"
                style={{ height: '100px' }}
                onChange={(e) => {
                    setoriginal(e.target.value)
                    set(paragraphObject(e.target.value, translated))
                }}
            />
        </FloatingLabel>
        <FloatingLabel label="النص المترجم">
            <Form.Control
                as="textarea"
                style={{ height: '100px' }}
                onChange={(e) => {
                    settranslated(e.target.value)
                    set(paragraphObject(original, e.target.value))
                }}
            />
        </FloatingLabel>
    </div>
}

export function ParagraphComponentEditor(props) {
    const component = props.component
    const originalDir = props.originalDir
    const translatedDir = props.translatedDir
    const dispatch = props.dispatch
    const [original, setoriginal] = React.useState(component.original)
    const [translated, settranslated] = React.useState(component.translated)

    const [scrollHeight, setscrollHeight] = React.useState(100)

    const popover = (
        <Popover id="popover-basic" style={{ maxWidth: 1000 }}>
            <Popover.Header as="h3">تعديل</Popover.Header>
            <Popover.Body >
                <FloatingLabel label="النص المترجم">
                    <Form.Control
                        as="textarea"
                        onChange={(e) => {
                            settranslated(e.target.value)
                            dispatch(paragraphObject(original, e.target.value))
                        }}
                        value={translated ?? ''}
                        style={{ width: 900 }}
                    />
                </FloatingLabel>
            </Popover.Body>
        </Popover>
    );

    return (

        <Col xs={12} className='mx-auto my-2'>
            <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                <textarea
                    style={{
                        backgroundColor: 'white',
                        borderWidth: 0,
                        width: 900,
                        height: scrollHeight,
                    }}
                    onChange={(e) => {
                        setoriginal(e.target.value)
                        dispatch(paragraphObject(e.target.value, translated))
                        setscrollHeight(e.target.scrollHeight)
                    }}
                    onClick={e => setscrollHeight(e.target.scrollHeight)}
                    value={original ?? ''}

                />
            </OverlayTrigger>
        </Col >

    )
}