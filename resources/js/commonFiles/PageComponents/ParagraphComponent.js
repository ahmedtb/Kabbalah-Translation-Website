import React from 'react'
import {
    Form,
    Button
} from 'react-bootstrap';
import { paragraphObject } from './structure'
import parse from 'html-react-parser'
import { BsTypeBold, BsTypeH2, BsTypeH1 } from 'react-icons/bs'

export function ParagraphComponentRender(props) {
    const component = props.component
    const originalDir = props.originalDir
    const translatedDir = props.translatedDir
    const render = props.render
    const className = props.className
    switch (render) {
        case 'original':
            return <div dir={originalDir} style={component.style} className={className + ' my-2'}>
                {component.original?.split('\n').map((str, index) => <div key={index}>{parse(str ?? '')}</div>)}
            </div>
        case 'translated':
            return <div dir={translatedDir} style={component.style} className={className + ' my-2'}>
                {component.translated?.split('\n').map((str, index) => <div key={index}>{parse(str ?? '')}</div>)}
            </div>
        case 'both':
            return <div style={component.style} className={className + ' my-2'}>
                <div dir={originalDir}>{component.original?.split('\n').map((str, index) => <div key={index}>{parse(str ?? '')}</div>)}</div>
                <div dir={translatedDir}>{component.translated?.split('\n').map((str, index) => <div key={index}>{parse(str ?? '')}</div>)}</div>
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
            return <div dir={originalDir} style={component.style} className={className + ' my-2'}>
                {component.original?.split('\n').map((str, index) => <div key={index}>{parse(str ?? '')}</div>)}
            </div>
        case 'translated':
            return <div className='mx-auto my-2'>
                {
                    component.translated ?
                        <div dir={translatedDir} style={component.style} className={className}>
                            {component.translated?.split('\n').map((str, index) => <div key={index}>{parse(str ?? '')}</div>)}
                        </div>
                        :
                        <div className={`d-flex justify-content-between ${className}`} >
                            <div className='flex-grow-1' dir={originalDir} style={component.style}>
                                {component.original?.split('\n').map((str, index) => <div key={index}>{parse(str ?? '')}</div>)}
                            </div>
                            <div className='opacity-25'>غير مترجم</div>
                        </div>
                }
            </div >
        case 'both':
            return <div style={component.style} className={className + ' my-2'}>
                <div dir={originalDir}>{component.original?.split('\n').map((str, index) => <div key={index}>{parse(str ?? '')}</div>)}</div>
                <div dir={translatedDir}>{component.translated?.split('\n').map((str, index) => <div key={index}>{parse(str ?? '')}</div>)}</div>
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
            <Button variant="outline-secondary mx-1" onClick={() => {
                document.execCommand('bold', false);
            }}>
                <BsTypeBold size={25} />
            </Button>
            <Button variant="outline-secondary mx-1" onClick={() => {
                document.execCommand('fontSize', false, '5');
            }}>
                <BsTypeH2 size={25} />
            </Button>
            <Button variant="outline-secondary mx-1" onClick={() => {
                document.execCommand('fontSize', false, '7');
            }}>
                <BsTypeH1 size={25} />
            </Button>
        </div>
        <div className="mb-3">

            <div
                className='p-3 border rounded'
                style={style}
                contentEditable
                onInput={e => {
                    // console.log('onInput innerHTML', e.target.innerHTML);
                    setoriginal(e.target.innerHTML)
                    dispatch(paragraphObject(e.target.innerHTML, translated, style))
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
                    console.log('onInput textContent', e.target.innerHTML);
                    settranslated(e.target.innerHTML)
                    dispatch(paragraphObject(original, e.target.innerHTML, style))
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

    let originalDiv = React.createRef();
    let translatedDiv = React.createRef();

    React.useEffect(() => {
        originalDiv.current.innerHTML = component.original
        translatedDiv.current.innerHTML = component.translated

    }, [])

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

                <Button onClick={() => {
                    document.execCommand('bold', false);
                }}>
                    bold
                </Button>

                <Button onClick={() => {
                    document.execCommand('fontSize', false, '5');
                }}>
                    H1
                </Button>
                <Button onClick={() => {
                    document.execCommand('fontSize', false, '7');
                }}>
                    H2
                </Button>
            </div>
            <div
                className='p-3 border rounded'
                style={{
                    ...style,
                    height: originalScrollHeight,
                    overflowY: 'scroll'
                }}
                dir={originalDir}

                contentEditable
                onInput={e => {
                    // console.log('onInput innerHTML', e.target.innerHTML);
                    setoriginal(e.target.innerHTML)
                    setoriginalScrollHeight(e.target.scrollHeight)
                    dispatch(paragraphObject(e.target.innerHTML, translated, style))
                }}
                ref={originalDiv}
            />

            <div
                className='p-3 border rounded'
                style={{
                    ...style,
                    height: translatedScrollHeight,
                    overflowY: 'scroll'
                }}
                dir={translatedDir}

                contentEditable
                onInput={e => {
                    // console.log('onInput innerHTML', e.target.innerHTML);
                    settranslated(e.target.innerHTML)
                    settranslatedScrollHeight(e.target.scrollHeight)
                    dispatch(paragraphObject(original, e.target.innerHTML, style))
                }}

                ref={translatedDiv}

            />
        </div >


    )
}

