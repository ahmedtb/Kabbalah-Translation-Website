import { size } from "lodash"

export const PageContentClass = 'App\\PageComponents\\PageContent'
export const ParagraphComponentClass = 'App\\PageComponents\\ParagraphComponent'
export const HeaderComponentClass = 'App\\PageComponents\\HeaderComponent'
export const ImageComponentClass = 'App\\PageComponents\\ImageComponent'
export const LinkComponentClass = 'App\\PageComponents\\LinkComponent'
export const TitleComponentClass = 'App\\PageComponents\\TitleComponent'
export const YoutubeEmbedComponentClass = 'App\\PageComponents\\YoutubeEmbedComponent'


export function paragraphObject(original, translated = '', style = {}) {

    return {
        class: ParagraphComponentClass,
        original: original,
        translated: translated,
        style: style
    }
}

export function headerObject(original, translated = '', size = 1, style = {}) {

    return {
        class: HeaderComponentClass,
        original: original,
        translated: translated,
        size: size,
        style: style
    }
}

export function imageObject(original, translated = null) {

    return {
        class: ImageComponentClass,
        original: original,
        translated: translated,
    }
}

export function titleObject(original, translated = null) {

    return {
        class: TitleComponentClass,
        original: original,
        translated: translated,
    }
}

export function linkObject(originalLink, originalLabel = null, translatedLink = null, translatedLabel = null) {

    return {
        class: LinkComponentClass,
        originalLink: originalLink,
        originalLabel: originalLabel,
        translatedLink: translatedLink,
        translatedLabel: translatedLabel
    }
}

export function youtubeEmbedObject(original, translated) {


    return {
        class: YoutubeEmbedComponentClass,
        original: original,
        translated: translated
    }
}

export function pageContentObject(pageComponents, originalDir, translatedDir) {
    return {
        class: PageContentClass,
        pageComponents: pageComponents,
        originalDir: originalDir,
        translatedDir: translatedDir,
    }
}

export function pageContentReducer(page_content, action) {
    switch (action.actionType) {
        case 'set page_content':
            return action.page_content
        case 'change component':
            return pageContentObject(
                page_content.pageComponents.map((component, index) => {
                    if (index == action.index)
                        return action.component;
                    return component;
                }),
                page_content.originalDir, page_content.translatedDir
            )

        case 'remove component':
            return pageContentObject(
                page_content.pageComponents.filter((value, index) => {
                    return index != action.index;
                }), page_content.originalDir, page_content.translatedDir
            )
        case 'add component':
            return pageContentObject([...page_content.pageComponents, action.component], page_content.originalDir, page_content.translatedDir)

        case 'insert component':
            
            return pageContentObject(
                page_content.pageComponents.slice(0, action.index).concat(action.component, this.slice(action.index)),
                page_content.originalDir,
                page_content.translatedDir
            )

        case 'add components':
            console.log('add components', (action.components))
            return pageContentObject(page_content.pageComponents.concat(action.components), page_content.originalDir, page_content.translatedDir)

        case 'set original dir':
            return pageContentObject(page_content.pageComponents, action.dir, page_content.translatedDir)
        case 'set translated dir':
            return pageContentObject(page_content.pageComponents, page_content.originalDir, action.dir)


        case 'left up component':
            let leftup = [...page_content.pageComponents];
            if (action.index >= 1)
                [leftup[action.index - 1], leftup[action.index]] = [leftup[action.index], leftup[action.index - 1]]
            return pageContentObject(leftup, page_content.originalDir, page_content.translatedDir)
        case 'left down component':
            let leftdown = [...page_content.pageComponents];
            if (action.index < leftdown.length - 1)
                [leftdown[action.index + 1], leftdown[action.index]] = [leftdown[action.index], leftdown[action.index + 1]]
            return pageContentObject(leftdown, page_content.originalDir, page_content.translatedDir)

    }
    return page_content;
}