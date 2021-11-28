import React from 'react'
import { ParagraphComponentWebsiteRender} from '../../commonFiles/PageComponents/ParagraphComponent'
import {HeaderComponentWebsiteRender} from '../../commonFiles/PageComponents/HeaderComponent'
import { TitleComponentWebsiteRender} from '../../commonFiles/PageComponents/TitleComponent'
import { ImageComponentWebsiteRender} from '../../commonFiles/PageComponents/ImageComponent'
import { LinkComponentWebsiteRender} from '../../commonFiles/PageComponents/LinkComponent'
import { YoutubeEmbedComponentWebsiteRender } from '../../commonFiles/PageComponents/YoutubeEmbedComponent'
import { SeperatorComponentWebsiteRender} from '../../commonFiles/PageComponents/SeperatorComponent'

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
    const page_content = props.page_content
    const translatedDir = page_content?.translatedDir
    const originalDir = page_content?.originalDir

    // React.useEffect(() => {
    //     console.log('PageContentRender', page)
    // }, [])
    return <Col xs={12}>
        <Col xs={10} className='mx-auto'>
            {
                page_content?.pageComponents.map((pageComponent, index) => {
                    if (pageComponent.class == ParagraphComponentClass) {
                        return <ParagraphComponentWebsiteRender
                            key={index}
                            originalDir={originalDir}
                            originalDir={translatedDir}
                            component={pageComponent}
                        />
                    } else if (pageComponent.class == HeaderComponentClass) {
                        return <HeaderComponentWebsiteRender
                            key={index}
                            originalDir={originalDir}
                            translatedDir={translatedDir}
                            component={pageComponent}
                        />
                    } else if (pageComponent.class == TitleComponentClass) {
                        return <TitleComponentWebsiteRender
                            key={index}
                            originalDir={originalDir}
                            translatedDir={translatedDir}
                            component={pageComponent}
                        />
                    } else if (pageComponent.class == ImageComponentClass) {
                        return <ImageComponentWebsiteRender
                            key={index}
                            originalDir={originalDir}
                            translatedDir={translatedDir}
                            component={pageComponent}
                        />
                    } else if (pageComponent.class == LinkComponentClass) {
                        return <LinkComponentWebsiteRender
                            key={index}
                            originalDir={originalDir}
                            translatedDir={translatedDir}
                            component={pageComponent}
                        />
                    } else if (pageComponent.class == YoutubeEmbedComponentClass) {
                        return <YoutubeEmbedComponentWebsiteRender
                            key={index}
                            originalDir={originalDir}
                            translatedDir={translatedDir}
                            component={pageComponent}
                        />
                    } else if (pageComponent.class == SeperatorComponentClass) {
                        return <SeperatorComponentWebsiteRender
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