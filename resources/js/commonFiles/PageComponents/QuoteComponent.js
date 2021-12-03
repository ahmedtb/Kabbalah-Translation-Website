import React from 'react'
import { AiOutlineOrderedList } from 'react-icons/ai'
import {
    FloatingLabel,
    Form,
    Popover,
    OverlayTrigger
} from 'react-bootstrap'
import { quoteObject } from './structure'

export function QuoteComponentRender(props) {
    const component = props.component
    const originalDir = props.originalDir
    const translatedDir = props.translatedDir
    const render = props.render

    const originalQuote = component.originalQuote
    const originalLabel = component.originalLabel
    const translatedQuote = component.translatedQuote
    const translatedLabel = component.translatedLabel
    const style = component.style

    switch (render) {
        case 'original':
            return <div style={{ ...style, padding: '10px 50px 10px 50px' }} >
                <div dir={originalDir} >{originalQuote}</div>
                <div dir={originalDir} style={{textAlign: originalDir == 'rtl' ? 'left' : 'right'}}>{originalLabel}</div>
            </div >
        case 'translated':
            return <div style={{ ...style, padding: '10px 50px 10px 50px' }}>
                <div dir={translatedDir} >{translatedQuote}</div>
                <div dir={translatedDir} style={{textAlign: translatedDir == 'rtl' ? 'left' : 'right'}} >{translatedLabel}</div>
            </div >
        case 'both':
            return <div style={{ ...style, padding: '10px 50px 10px 50px' }}>
                <div dir={originalDir}>{originalQuote}</div>
                <div dir={originalDir} style={{textAlign: originalDir == 'rtl' ? 'left' : 'right'}} >{originalLabel}</div>
                <div dir={translatedDir}>{translatedQuote}</div>
                <div dir={translatedDir} style={{textAlign: translatedDir == 'rtl' ? 'left' : 'right'}} >{translatedLabel}</div>
            </div>
    }
}
export function QuoteComponentWebsiteRender(props) {
    const component = props.component
    const originalDir = props.originalDir
    const translatedDir = props.translatedDir

    const originalQuote = component.originalQuote
    const originalLabel = component.originalLabel
    const translatedQuote = component.translatedQuote
    const translatedLabel = component.translatedLabel

    if (originalQuote)
        return <div >
            <div dir={originalDir} >{originalQuote}</div>
            <div dir={originalDir == 'rtl' ? 'ltr' : 'rtl'} >{originalLabel}</div>
        </div >
    else if (translatedQuote)
        return <div >
            <div dir={translatedDir} >{translatedQuote}</div>
            <div dir={translatedDir == 'rtl' ? 'ltr' : 'rtl'} >{translatedLabel}</div>
        </div >
    else return null

}

export function QuoteComponentCreator(props) {
    const dispatch = props.dispatch
    const [originalQuote, setoriginalQuote] = React.useState('')
    const [originalLabel, setoriginalLabel] = React.useState('')
    const [translatedQuote, settranslatedQuote] = React.useState(null)
    const [translatedLabel, settranslatedLabel] = React.useState('')

    return <div className='my-3'>
        <FloatingLabel label="الاقتباس الاصلي">
            <Form.Control
                as="textarea"
                style={{ height: '100px' }}
                onChange={(e) => {
                    setoriginalQuote(e.target.value)
                    dispatch(quoteObject(e.target.value, originalLabel, translatedQuote, translatedLabel))
                }}
            />
        </FloatingLabel>
        <FloatingLabel label="عنوان الاقتباس الاصلي">
            <Form.Control
                as="input"
                type='text'
                value={originalLabel}
                style={{ height: '100px' }}
                onChange={(e) => {
                    setoriginalLabel(e.target.value)
                    dispatch(quoteObject(originalQuote, e.target.value, translatedQuote, translatedLabel))
                }}
            />
        </FloatingLabel>
        <FloatingLabel label="الاقتباس المترجم">
            <Form.Control
                as="textarea"
                style={{ height: '100px' }}
                onChange={(e) => {
                    settranslatedQuote(e.target.value)
                    dispatch(quoteObject(originalQuote, originalLabel, e.target.value, translatedLabel))
                }}
            />
        </FloatingLabel>
        <FloatingLabel label="عنوان الاقتباس مترجم">
            <Form.Control
                as="input"
                type='text'
                value={translatedLabel}
                style={{ height: '100px' }}
                onChange={(e) => {
                    settranslatedLabel(e.target.value)
                    dispatch(quoteObject(originalQuote, originalLabel, translatedQuote, e.target.value))
                }}
            />
        </FloatingLabel>
    </div>
}

export function QuoteComponentEditor(props) {
    const component = props.component
    const dispatch = props.dispatch
    const [originalQuote, setoriginalQuote] = React.useState(component.originalQuote)
    const [originalLabel, setoriginalLabel] = React.useState(component.originalLabel)
    const [translatedQuote, settranslatedQuote] = React.useState(component.translatedQuote)
    const [translatedLabel, settranslatedLabel] = React.useState(component.translatedLabel)


    return <div>
        <div>
            <div>الاقتباس الاصلي</div>
            <Form.Control
                as="textarea"
                value={originalQuote ?? ''}
                onChange={(e) => {
                    setoriginalQuote(e.target.value)
                    dispatch(quoteObject(e.target.value, originalLabel, translatedQuote, translatedLabel))
                }}
            />
            <div>النص الاصلي</div>
            <Form.Control
                as="textarea"
                value={originalLabel ?? ''}
                onChange={(e) => {
                    setoriginalLabel(e.target.value)
                    dispatch(quoteObject(originalQuote, e.target.value, translatedQuote, translatedLabel))
                }}
            />
            <div>الاقتباس المترجم</div>
            <Form.Control
                as="textarea"
                value={translatedQuote ?? ''}
                onChange={(e) => {
                    settranslatedQuote(e.target.value)
                    dispatch(quoteObject(originalQuote, originalLabel, e.target.value, translatedLabel))
                }}
            />
            <div>النص المترجم</div>
            <Form.Control
                as="textarea"
                value={translatedLabel ?? ''}
                onChange={(e) => {
                    settranslatedLabel(e.target.value)
                    dispatch(quoteObject(originalQuote, originalLabel, translatedQuote, e.target.value))
                }}
            />
        </div>
    </div >

}


