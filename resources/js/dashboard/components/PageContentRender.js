import React from 'react'
import { ParagraphComponentRender } from '../../commonFiles/PageComponents/ParagraphComponent'
import { HeaderComponentRender } from '../../commonFiles/PageComponents/HeaderComponent'
import { TitleComponentRender } from '../../commonFiles/PageComponents/TitleComponent'
import { ImageComponentRender, } from '../../commonFiles/PageComponents/ImageComponent'
import { LinkComponentRender } from '../../commonFiles/PageComponents/LinkComponent'
import { YoutubeEmbedComponentRender } from '../../commonFiles/PageComponents/YoutubeEmbedComponent'
import { SeperatorComponentRender } from '../../commonFiles/PageComponents/SeperatorComponent'

import { 
    ParagraphComponentClass, 
    HeaderComponentClass, 
    TitleComponentClass, 
    ImageComponentClass, 
    LinkComponentClass,
    YoutubeEmbedComponentClass,
    SeperatorComponentClass
} from '../../commonFiles/PageComponents/structure'

import { Col } from 'react-bootstrap'

export default function PageContentRender(props) {
    const pageContent = props.pageContent
    const render = props.render


    React.useEffect(() => {
        console.log('PageContentRender', pageContent)
    }, [])
    return <Col xs={12} className='bg-white'>
        <Col xs={10} className='mx-auto'>
            {
                pageContent?.pageComponents.map((pageComponent, index) => {
                    if (pageComponent.class == ParagraphComponentClass) {
                        return <ParagraphComponentRender
                            key={index}
                            originalDir={pageContent.originalDir}
                            translatedDir={pageContent.translatedDir}
                            render={render}
                            component={pageComponent}
                        />
                    } else if (pageComponent.class == HeaderComponentClass) {
                        return <HeaderComponentRender
                            key={index}
                            originalDir={pageContent.originalDir}
                            translatedDir={pageContent.translatedDir}
                            render={render}
                            component={pageComponent}
                        />
                    } else if (pageComponent.class == TitleComponentClass) {
                        return <TitleComponentRender
                            key={index}
                            originalDir={pageContent.originalDir}
                            translatedDir={pageContent.translatedDir}
                            render={render}
                            component={pageComponent}
                        />
                    } else if (pageComponent.class == ImageComponentClass) {
                        return <ImageComponentRender
                            key={index}
                            originalDir={pageContent.originalDir}
                            translatedDir={pageContent.translatedDir}
                            render={render}
                            component={pageComponent}
                        />
                    } else if (pageComponent.class == LinkComponentClass) {
                        return <LinkComponentRender
                            key={index}
                            originalDir={pageContent.originalDir}
                            translatedDir={pageContent.translatedDir}
                            render={render}
                            component={pageComponent}
                        />
                    } else if (pageComponent.class == YoutubeEmbedComponentClass) {
                        return <YoutubeEmbedComponentRender
                            key={index}
                            originalDir={pageContent.originalDir}
                            translatedDir={pageContent.translatedDir}
                            render={render}
                            component={pageComponent}
                        />
                    } else if (pageComponent.class == SeperatorComponentClass) {
                        return <SeperatorComponentRender
                            key={index}
                            originalDir={pageContent.originalDir}
                            translatedDir={pageContent.translatedDir}
                            render={render}
                            component={pageComponent}
                        />
                    }
                })
            }
        </Col>
    </Col>
}