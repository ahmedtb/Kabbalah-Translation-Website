import React from "react"


export default function GlossaryTermCreator(props){
    const [term,setterm]=React.useState()
    const [definition,setdefinition]=React.useState()
    const [termTranslation,settermTranslation]=React.useState()
    const [definitionTranslation,setdefinitionTranslation]=React.useState()

    return <div>
        <FloatingLabel label="المصطلح">
            <Form.Control
                as="input"
                onChange={(e) => {
                    setterm(e.target.value)
                }}
            />
        </FloatingLabel>

        <FloatingLabel label="تعريف">
            <Form.Control
                as="input"
                onChange={(e) => {
                    setterm(e.target.value)
                }}
            />
        </FloatingLabel>


        <FloatingLabel label="تعريف">
            <Form.Control
                as="input"
                onChange={(e) => {
                    setterm(e.target.value)
                }}
            />
        </FloatingLabel>
        

        <FloatingLabel label="تعريف">
            <Form.Control
                as="input"
                onChange={(e) => {
                    setterm(e.target.value)
                }}
            />
        </FloatingLabel>
    </div>
}