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

export function ParagraphComponentInput(props) {
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

export function ParagraphComponentRender(props) {
    const component = props.component
    const originalDir = props.originalDir
    const translatedDir = props.translatedDir
    const popover = (
        <Popover id="popover-basic">
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

export function ParagraphComponentFormView(props) {
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


    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">النص المترجم</Popover.Header>
            <Popover.Body >
                <textarea
                    style={{
                        backgroundColor: 'white',
                        borderWidth: 0,
                        width: '100%',
                    }}
                    onChange={(e) => {
                        setoriginal(e.target.value)
                        dispatch(titleObject(e.target.value, translated))
                    }}
                    value={original??''}
                />

                <FloatingLabel label="النص المترجم">
                    <Form.Control
                        as="textarea"
                        onChange={(e) => {
                            settranslated(e.target.value)
                            dispatch(titleObject(original, e.target.value))
                        }}
                        value={translated??''}

                    />
                </FloatingLabel>
            </Popover.Body>
        </Popover>
    );

    return (
        <div className='my-3'>
            <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>


                <Col xs={12} className='mx-auto my-2'>
                    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                        <div dir={originalDir}>{component.original.split('\n').map(str => <p key={mapRandomKey()}>{str}</p>)}</div>
                    </OverlayTrigger>
                </Col >

            </OverlayTrigger>

        </div>
    )
}