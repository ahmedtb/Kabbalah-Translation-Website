import React from "react"
import { Api, Routes, ApiCallHandler } from '../../utility/Urls';
import { Link } from "react-router-dom"
import LoadingIndicator from '../../../commonFiles/LoadingIndicator'
import { trackPromise } from 'react-promise-tracker'


export default function CategoriesList(props) {

    const [categories, setcategories] = React.useState(null)
    React.useEffect(() => {
        trackPromise(

            ApiCallHandler(() => Api.fetchCategories(),
                setcategories,
                'CategoriesList fetchCategories',
                true
            )
        )

    }, [])

    return <div>
        <LoadingIndicator />
        {
            categories?.map((category, index) => (
                <div key={index}>
                    <Link to={Routes.articlesIndex({ category_id: category.id })}> {category.name}  </Link>
                </div>
            ))
        }
    </div>
}