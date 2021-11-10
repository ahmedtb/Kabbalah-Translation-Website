import React from 'react'
import {
    FloatingLabel, Form, Popover, OverlayTrigger, Col
} from 'react-bootstrap'

export default function HeaderComponentRender(props) {
    const component = props.component
    const originalDir = props.originalDir
    const translatedDir = props.translatedDir

    const original = component.original
    const translated = component.translated
    const size = component.size


    return <Col xs={12} className='mx-2'>
        <div dir={translatedDir} className='text-center'>
            {(() => {
                switch (size) {
                    case 1:
                        return <h1>{translated}</h1>
                    case 2:
                        return <h2>{translated}</h2>
                    case 3:
                        return <h3>{translated}</h3>
                    case 4:
                        return <h4>{translated}</h4>
                    case 5:
                        return <h5>{translated}</h5>
                    default:
                        return <h1>{translated}</h1>
                }
            })()}
        </div>
    </Col >
}

