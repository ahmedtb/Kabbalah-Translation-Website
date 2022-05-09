import React from "react"
import { Api, Routes, ApiCallHandler } from '../../utility/Urls';
import { Link } from "react-router-dom"
import LoadingIndicator from '../../../commonFiles/LoadingIndicator'
import { trackPromise } from 'react-promise-tracker'


export default function ReadMoreList(props) {

    const [booksSuggestion, setbooksSuggestion] = React.useState(null)
    React.useEffect(() => {
        trackPromise(

            ApiCallHandler(
                () => Api.booksSuggestion({ limit: 2 }),
                setbooksSuggestion,
                'ReadMoreList booksSuggestion',
                true
            )
        )

    }, [])

    return <div>
        <LoadingIndicator />
        {booksSuggestion?.map((book, index) => {
            return <Link key={index} className="" to={Routes.bookShow(book.id)}>
                <div className="my-2 text-center">
                    <img className="w-50" src={book.hasThumbnail ? Api.bookThumbnail(book.id) : ''} />
                    <div>
                        {book.title}
                    </div>
                </div>
            </Link >
        })}
    </div>
}