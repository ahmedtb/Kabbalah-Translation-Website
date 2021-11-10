import React from 'react'
import { AiOutlineOrderedList } from 'react-icons/ai'
import {
    FloatingLabel, Form, Popover, OverlayTrigger
} from 'react-bootstrap'
import { titleObject } from './structure'

export default function TitleComponentRender(props) {
    const component = props.component
    const originalDir = props.originalDir
    const translatedDir = props.translatedDir
    const render = props.render

    const style = component.style

    return <div >
        <h1 dir={translatedDir} className='text-center'>{component.translated}</h1>
    </div >
}
