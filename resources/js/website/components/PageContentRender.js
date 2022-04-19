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
import { BsFileText, BsTranslate, BsChevronBarContract, BsMoonStars } from 'react-icons/bs'

export default function PageContentRender(props) {
    const page_content = props.page_content
    const translatedDir = page_content?.translatedDir
    const originalDir = page_content?.originalDir
    const [render, setrender] = React.useState('translated')
    const [darkMode, setdarkMode] = React.useState('')

    return <div className={`mx-auto ${darkMode ? 'bg-dark' : 'bg-white'} rounded`} >

        <div className='d-flex justify-content-end'>
            <Button className={render == 'original' ? 'mx-2 text-danger' : 'mx-2'} onClick={() => setrender('original')}>
                <BsFileText />

            </Button>
            <Button className={render == 'translated' ? 'mx-2 text-danger' : 'mx-2'} onClick={() => setrender('translated')}>
                <BsTranslate />


            </Button>
            <Button className={render == 'both' ? 'mx-2 text-danger' : 'mx-2'} onClick={() => setrender('both')}>
                <BsTranslate /> + <BsFileText />

            </Button>

            <Button className={darkMode ? 'mx-2 text-danger' : 'mx-2'} onClick={() => setdarkMode(!darkMode)}>
                <BsMoonStars />
            </Button>
        </div>

        <div className='p-3'>
            {
                page_content?.pageComponents.map((pageComponent, index) => {
                    if (componentsTypes[pageComponent.class]) {
                        let Render = componentsTypes[pageComponent.class].Render
                        return <Render
                            key={index}
                            originalDir={originalDir}
                            translatedDir={translatedDir}
                            component={pageComponent}
                            render={render}
                            className={darkMode ? 'text-white' : ''}
                        />
                    }
                })
            }
        </div>
    </div>
}