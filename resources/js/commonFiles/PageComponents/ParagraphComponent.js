import React from 'react'
import {
    FloatingLabel, Form, Popover, OverlayTrigger, Col
} from 'react-bootstrap'
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
                <div dir={translatedDir}>{component.translated?.split('\n').map((str, index) => <p key={index}>{str}</p>)}</div>
            </Popover.Body>
        </Popover>
    );

    return <Col xs={12} className='mx-auto my-2'>
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover} >
            {(() => {
                switch (render) {
                    case 'original':
                        return <div dir={originalDir} style={component.style}>
                            {component.original?.split('\n').map((str, index) => <p key={index}>{str}</p>)}
                        </div>
                    case 'translated':
                        return <div dir={translatedDir} style={component.style}>
                            {component.translated?.split('\n').map((str, index) => <p key={index}>{str}</p>)}
                        </div>
                    case 'both':
                        return <div style={component.style}>
                            <div dir={originalDir}>{component.original?.split('\n').map((str, index) => <p key={index}>{str}</p>)}</div>
                            <div dir={translatedDir}>{component.translated?.split('\n').map((str, index) => <p key={index}>{str}</p>)}</div>
                        </div>
                }
            })()}
        </OverlayTrigger>
    </Col >
}

export function ParagraphComponentCreator(props) {
    const dispatch = props.dispatch
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
                checked={style.fontWeight == 'bold'}

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
                checked={style.fontStyle == 'italic'}
                type={'checkbox'}
            />
        </div>
        <div className="mb-3">
            <Form.Control
                as="textarea"
                style={style}
                onChange={(e) => {
                    setoriginal(e.target.value)
                    dispatch(paragraphObject(e.target.value, translated, style))
                }}
            />
        </div>
        <div className="mb-3">
            <Form.Control
                as="textarea"
                style={style}
                onChange={(e) => {
                    settranslated(e.target.value)
                    dispatch(paragraphObject(original, e.target.value, style))
                }}
            />
        </div>

    </div>
}


export function ParagraphComponentEditor(props) {
    const component = props.component
    const dispatch = props.dispatch
    const originalDir = props.originalDir
    const translatedDir = props.translatedDir
    const [original, setoriginal] = React.useState(component.original)
    const [translated, settranslated] = React.useState(component.translated)
    const [style, setstyle] = React.useState(component.style)

    const [translatedScrollHeight, settranslatedScrollHeight] = React.useState(100)
    const [originalScrollHeight, setoriginalScrollHeight] = React.useState(100)


    return (

        <Col xs={12} className='mx-auto my-2'>
            <div className="mb-1">
                <div>styling</div>
                <Form.Check
                    inline
                    label="bold"
                    name="bold"
                    type={'checkbox'}
                    checked={style.fontWeight == 'bold'}

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
                    checked={style.fontStyle == 'italic'}
                    type={'checkbox'}
                />
            </div>
            <textarea
                style={{
                    ...style,
                    backgroundColor: 'white',
                    borderWidth: 0,
                    width: '100%',
                    height: originalScrollHeight
                }}
                dir={originalDir}
                onChange={(e) => {
                    setoriginal(e.target.value)
                    setoriginalScrollHeight(e.target.scrollHeight)
                    dispatch(paragraphObject(e.target.value, translated, style))
                }}
                defaultValue={original ?? ''}
            />
            <textarea
                style={{
                    ...style, width: '100%',
                    height: translatedScrollHeight
                }}
                dir={translatedDir}
                onChange={(e) => {
                    settranslated(e.target.value)
                    settranslatedScrollHeight(e.target.scrollHeight)
                    dispatch(paragraphObject(original, e.target.value, style))
                }}
                defaultValue={translated ?? ''}
            />
        </Col >

    )
}

export function ParagraphComponentWebsiteRender(props) {
    const component = props.component
    const originalDir = props.originalDir
    const translatedDir = props.translatedDir

    return <Col xs={12} className='mx-auto my-2'>
        <div dir={translatedDir} style={component.style}>
            {component.translated?.split('\n').map((str, index) => <p key={index}>{str}</p>)}
        </div>
    </Col >
}
