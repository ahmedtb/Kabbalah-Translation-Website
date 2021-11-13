import React from 'react'
import YoutubeEmbed from '../YoutubeEmbed'
import {
    FloatingLabel, Form, OverlayTrigger
} from 'react-bootstrap'
import { youtubeEmbedObject } from './structure'

export function YoutubeEmbedComponentRender(props) {
    const component = props.component
    const originalDir = props.originalDir
    const translatedDir = props.translatedDir
    const render = props.render

    const style = component.style

    return <div className='border rounded flex-grow-1' >
        <h4>youtube embed</h4>
        <div className='d-flex flex-row justify-content-around'>
            <div className='border rounded'>{component.translated}</div>
            <div className='border rounded'>{component.original}</div>
        </div>
    </div >
}


export function YoutubeEmbedComponentCreator(props) {
    const dispatch = props.dispatch
    const [original, setoriginal] = React.useState('')
    const [translated, settranslated] = React.useState('')

    return <div className='my-3'>
        <FloatingLabel label="original embedId">
            <Form.Control
                as="input"
                min={11}
                max={11}
                style={{ height: '100px' }}
                onChange={(e) => {
                    setoriginal(e.target.value)
                    console.log(e.target.value.length)
                    dispatch(youtubeEmbedObject(e.target.value, translated))
                }}
            />
        </FloatingLabel>
        <FloatingLabel label="translated embedId">
            <Form.Control
                as="input"
                min={11}
                max={11}
                style={{ height: '100px' }}
                onChange={(e) => {
                    settranslated(e.target.value)
                    dispatch(youtubeEmbedObject(original, e.target.value))
                }}
            />
        </FloatingLabel>

    </div>
}

export function YoutubeEmbedComponentEditor(props) {
    const component = props.component
    const dispatch = props.dispatch
    const [original, setoriginal] = React.useState(component.original)
    const [translated, settranslated] = React.useState(component.translated)

    return (
        <div className='my-3'>

            <input
                style={{
                    backgroundColor: 'white',
                    textAlign: 'center',
                    borderWidth: 0,
                    width: '100%',
                    fontSize: 40,
                    fontWeight: 'bold'
                }}
                min={11}
                max={11}
                onChange={(e) => {
                    setoriginal(e.target.value)
                    dispatch(youtubeEmbedObject(e.target.value, translated))
                }}
                value={original}

            />
            <Form.Control
                as="input"
                min={11}
                max={11}
                onChange={(e) => {
                    settranslated(e.target.value)
                    dispatch(youtubeEmbedObject(original, e.target.value))
                }}
                value={translated ?? ''}
                style={{ width: 900 }}

            />

        </div>
    )
}

export function YoutubeEmbedComponentWebsiteRender(props) {
    const component = props.component

    return <YoutubeEmbed embedId={component.translated} />
}
