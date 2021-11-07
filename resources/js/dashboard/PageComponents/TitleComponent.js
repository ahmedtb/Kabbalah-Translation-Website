import React from 'react'
import { AiOutlineOrderedList } from 'react-icons/ai'
import {
    FloatingLabel, Form, Popover, OverlayTrigger
} from 'react-bootstrap'
import { titleObject } from './structure'

export function TitleComponentRender(props) {
    const component = props.component
    const originalDir = props.originalDir
    const translatedDir = props.translatedDir
    const render = props.render

    const style = component.style

    const popover = (
        <Popover id="popover-basic" style={{ maxWidth: 1000 }}>
            <Popover.Header as="h3">ترجمة</Popover.Header>
            <Popover.Body>
                {component.translated}
            </Popover.Body>
        </Popover>
    );

    return <div >
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover} >
            {(() => {
                switch (render) {
                    case 'original':
                        return <h1 dir={originalDir} className='text-center'>{component.original}</h1>

                    case 'translated':
                        return <h1 dir={translatedDir} className='text-center'>{component.translated}</h1>

                    case 'both':
                        return <div style={style}>
                            <h1 dir={originalDir} className='text-center' >{component.original}</h1>
                            <h1 dir={translatedDir} className='text-center'>{component.translated}</h1>
                        </div>
                }
            })()}
        </OverlayTrigger>
    </div >
}


export function TitleComponentCreator(props) {
    const dispatch = props.dispatch
    const [original, setoriginal] = React.useState('')
    const [translated, settranslated] = React.useState('')

    return <div className='my-3'>
        <FloatingLabel label="النص الاصلي">
            <Form.Control
                as="textarea"
                style={{ height: '100px' }}
                onChange={(e) => {
                    setoriginal(e.target.value)
                    dispatch(titleObject(e.target.value, translated))
                }}
            />
        </FloatingLabel>
        <FloatingLabel label="النص المترجم">
            <Form.Control
                as="textarea"
                style={{ height: '100px' }}
                onChange={(e) => {
                    settranslated(e.target.value)
                    dispatch(titleObject(original, e.target.value))
                }}
            />
        </FloatingLabel>

    </div>
}

export function TitleComponentEditor(props) {
    const component = props.component
    const dispatch = props.dispatch
    const [original, setoriginal] = React.useState(component.original)
    const [translated, settranslated] = React.useState(component.translated)


    const popover = (
        <Popover id="popover-basic" >
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
                    textAlign: 'center',
                    borderWidth: 0,
                    width: '100%',
                    fontSize: 40,
                    fontWeight: 'bold'
                }}
                onChange={(e) => {
                    setoriginal(e.target.value)
                    dispatch(titleObject(e.target.value, translated))
                }}
                value={original}

            />
            <Form.Control
                as="input"
                onChange={(e) => {
                    settranslated(e.target.value)
                    dispatch(titleObject(original, e.target.value))
                }}
                value={translated ?? ''}
                style={{ width: 900 }}

            />
            {/* </OverlayTrigger> */}

        </div>
    )
}