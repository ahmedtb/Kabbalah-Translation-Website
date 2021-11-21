export function getsectionsarray(content_table, preIndex) {
    let sections = []
    content_table?.forEach((element, index) => {
        if (element.sections)

            sections = [...sections, ...getsectionsarray(element.sections, preIndex ? `${preIndex}-${index}` : `${index}`)]
        else
            sections = [...sections, { ...element, path: preIndex ? `${preIndex}-${index}` : `${index}` }]
    });
    return sections
}

export function getelement(content_table, path) {


    const sections = getsectionsarray(content_table)

    return sections?.find(section => section.path == path)

}

export function getnextsection(content_table, path) {
    const sections = getsectionsarray(content_table)
    return sections[sections.findIndex(section => section.path == path) + 1]


}

export function getpresection(content_table, path) {
    const sections = getsectionsarray(content_table)
    return sections[sections.findIndex(section => section.path == path) - 1]


}

export function getchapter(content_table, path) {
    if (content_table && path) {


        let indexes = path.split('-')

        let elements = content_table

        let element = null
        for (let i = 0; i < indexes.length; i++) {
            const index = indexes[i];
            element = elements[index]

            if (element.type == 'chapter')
                elements = element.sections
        }

        return element
    }
}