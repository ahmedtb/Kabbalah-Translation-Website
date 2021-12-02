import React from 'react'
import { ParagraphComponentWebsiteRender } from '../../commonFiles/PageComponents/ParagraphComponent'
import { HeaderComponentWebsiteRender } from '../../commonFiles/PageComponents/HeaderComponent'
import { TitleComponentWebsiteRender } from '../../commonFiles/PageComponents/TitleComponent'
import { ImageComponentWebsiteRender } from '../../commonFiles/PageComponents/ImageComponent'
import { LinkComponentWebsiteRender } from '../../commonFiles/PageComponents/LinkComponent'
import { YoutubeEmbedComponentWebsiteRender } from '../../commonFiles/PageComponents/YoutubeEmbedComponent'
import { SeperatorComponentWebsiteRender } from '../../commonFiles/PageComponents/SeperatorComponent'
import { QuoteComponentWebsiteRender } from '../../commonFiles/PageComponents/QuoteComponent'

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
    [ParagraphComponentClass]: { Render: ParagraphComponentWebsiteRender },
    [HeaderComponentClass]: { Render: HeaderComponentWebsiteRender },
    [TitleComponentClass]: { Render: TitleComponentWebsiteRender },
    [ImageComponentClass]: { Render: ImageComponentWebsiteRender },
    [LinkComponentClass]: { Render: LinkComponentWebsiteRender },
    [YoutubeEmbedComponentClass]: { Render: YoutubeEmbedComponentWebsiteRender },
    [SeperatorComponentClass]: { Render: SeperatorComponentWebsiteRender },
    [QuoteComponentClass]: { Render: QuoteComponentWebsiteRender },
}

import { Col } from 'react-bootstrap'

export default function PageContentRender(props) {
    const page_content = props.page_content
    const translatedDir = page_content?.translatedDir
    const originalDir = page_content?.originalDir

    // React.useEffect(() => {
    //     console.log('PageContentRender', page)
    // }, [])
    return <Col xs={12}>
        <Col xs={10} className='mx-auto bg-white p-2'>
            {
                page_content?.pageComponents.map((pageComponent, index) => {
                    if (componentsTypes[pageComponent.class]) {
                        let Render = componentsTypes[pageComponent.class].Render
                        return <Render
                            key={index}
                            key={index}
                            originalDir={originalDir}
                            translatedDir={translatedDir}
                            component={pageComponent}
                        />
                    }
                })
            }
        </Col>
    </Col>
}