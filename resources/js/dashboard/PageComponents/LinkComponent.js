import React from 'react'
import { AiOutlineOrderedList } from 'react-icons/ai'
import {
    FloatingLabel, 
    Form, 
    Popover, 
    OverlayTrigger
} from 'react-bootstrap'
export const LinkComponentClass = 'App\\PageComponents\\LinkComponent'

function linkObject(originalLink, originalLabel = null, translatedLink = null, translatedLabel = null) {

    return {
        class: LinkComponentClass,
        originalLink: originalLink,
        originalLabel: originalLabel,
        translatedLink: translatedLink,
        translatedLabel: translatedLabel
    }
}

export function LinkComponentInput(props) {
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

export function LinkComponentRender(props) {
    const component = props.component

    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">ترجمة</Popover.Header>
            <Popover.Body>
                {component.translatedLink}
            </Popover.Body>
        </Popover>
    );

    return <div >
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <div>{component.originalLink}</div>
        </OverlayTrigger>
    </div >
}

export function LinkComponentFormView(props) {
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



export function LinkComponentCreator(props) {
    const set = props.set
    const [original, setoriginal] = React.useState('')
    const [translated, settranslated] = React.useState(null)
    const [originalLabel, setoriginalLabel] = React.useState('')
    const [translatedLabel, settranslatedLabel] = React.useState('')

    return <div className='my-3'>
        <FloatingLabel label="الرابط الاصلي">
            <Form.Control
                as="textarea"
                style={{ height: '100px' }}
                onChange={(e) => {
                    setoriginal(e.target.value)
                    set(linkObject(e.target.value, originalLabel, translated, translatedLabel))
                }}
            />
        </FloatingLabel>
        <FloatingLabel label="نص الرابط الاصلي">
            <Form.Control
                as="input"
                type='text'
                value={originalLabel}
                style={{ height: '100px' }}
                onChange={(e) => {
                    setoriginalLabel(e.target.value)
                    set(linkObject(original, e.target.value, translated, translatedLabel))
                }}
            />
        </FloatingLabel>
        <FloatingLabel label="الرابط المترجم">
            <Form.Control
                as="textarea"
                style={{ height: '100px' }}
                onChange={(e) => {
                    settranslated(e.target.value)
                    set(linkObject(original, originalLabel, e.target.value, translatedLabel))
                }}
            />
        </FloatingLabel>
        <FloatingLabel label="نص الرابط مترجم">
            <Form.Control
                as="input"
                type='text'
                value={translatedLabel}
                style={{ height: '100px' }}
                onChange={(e) => {
                    settranslatedLabel(e.target.value)
                    set(linkObject(original, originalLabel, translated, e.target.value))
                }}
            />
        </FloatingLabel>
    </div>
}

export function LinkComponentEditor(props) {
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
                        class: LinkComponentClass, label: text, value: value
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
                        class: LinkComponentClass, label: label, value: value
                    })
                }}
                value={value}
            />

        </div>
    )
}