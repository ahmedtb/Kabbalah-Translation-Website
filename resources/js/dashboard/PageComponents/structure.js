export const PageContentClass = 'App\\PageComponents\\PageContent'
export const ParagraphComponentClass = 'App\\PageComponents\\ParagraphComponent'
export const HeaderComponentClass = 'App\\PageComponents\\HeaderComponent'
export const ImageComponentClass = 'App\\PageComponents\\ImageComponent'
export const LinkComponentClass = 'App\\PageComponents\\LinkComponent'
export const TitleComponentClass = 'App\\PageComponents\\TitleComponent'


export function paragraphObject(original, translated = '', style = {}) {

    return {
        class: ParagraphComponentClass,
        original: original,
        translated: translated,
        style: style
    }
}

export function headerObject(original, translated = '', style = {}) {

    return {
        class: HeaderComponentClass,
        original: original,
        translated: translated,
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

export function pageContentObject(pageComponents, originalDir, translatedDir) {
    return {
        class: PageContentClass,
        pageComponents: pageComponents,
        originalDir: originalDir,
        translatedDir: translatedDir,
    }
}