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

export function HeaderComponentInput(props) {
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

export function HeaderComponentRender(props) {
    const component = props.component
    const popover = (
        <Popover id="popover-basic">
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

export function HeaderComponentFormdiv(props) {
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
    const [label, setlabel] = React.useState(component.label)
    const [value, setvalue] = React.useState(component.value)

    return (
        <div style={{ marginVertical: 15 }}>

            <div style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <strong>حقل نصي</strong>
            </div>

            <input style={{ fontSize: 12, borderWidth: 1, borderColor: '#dec9c8', borderRadius: 10 }}
                onChangeText={(text) => {
                    setlabel(text)
                    dispatch({
                        class: HeaderComponentClass, label: text, value: value
                    })
                }}
                value={label}
            />
            <input
                type='textarea'
                style={{ borderWidth: 1, borderColor: '#dec9c8', borderRadius: 10, marginVertical: 5 }}
                onChangeText={(text) => {
                    setvalue(text)
                    dispatch({
                        class: HeaderComponentClass, label: label, value: value
                    })
                }}
                value={value}
            />

        </div>
    )
}