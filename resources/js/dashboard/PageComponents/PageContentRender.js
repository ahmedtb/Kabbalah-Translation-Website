import React from 'react'
import { ParagraphComponentRender, ParagraphComponentClass } from './ParagraphComponent'
import { HeaderComponentRender, HeaderComponentClass } from './HeaderComponent'
import { TitleComponentRender, TitleComponentClass } from './TitleComponent'
import { ImageComponentRender, ImageComponentClass } from './ImageComponent'
import { LinkComponentRender, LinkComponentClass } from './LinkComponent'

export default function PageContentRender(props) {
    const pageContent = props.pageContent

    return pageContent.pageComponents.map((pageComponent, index) => {
        if (pageComponent.class == ParagraphComponentClass) {
            return <ParagraphComponentRender key={index} component={pageComponent} />
        }else if (pageComponent.class == HeaderComponentClass) {
            return <HeaderComponentRender key={index} component={pageComponent} />
        }else if (pageComponent.class == TitleComponentClass) {
            return <TitleComponentRender key={index} component={pageComponent} />
        }else if (pageComponent.class == ImageComponentClass) {
            return <ImageComponentRender key={index} component={pageComponent} />
        }else if (pageComponent.class == LinkComponentClass) {
            return <LinkComponentRender key={index} component={pageComponent} />
        }
    })
}