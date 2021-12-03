import React from 'react'
import { Button } from 'react-bootstrap'
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
    const [render, setrender] = React.useState('translated')


    return <div className='mx-auto bg-white rounded'>
        {/* <a className={render == 'original' ? 'mx-2 text-danger' : 'mx-2'} onClick={() => setrender('original')}>
            عرض النص الاصلي
        </a>
        <a className={render == 'translated' ? 'mx-2 text-danger' : 'mx-2'} onClick={() => setrender('translated')}>
            عرض الترجمة
        </a>
        <a className={render == 'both' ? 'mx-2 text-danger' : 'mx-2'} onClick={() => setrender('both')}>
            كلاهما
        </a> */}
        <div className='p-3'>
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
                            render={render}
                        />
                    }
                })
            }
        </div>
    </div>
}