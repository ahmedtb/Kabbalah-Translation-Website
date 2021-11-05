import React from 'react'
import { AiOutlineOrderedList } from 'react-icons/ai'
import {
    FloatingLabel, Form, Popover, OverlayTrigger
} from 'react-bootstrap'
export const TitleComponentClass = 'App\\PageComponents\\TitleComponent'

function titleObject(original, translated = null) {

    return {
        class: TitleComponentClass,
        original: original,
        translated: translated,
    }
}

export function TitleComponentRender(props) {
    const component = props.component

    const popover = (
        <Popover id="popover-basic" style={{ maxWidth: 1000 }}>
            <Popover.Header as="h3">ترجمة</Popover.Header>
            <Popover.Body>
                {component.translated}
            </Popover.Body>
        </Popover>
    );

    return <div >
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <h1 className='text-center'>{component.original}</h1>
        </OverlayTrigger>
    </div >
}


export function TitleComponentCreator(props) {
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
                    set(titleObject(e.target.value, translated))
                }}
            />
        </FloatingLabel>
        <FloatingLabel label="النص المترجم">
            <Form.Control
                as="textarea"
                style={{ height: '100px' }}
                onChange={(e) => {
                    settranslated(e.target.value)
                    set(titleObject(original, e.target.value))
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
                    <Form.Control
                        as="input"
                        onChange={(e) => {
                            settranslated(e.target.value)
                            dispatch(titleObject(original, e.target.value))
                        }}
                        value={translated ?? ''}
                        style={{ width: 900 }}

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
            </OverlayTrigger>

        </div>
    )
}