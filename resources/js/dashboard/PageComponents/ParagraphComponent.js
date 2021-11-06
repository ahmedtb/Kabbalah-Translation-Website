import React from 'react'
import {
    FloatingLabel, Form, Popover, OverlayTrigger, Col
} from 'react-bootstrap'
import { mapRandomKey } from '../utility/helpers'

import { paragraphObject } from './structure'


export function ParagraphComponentRender(props) {
    const component = props.component
    const originalDir = props.originalDir
    const translatedDir = props.translatedDir
    const render = props.render

    const popover = (
        <Popover id="popover-basic" style={{ maxWidth: 1000 }}>
            <Popover.Header as="h3">ترجمة</Popover.Header>
            <Popover.Body dir={translatedDir}>
                <div dir={translatedDir}>{component.translated.split('\n').map(str => <p key={mapRandomKey()}>{str}</p>)}</div>
            </Popover.Body>
        </Popover>
    );

    return <Col xs={12} className='mx-auto my-2'>
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover} >
            {(() => {
                switch (render) {
                    case 'original':
                        return <div dir={originalDir} style={component.style}>
                            {component.original.split('\n').map(str => <p key={mapRandomKey()}>{str}</p>)}
                        </div>
                    case 'translated':
                        return <div dir={translatedDir} style={component.style}>
                            {component.translated.split('\n').map(str => <p key={mapRandomKey()}>{str}</p>)}
                        </div>
                    case 'both':
                        return <div style={component.style}>
                            <div dir={originalDir}>{component.original.split('\n').map(str => <p key={mapRandomKey()}>{str}</p>)}</div>
                            <div dir={translatedDir}>{component.translated.split('\n').map(str => <p key={mapRandomKey()}>{str}</p>)}</div>
                        </div>
                }
            })()}
        </OverlayTrigger>
    </Col >
}

export function ParagraphComponentCreator(props) {
    const set = props.set
    const [original, setoriginal] = React.useState('')
    const [translated, settranslated] = React.useState('')
    const [style, setstyle] = React.useState({})

    return <div className='my-3'>
        <div className="mb-1">
            <div>styling</div>
            <Form.Check
                inline
                label="bold"
                name="bold"
                type={'checkbox'}
                onChange={(e) => setstyle(pre => ({ ...pre, fontStyle: e.target.checked ? 'italic' : undefined }))}
            />
            <Form.Check
                inline
                label="italic"
                name="italic"
                onChange={(e) => setstyle(pre => ({ ...pre, fontStyle: e.target.checked ? 'italic' : undefined }))}
                type={'checkbox'}
            />
        </div>
        <div className="mb-3">
            <Form.Control
                as="textarea"
                style={style}
                onChange={(e) => {
                    setoriginal(e.target.value)
                    set(paragraphObject(e.target.value, translated, style))
                }}
            />
        </div>
        <div className="mb-3">
            <Form.Control
                as="textarea"
                style={style}
                onChange={(e) => {
                    settranslated(e.target.value)
                    set(paragraphObject(original, e.target.value, style))
                }}
            />
        </div>

    </div>
}

export function ParagraphComponentEditor(props) {
    const component = props.component
    const originalDir = props.originalDir
    const translatedDir = props.translatedDir
    const dispatch = props.dispatch
    const [original, setoriginal] = React.useState(component.original)
    const [translated, settranslated] = React.useState(component.translated)
    const [style, setstyle] = React.useState({})

    return (

        <Col xs={12} className='mx-auto my-2'>
            <div className="mb-1">
                <div>styling</div>
                <Form.Check
                    inline
                    label="bold"
                    name="bold"
                    type={'checkbox'}
                    onChange={(e) => {
                        let newstyle = { ...style, fontWeight: e.target.checked ? 'bold' : undefined }
                        setstyle(newstyle)
                        dispatch(paragraphObject(original, translated, newstyle))
                    }}
                />
                <Form.Check
                    inline
                    label="italic"
                    name="italic"
                    onChange={(e) => {
                        let newstyle = { ...style, fontStyle: e.target.checked ? 'italic' : undefined }
                        setstyle(newstyle)
                        dispatch(paragraphObject(original, translated, newstyle))
                    }}
                    type={'checkbox'}
                />
            </div>
            <textarea
                style={{
                    backgroundColor: 'white',
                    borderWidth: 0,
                    width: 900, minHeight: 100,
                }}
                onChange={(e) => {
                    setoriginal(e.target.value)
                    dispatch(paragraphObject(e.target.value, translated, style))
                }}
                value={original ?? ''}
            />
            <textarea
                onChange={(e) => {
                    settranslated(e.target.value)
                    dispatch(paragraphObject(original, e.target.value, style))
                }}
                value={translated ?? ''}
                style={{ width: 900, minHeight: 100 }}
            />
        </Col >

    )
}