import React from 'react'
import { ParagraphComponentRender, ParagraphComponentClass } from './ParagraphComponent'

export default function PageContentRender(props) {
    const pageContent = props.pageContent

    return pageContent.pageComponents.map((pageComponent, index) => {
        if (pageComponent.class == ParagraphComponentClass) {
            return <ParagraphComponentRender key={index} component={pageComponent} />
        }
    })
}