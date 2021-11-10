import React from 'react'
import { AiOutlineOrderedList } from 'react-icons/ai'
import {
    FloatingLabel, Form, Popover, OverlayTrigger, Col
} from 'react-bootstrap'
import { convertFileToBase64 } from '../utility/helpers.js'
import ImagePicker from '../components/ImagePicker'
import { imageObject } from './structure.js'

export default function ImageComponentRender(props) {
    const component = props.component

    return <Col xs={10} className='mx-auto'>
        <img src={component.original} width='100%' />
    </Col >
}
