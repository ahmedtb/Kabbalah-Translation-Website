import React from 'react'
import { AiOutlineOrderedList } from 'react-icons/ai'
import {
    FloatingLabel, Form, Popover, OverlayTrigger
} from 'react-bootstrap'
import { seperatorObject } from './structure'

export function SeperatorComponentRender(props) {
    const component = props.component
    const originalDir = props.originalDir
    const translatedDir = props.translatedDir
    const render = props.render

    const style = component.style


    return  <hr style={style}/>
}


export function SeperatorComponentCreator(props) {
    const dispatch = props.dispatch
    const [original, setoriginal] = React.useState('')
    const [translated, settranslated] = React.useState('')

    React.useEffect(() => {
        dispatch(seperatorObject([]))
    }, [])

    return <hr/>
}

export function SeperatorComponentEditor(props) {
    const component = props.component
    const dispatch = props.dispatch
    
    return <hr style={component.style} />

}

export function SeperatorComponentWebsiteRender(props) {
    const component = props.component
    const originalDir = props.originalDir
    const translatedDir = props.translatedDir
    const render = props.render

    const style = component.style

    return <hr style={style} />
}
