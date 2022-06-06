import React from "react";
import { Api, Routes } from "../utility/URLs";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Col, Container, Button } from "react-bootstrap";
import { ApiCallHandler, truncate } from "../../commonFiles/helpers";
import PageContentRender from "../components/PageContentRender";
import ChangePageTitle from '../../commonFiles/ChangePageTitle';

export default function ArticleShow(props) {

    let { id } = useParams();
    const [article, setarticle] = React.useState(null)
    const [render, setrender] = React.useState('original')

    async function setup() {
        ApiCallHandler(
            async () => await Api.fetchArticle(id),
            setarticle,
            'ArticleShow',
            true
        )
    }
    React.useEffect(() => {
        setup()
    }, [])

    return (
        <div >
            <ChangePageTitle pageTitle={article?.title} />
            
            <div className="bg-white p-2">
                <Link to={Routes.articleEdit(article?.id)}>
                    تعديل
                </Link>

                <div className="my-2 text-center d-flex">
                    <div className="fw-bold mx-2">
                        عنوان المقالة
                    </div>
                    <div>
                        {article?.title}
                    </div>
                </div>
                <div className="d-flex justify-content-around">
                    <div className="my-2 d-flex">
                        <div className="fw-bold mx-2">
                            رقم المقالة
                        </div>
                        <div>
                            {article?.id}
                        </div>
                    </div>
                    <div className="my-2 d-flex">
                        <div className="fw-bold mx-2">
                            التصنيف
                        </div>
                        <Link to={Routes.categoryShow(article?.category_id)}>
                            {article?.category_id}
                        </Link>
                    </div>
                </div>

                <div className="my-2 d-flex">
                    <div className="fw-bold mx-2">
                        تفعيل عرض المقالة
                    </div>
                    <div>
                        {article?.activated ? 'مفعل' : 'غير مفعل'}
                    </div>
                </div>
                <div className="my-2">
                    <div className="fw-bold">
                        الوصف
                    </div>
                    <textarea disabled className="p-2 border rounded d-block w-100" value={article?.description ?? ''} />

                </div>
                <div className="my-2">
                    <div className="fw-bold">
                        حول المقالة
                    </div>
                    <textarea disabled className="p-2 border rounded d-block w-100" value={article?.about ?? ''} />
                </div>

                <div className="my-2">
                    <div className="fw-bold">
                        صورة العرض
                    </div>
                    <img src={article?.hasThumbnail ? Api.articleThumbnail(id) : ''} className='maxWidth100' />
                </div>

                <div className="my-2 d-flex">
                    <div className="fw-bold mx-2">
                        رابط المصدر
                    </div>
                    <a href={article?.source_url} target='_blank' >{article?.source_url}</a>
                </div>

                <div className="d-flex justify-content-around">
                    <div className="my-2 d-flex">
                        <div className="fw-bold mx-2">
                            الاتجاه النص الاصلي
                        </div>
                        {article?.page_content.originalDir}
                    </div>
                    <div className="my-2 d-flex">
                        <div className="fw-bold mx-2">
                            الاتجاه النص المترجم
                        </div>
                        {article?.page_content.translatedDir}
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-around">

                <Button className="my-2" onClick={() => setrender('original')}>
                    عرض النص الاصلي
                </Button>
                <Button className="my-2" onClick={() => setrender('translated')}>
                    عرض الترجمة
                </Button>
                <Button onClick={() => setrender('both')}>
                    عرض كلاهما
                </Button>
            </div>

            <PageContentRender pageContent={article?.page_content} render={render} />
        </div>
    )
}