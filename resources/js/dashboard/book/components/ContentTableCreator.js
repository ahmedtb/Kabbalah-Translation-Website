import React from "react";


function reducer(content_table, action) {

    switch (action.type) {
        case 'set state':
            return action.state
        case 'add element':
            return [...content_table, action.element]
        case 'change element':
            return content_table.map((element, index) => {
                if (index == action.index)
                    return action.element

                return element
            })
        case 'remove element':
            return content_table.filter((element, index) => {
                return index != action.index
            })
        case 'left up element':
            let leftup = [...content_table]
            if (action.index >= 1)
                [leftup[action.index - 1], leftup[action.index]] = [leftup[action.index], leftup[action.index - 1]]
            return leftup
        case 'left down element':
            let leftdown = [...content_table]
            if (action.index < leftdown.length - 1)
                [leftdown[action.index + 1], leftdown[action.index]] = [leftdown[action.index], leftdown[action.index + 1]]
            return leftdown

        default: return content_table
    }
}

export default function ContentTableEditor(props){
    const [content_table, dispatch] = React.useReducer(reducer, [])

    return <div>

    </div>
}