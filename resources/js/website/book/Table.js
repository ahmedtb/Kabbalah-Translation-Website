export function getsectionsarray(content_table) {
    let sections = []
    content_table.forEach((element, index) => {
        if (element.sections)
            element.sections?.forEach((element, subIndex) => {
                sections = [...sections, { ...element, index: index, subIndex: subIndex }]

            });
        else
            sections = [...sections, { ...element, index: index, subIndex: undefined }]
    });
    return sections
}

export function getsectionIndex(content_table, index, subIndex) {
    let sections = getsectionsarray(content_table)
    return sections?.findIndex((section) => {
        return (section.index == index && section.subIndex == subIndex)
    })
}