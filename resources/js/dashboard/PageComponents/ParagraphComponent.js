import React from 'react'
import { AiOutlineOrderedList } from 'react-icons/ai'

export const ParagraphComponentClass = 'App\\PageComponents\\ParagraphComponent'

function paragraphObject(original, translated = null) {

    return {
        class: ParagraphComponentClass,
        original: original,
        translated: translated
    }
}

export function ParagraphComponentInput(props) {
    const component = props.component
    const dispatch = props.dispatch

    return <div >
        <strong >{component.label}</strong>
        <input
            onChangeText={(text) => {
                dispatch(text)
            }}
            value={component.value}
        />
    </div>
}

export function ParagraphComponentRender(props) {
    const component = props.component
    return <div >
        <strong >{component.label}</strong>
        <input
            onChangeText={(text) => { }}
            value={component.value}
        />
    </div>
}

export function ParagraphComponentFormdiv(props) {
    const component = props.component
    return <div >
        <div >
            <AiOutlineOrderedList />
            <div style={{ marginLeft: 5, flex: 1, }}>
                <strong style={{ color: 'black', fontSize: 17, flex: 1, fontWeight: 'bold' }}>{component.label}</strong>
                <strong style={{ color: 'grey', fontSize: 10, }}>حقل نصي</strong>
            </div>
        </div>
        <strong style={{ color: 'black', fontSize: 20, flex: 1, textAlign: 'center', padding: 10, backgroundColor: '#f5f0f0' }}>{component.value}</strong>
    </div>
}



export function ParagraphComponentCreator(props) {
    const set = props.set

    return <div style={{ marginVertical: 10 }}>
        <input
            
            onChange={(e) => {
                // console.log('ParagraphComponentCreator',  e.target.value)
                set(paragraphObject(e.target.value))
            }}
        />
    </div>
}

export function ParagraphComponentEditor(props) {
    const component = props.component
    const dispatch = props.dispatch
    const [label, setlabel] = React.useState(component.label)
    const [value, setvalue] = React.useState(component.value)

    return (
        <div style={{ marginVertical: 15 }}>

            <div style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <strong>حقل نصي</strong>
            </div>

            <input style={{ fontSize: 12, borderWidth: 1, borderColor: '#dec9c8', borderRadius: 10 }}
                onChangeText={(text) => {
                    setlabel(text)
                    dispatch({
                        class: ParagraphComponentClass, label: text, value: value
                    })
                }}
                value={label}
            />
            <input
                style={{ borderWidth: 1, borderColor: '#dec9c8', borderRadius: 10, marginVertical: 5 }}
                onChangeText={(text) => {
                    setvalue(text)
                    dispatch({
                        class: ParagraphComponentClass, label: label, value: value
                    })
                }}
                value={value}
            />
        </div>
    )
}