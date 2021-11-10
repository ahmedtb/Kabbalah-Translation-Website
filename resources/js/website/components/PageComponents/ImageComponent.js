import React from 'react'
import {
    FloatingLabel, Form, Popover, OverlayTrigger, Col
} from 'react-bootstrap'

export default function ImageComponentRender(props) {
    const component = props.component

    return <Col xs={10} className='mx-auto'>
        <img src={component.original} width='100%' />
    </Col >
}
