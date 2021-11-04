import React from 'react'
import { convertFileToBase64 }from '../utility/helpers.js'

export default function ImagePicker(props) {
    const fromURL = props.fromURL
    const setImage = props.setImage
    const [base64, setbase64] = React.useState(null)

    return (<div>
        <input
            type='file'
            accept=".jpg,.jpeg,.png,.webp"
            onChange={(e) => {
                const file = e.target.files[0]
                // console.log('ImageFieldInput', file)
                convertFileToBase64(file).then((base64) => {
                    setImage(base64)
                })
            }}
        />
    </div>)
}