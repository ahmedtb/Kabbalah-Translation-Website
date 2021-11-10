import React from 'react'
import { AiOutlineOrderedList } from 'react-icons/ai'
import {
    FloatingLabel,
    Form,
    Popover,
    OverlayTrigger
} from 'react-bootstrap'
import { linkObject } from './structure'

export default function LinkComponentRender(props) {
    const component = props.component
    const originalDir = props.originalDir
    const translatedDir = props.translatedDir

    const originalLink = component.originalLink
    const originalLabel = component.originalLabel
    const translatedLink = component.translatedLink
    const translatedLabel = component.translatedLabel

    return <div >
            <div href='#' dir={'ltr'} ><u>{originalLabel}</u></div>
    </div >
}
