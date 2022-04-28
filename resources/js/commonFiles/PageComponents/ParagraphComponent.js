import React from 'react'
import {
    Form
} from 'react-bootstrap'
import { paragraphObject } from './structure'


export function ParagraphComponentRender(props) {
    const component = props.component
    const originalDir = props.originalDir
    const translatedDir = props.translatedDir
    const render = props.render
    const className = props.className
    switch (render) {
        case 'original':
            return <div dir={originalDir} style={component.style} className={className}>
                {component.original?.split('\n').map((str, index) => <p key={index}>{str}</p>)}
            </div>
        case 'translated':
            return <div dir={translatedDir} style={component.style} className={className}>
                {component.translated?.split('\n').map((str, index) => <p key={index}>{str}</p>)}
            </div>
        case 'both':
            return <div style={component.style} className={className}>
                <div dir={originalDir}>{component.original?.split('\n').map((str, index) => <p key={index}>{str}</p>)}</div>
                <div dir={translatedDir}>{component.translated?.split('\n').map((str, index) => <p key={index}>{str}</p>)}</div>
            </div>
    }
}


export function ParagraphComponentWebsiteRender(props) {
    const component = props.component
    const originalDir = props.originalDir
    const translatedDir = props.translatedDir
    const render = props.render
    const className = props.className

    // console.log('className', className)

    switch (render) {
        case 'original':
            return <div dir={originalDir} style={component.style} className={className}>
                {component.original?.split('\n').map((str, index) => <p key={index}>{str}</p>)}
            </div>
        case 'translated':
            return <div className='mx-auto'>
                {
                    component.translated ?
                        <div dir={translatedDir} style={component.style} className={className}>
                            {component.translated?.split('\n').map((str, index) => <p key={index}>{str}</p>)}
                        </div>
                        :
                        <div className={`d-flex justify-content-between ${className}`} >
                            <div className='flex-grow-1' dir={originalDir} style={component.style}>
                                {component.original?.split('\n').map((str, index) => <p key={index}>{str}</p>)}
                            </div>
                            <div className='opacity-25'>غير مترجم</div>
                        </div>
                }
            </div >
        case 'both':
            return <div style={component.style} className={className}>
                <div dir={originalDir}>{component.original?.split('\n').map((str, index) => <p key={index}>{str}</p>)}</div>
                <div dir={translatedDir}>{component.translated?.split('\n').map((str, index) => <p key={index}>{str}</p>)}</div>
            </div>
    }
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
            <Form.Check
                inline
                label="توسيط النص"
                name="center"
                onChange={(e) => {
                    let newstyle = { ...style, textAlign: e.target.checked ? 'center' : undefined }
                    setstyle(newstyle)
                    dispatch(paragraphObject(original, translated, newstyle))
                }}
                checked={style.textAlign == 'center'}
                type={'checkbox'}
            />
        </div>
        <div className="mb-3">

            <div
                className='p-3 border rounded'
                style={style}
                contentEditable
                onInput={e => {
                    console.log('onInput textContent', e.target.textContent);
                    setoriginal(e.target.textContent)
                    dispatch(paragraphObject(e.target.textContent, translated, style))
                }}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {

                    }
                }}
            >

            </div>
        </div>
        <div className="mb-3">
            <div
                className='p-3 border rounded'
                style={style}
                contentEditable
                onInput={e => {
                    console.log('onInput textContent', e.target.textContent);
                    settranslated(e.target.value)
                    dispatch(paragraphObject(original, e.target.value, style))
                }}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {

                    }
                }}
            ></div>
        </div>

    </div>
}

export function ParagraphsComponentCreator(props) {
    const dispatch = props.dispatch
    // const [paragraphs, setparagraphs] = React.useState([])
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
                }}
            />
            <Form.Check
                inline
                label="italic"
                name="italic"
                onChange={(e) => {
                    let newstyle = { ...style, fontStyle: e.target.checked ? 'italic' : undefined }
                    setstyle(newstyle)
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
                    let paragraphs = []
                    e.target.value.split('\n').forEach((str, index) => {
                        if (str.length)
                            paragraphs.push(paragraphObject(str, '', style))

                    })
                    // console.log('paragraphs', paragraphs)
                    // setparagraphs(paragraphs)
                    dispatch(paragraphs)

                }}
            />
        </div>
    </div >
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

        <div className='my-2'>
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
                <Form.Check
                    inline
                    label="توسيط النص"
                    name="center"
                    onChange={(e) => {
                        let newstyle = { ...style, textAlign: e.target.checked ? 'center' : undefined }
                        setstyle(newstyle)
                        dispatch(paragraphObject(original, translated, newstyle))
                    }}
                    checked={style.textAlign == 'center'}
                    type={'checkbox'}
                />
            </div>
            <textarea
                style={{
                    ...style,
                    backgrounddivor: 'white',
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
                value={original ?? ''}
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
                value={translated ?? ''}
            />
        </div >

    )
}

