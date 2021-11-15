export function getsectionsarray(table) {
    let sections = []
    table.forEach((element, index) => {
        if (element.sections)
            element.sections?.forEach((element, subIndex) => {
                sections = [...sections, { ...element, index: index, subIndex: subIndex }]

            });
        else
            sections = [...sections, { ...element, index: index, subIndex: undefined }]
    });
    return sections
}

export function getsectionIndex(table, index, subIndex) {
    let sections = getsectionsarray(table)
    return sections?.findIndex((section) => {
        return (section.index == index && section.subIndex == subIndex)
    })
}