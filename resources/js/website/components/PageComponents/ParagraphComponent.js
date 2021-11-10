import React from 'react'
import {
    FloatingLabel, Form, Popover, OverlayTrigger, Col
} from 'react-bootstrap'

import { paragraphObject } from './structure'


export default function ParagraphComponentRender(props) {
    const component = props.component
    const originalDir = props.originalDir
    const translatedDir = props.translatedDir

    return <Col xs={12} className='mx-auto my-2'>
        <div dir={translatedDir} style={component.style}>
            {component.translated?.split('\n').map((str, index) => <p key={index}>{str}</p>)}
        </div>
    </Col >
}
