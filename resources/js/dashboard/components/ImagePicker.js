import React from 'react'
import { convertFileToBase64 } from '../../commonFiles/helpers.js'
import { Api } from '../utility/URLs'
import { Form } from 'react-bootstrap'
import { logError } from '../../commonFiles/helpers.js'

export const getBase64FromUrl = async (url) => {

    try {
        const data = (await Api.fetchBase64DataFromUrl(url)).data
        console.log('getBase64FromUrl data', data.length)
        return data;
    } catch (error) { logError(error) }

}

export default function ImagePicker(props) {
    const setImage = props.setImage
    const maxSize = props.maxSize

    const [url, seturl] = React.useState(null)
    const [fromURL, setFromURL] = React.useState(false)

    return (
        <div>
            <Form.Check
                inline
                label="from url"
                type={'checkbox'}
                onChange={(e) => {
                    setFromURL(e.target.checked)
                }}
            />
            {!fromURL ?

                <input
                    type='file'
                    accept=".jpg,.jpeg,.png,.webp,.gif"
                    onChange={(e) => {
                        const file = e.target.files[0]

                        convertFileToBase64(file).then((base64) => {
                            if (base64.length > maxSize)
                                alert('حجم الصورة يجب ان لا يفوق ' + maxSize)
                            else
                                setImage(base64)
                        })
                    }}
                /> :
                <div>
                    from url
                    <input onChange={(e) => seturl(e.target.value)} />
                    <button onClick={() => {
                        getBase64FromUrl(url).then((base64) => {
                            if (base64.length > maxSize)
                                alert('حجم الصورة يجب ان لا يفوق ' + maxSize)
                            else
                                setImage(base64)
                        })
                    }}>fetch image</button>
                </div>
            }
        </div>
    )
}