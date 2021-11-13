import React from 'react'
import { AiOutlineOrderedList } from 'react-icons/ai'
import {
    FloatingLabel,
    Form,
    Popover,
    OverlayTrigger
} from 'react-bootstrap'
import { linkObject } from './structure'

export function LinkComponentRender(props) {
    const component = props.component
    const originalDir = props.originalDir
    const translatedDir = props.translatedDir

    const originalLink = component.originalLink
    const originalLabel = component.originalLabel
    const translatedLink = component.translatedLink
    const translatedLabel = component.translatedLabel

    const popover = (
        <Popover id="popover-basic" style={{ maxWidth: 1000 }}>
            <Popover.Header as="h3">ترجمة</Popover.Header>
            <Popover.Body>
                <div>
                    <p>الرابط الاصلي: {originalLink}</p>
                    <p>الرابط المترجم: {translatedLink}</p>
                    <p>النص المترجم: {translatedLabel}</p>
                </div>
            </Popover.Body>
        </Popover>
    );

    return <div >
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <div href='#' dir={'ltr'} ><u>{originalLabel}</u></div>
        </OverlayTrigger>
    </div >
}

export function LinkComponentCreator(props) {
    const dispatch = props.dispatch
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
                    dispatch(linkObject(e.target.value, originalLabel, translated, translatedLabel))
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
                    dispatch(linkObject(original, e.target.value, translated, translatedLabel))
                }}
            />
        </FloatingLabel>
        <FloatingLabel label="الرابط المترجم">
            <Form.Control
                as="textarea"
                style={{ height: '100px' }}
                onChange={(e) => {
                    settranslated(e.target.value)
                    dispatch(linkObject(original, originalLabel, e.target.value, translatedLabel))
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
                    dispatch(linkObject(original, originalLabel, translated, e.target.value))
                }}
            />
        </FloatingLabel>
    </div>
}

export function LinkComponentEditor(props) {
    const component = props.component
    const dispatch = props.dispatch
    const [originalLink, setoriginalLink] = React.useState(component.originalLink)
    const [originalLabel, setoriginalLabel] = React.useState(component.originalLabel)
    const [translatedLink, settranslatedLink] = React.useState(component.translatedLink)
    const [translatedLabel, settranslatedLabel] = React.useState(component.translatedLabel)


    return <div>
        <div>
            <div>الرابط الاصلي</div>
            <Form.Control
                as="input"
                defaultValue={originalLink}
                onChange={(e) => {
                    setoriginalLink(e.target.value)
                    dispatch(linkObject(e.target.value, originalLabel, translatedLink, translatedLabel))
                }}
            />
            <div>النص الاصلي</div>
            <Form.Control
                as="input"
                defaultValue={originalLabel}
                onChange={(e) => {
                    setoriginalLabel(e.target.value)
                    dispatch(linkObject(originalLink, e.target.value, translatedLink, translatedLabel))
                }}
            />
            <div>الرابط المترجم</div>
            <Form.Control
                as="input"
                defaultValue={translatedLink}
                onChange={(e) => {
                    settranslatedLink(e.target.value)
                    dispatch(linkObject(originalLink, originalLabel, e.target.value, translatedLabel))
                }}
            />
            <div>النص المترجم</div>
            <Form.Control
                as="input"
                defaultValue={translatedLabel}
                onChange={(e) => {
                    settranslatedLabel(e.target.value)
                    dispatch(linkObject(originalLink, originalLabel, translatedLink, e.target.value))
                }}
            />
        </div>
    </div >

}

export function LinkComponentWebsiteRender(props) {
    const component = props.component
    const originalDir = props.originalDir
    const translatedDir = props.translatedDir

    const originalLink = component.originalLink
    const originalLabel = component.originalLabel
    const translatedLink = component.translatedLink
    const translatedLabel = component.translatedLabel

    return <a href={translatedLink} dir={translatedDir}>{translatedLabel}</a>
}
