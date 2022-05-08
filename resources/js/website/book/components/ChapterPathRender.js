import React from "react"
import {
    getchapter
} from './TableFunctions';
import { Link } from "react-router-dom";
import { Routes } from "../../utility/Urls";

export default function ChapterPathRender(props) {
    const book = props.book
    const path = props.path

    let chaptersPaths = []
    if (book?.content_table && path) {
        let indexes = path.split('-')
        let nextPath = indexes[0]
        for (let i = 0; i < indexes.length - 1; i++) {
            chaptersPaths.push(nextPath)
            nextPath += '-' + indexes[i + 1]
        }
        console.log('chaptersPaths', chaptersPaths)

    }
    return (
        <div className="d-flex">
            <div>
                <Link to={Routes.bookShow(book?.id)}>
                    {book?.title}
                </Link>
            </div>
            {
                chaptersPaths?.map((path, index) => {
                    return <div key={index}>
                        {' -> '}
                        <Link to={Routes.bookChapterShow(book?.id, path)}>
                            {getchapter(book.content_table, path)?.title}
                        </Link>
                    </div>
                })
            }
            <div>
                {' -> '} {getchapter(book?.content_table, path)?.title}
            </div>
        </div>
    )
}