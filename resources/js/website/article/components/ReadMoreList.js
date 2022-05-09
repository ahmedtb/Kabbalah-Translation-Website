import React from "react"
import { Api, Routes, ApiCallHandler } from '../../utility/Urls';
import { Link } from "react-router-dom"
import LoadingIndicator from '../../../commonFiles/LoadingIndicator'
import { trackPromise } from 'react-promise-tracker'


export default function ReadMoreList(props) {

    const [articlesSuggestion, setarticlesSuggestion] = React.useState(null)
    React.useEffect(() => {
        trackPromise(

            ApiCallHandler(() => Api.articlesSuggestion(),
                setarticlesSuggestion,
                'ReadMoreList articlesSuggestion',
                true
            )
        )

    }, [])

    return <div>
        <LoadingIndicator />
        {articlesSuggestion?.map((arti, index) => {
            return <Link key={index} className="" to={Routes.articleShow(arti.id)}>
                <div className="d-flex my-2">
                    {/* <BsDot className="" size={30} /> */}
                    <div>
                        {arti.title}
                    </div>
                </div>
            </Link >
        })}
    </div>
}