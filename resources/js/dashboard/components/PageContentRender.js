import React from 'react'
import { Col } from 'react-bootstrap'

import { ParagraphComponentRender } from '../../commonFiles/PageComponents/ParagraphComponent'
import { HeaderComponentRender } from '../../commonFiles/PageComponents/HeaderComponent'
import { TitleComponentRender } from '../../commonFiles/PageComponents/TitleComponent'
import { ImageComponentRender, } from '../../commonFiles/PageComponents/ImageComponent'
import { LinkComponentRender } from '../../commonFiles/PageComponents/LinkComponent'
import { YoutubeEmbedComponentRender } from '../../commonFiles/PageComponents/YoutubeEmbedComponent'
import { SeperatorComponentRender } from '../../commonFiles/PageComponents/SeperatorComponent'
import { QuoteComponentRender } from '../../commonFiles/PageComponents/QuoteComponent'

import {
    ParagraphComponentClass,
    HeaderComponentClass,
    TitleComponentClass,
    ImageComponentClass,
    LinkComponentClass,
    YoutubeEmbedComponentClass,
    SeperatorComponentClass,
    QuoteComponentClass
} from '../../commonFiles/PageComponents/structure'

const componentsTypes = {
    [ParagraphComponentClass]: { Render: ParagraphComponentRender },
    [HeaderComponentClass]: { Render: HeaderComponentRender },
    [TitleComponentClass]: { Render: TitleComponentRender },
    [ImageComponentClass]: { Render: ImageComponentRender },
    [LinkComponentClass]: { Render: LinkComponentRender },
    [YoutubeEmbedComponentClass]: { Render: YoutubeEmbedComponentRender },
    [SeperatorComponentClass]: { Render: SeperatorComponentRender },
    [QuoteComponentClass]: { Render: QuoteComponentRender },
}


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
                    if (componentsTypes[pageComponent.class]) {
                        let Render = componentsTypes[pageComponent.class].Render
                        return <Render
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