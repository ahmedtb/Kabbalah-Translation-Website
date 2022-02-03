import React from "react"
import { Api, ApiCallHandler } from '../utility/URLs'
export default function Home(props) {

    const [ statistics, setstatistics] = React.useState()

    React.useEffect(() => {
        ApiCallHandler(
            async () => await Api.home(),
            setstatistics,
            'Home',
            true
        )
    }, [])

    return (
        <div>
            <div>عدد الصفحات: {statistics?.pagesCount}</div>
            <div>عدد التصنيفات: {statistics?.categoriesCount}</div>
            <div>عدد الكتب: {statistics?.booksCount}</div>
            <div>عدد الكتب المفعلة: {statistics?.activatedBooksCount}</div>
            <div>عدد المقالات: {statistics?.articlesCount}</div>
            <div>عدد المقالات المفعلة: {statistics?.activatedArticlesCount}</div>

        </div>
    )
}