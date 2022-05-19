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
        <div className=''>

            <div className='d-flex align-items-center'>
                <div className='mx-1'>
                    من الرابط
                </div>
                <input type='checkbox' onChange={e => setFromURL(e.target.checked)} />
            </div>

            {!fromURL ?

                <div className='d-flex align-items-center'>
                    <div className='mx-1'>
                        من الملفات
                    </div>
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
                    />
                </div>
                :
                <div className='d-flex'>
                    <div className='my-2 d-flex mx-2'>
                        <div className='mx-2'>من الرابط</div>
                        <input onChange={(e) => seturl(e.target.value)} />
                    </div>
                    <button className='btn btn-success' onClick={() => {
                        getBase64FromUrl(url).then((base64) => {
                            if (base64.length > maxSize)
                                alert('حجم الصورة يجب ان لا يفوق ' + maxSize)
                            else
                                setImage(base64)
                        })
                    }}>جلب الصورة</button>
                </div>
            }
        </div>
    )
}