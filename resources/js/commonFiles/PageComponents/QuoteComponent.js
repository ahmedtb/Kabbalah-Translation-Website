import React from 'react'
import { AiOutlineOrderedList } from 'react-icons/ai'
import {
    FloatingLabel,
    Form,
    Popover,
    OverlayTrigger
} from 'react-bootstrap'
import { quoteObject } from './structure'
import { textNewLines } from '../helpers'
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
                <div dir={originalDir} >{textNewLines(originalQuote)}</div>
                <div dir={originalDir} style={{ textAlign: originalDir == 'rtl' ? 'left' : 'right' }}>{textNewLines(originalLabel)}</div>
            </div >
        case 'translated':
            return <div style={{ ...style, padding: '10px 50px 10px 50px' }}>
                <div dir={translatedDir} >{textNewLines(translatedQuote)}</div>

                <div dir={translatedDir} style={{ textAlign: translatedDir == 'rtl' ? 'left' : 'right' }} >{translatedLabel?.length ? textNewLines(translatedLabel) : textNewLines(originalLabel)}</div>

            </div >
        case 'both':
            return <div style={{ ...style, padding: '10px 50px 10px 50px' }}>
                <div dir={originalDir}>{textNewLines(originalQuote)}</div>
                <div dir={originalDir} style={{ textAlign: originalDir == 'rtl' ? 'left' : 'right' }} >{textNewLines(originalLabel)}</div>
                <div dir={translatedDir}>{textNewLines(translatedQuote)}</div>
                {translatedQuote ? <div dir={translatedDir} style={{ textAlign: translatedDir == 'rtl' ? 'left' : 'right' }} >{translatedLabel?.length ? textNewLines(translatedLabel) : textNewLines(originalLabel)}</div> : null}


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
            <div dir={originalDir} >{textNewLines(originalQuote)}</div>
            <div dir={originalDir == 'rtl' ? 'ltr' : 'rtl'} >{textNewLines(originalLabel)}</div>
        </div >
    else if (translatedQuote)
        return <div >
            <div dir={translatedDir} >{translatedQuote}</div>

            <div dir={translatedDir} style={{ textAlign: translatedDir == 'rtl' ? 'left' : 'right' }} >{translatedLabel?.length ? textNewLines(translatedLabel) : textNewLines(originalLabel)}</div>

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
                as="textarea"
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
                as="textarea"
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
    const originalDir = props.originalDir
    const translatedDir = props.translatedDir
    const [originalQuote, setoriginalQuote] = React.useState(component.originalQuote)
    const [originalLabel, setoriginalLabel] = React.useState(component.originalLabel)
    const [translatedQuote, settranslatedQuote] = React.useState(component.translatedQuote)
    const [translatedLabel, settranslatedLabel] = React.useState(component.translatedLabel)

    const [translatedScrollHeight, settranslatedScrollHeight] = React.useState(100)
    const [originalScrollHeight, setoriginalScrollHeight] = React.useState(100)

    return <div>
        <div>
            <div>الاقتباس الاصلي</div>
            <Form.Control
                as="textarea"
                value={originalQuote ?? ''}
                style={{ height: originalScrollHeight }}

                dir={originalDir}
                onChange={(e) => {
                    setoriginalQuote(e.target.value)
                    setoriginalScrollHeight(e.target.scrollHeight)

                    dispatch(quoteObject(e.target.value, originalLabel, translatedQuote, translatedLabel))
                }}
            />
            <div>النص الاصلي</div>
            <Form.Control
                as="textarea"
                dir={originalDir}

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
                dir={translatedDir}

                style={{ height: translatedScrollHeight }}
                onChange={(e) => {
                    settranslatedQuote(e.target.value)
                    settranslatedScrollHeight(e.target.scrollHeight)

                    dispatch(quoteObject(originalQuote, originalLabel, e.target.value, translatedLabel))
                }}
            />
            <div>النص المترجم</div>
            <Form.Control
                as="textarea"
                dir={translatedDir}

                value={translatedLabel ?? ''}
                onChange={(e) => {
                    settranslatedLabel(e.target.value)
                    dispatch(quoteObject(originalQuote, originalLabel, translatedQuote, e.target.value))
                }}
            />
        </div>
    </div >

}


