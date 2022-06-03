import React from "react"
import { Api, ApiCallHandler, Routes } from "./utility/Urls"
import { Col, Row, Carousel } from "react-bootstrap"
import { Link } from "react-router-dom"
import ArticlesCardsRender from "./components/ArticlesCardsRender"
import { LinkContainer } from "react-router-bootstrap"
import { AiFillFacebook, AiFillYoutube } from "react-icons/ai"
import { Helmet } from 'react-helmet';
import LoadingIndicator from '../commonFiles/LoadingIndicator'
import { trackPromise } from 'react-promise-tracker'
import CategoriesList from "./category/components/CategoriesList"

export default function Home(props) {
    const [categories, setcategories] = React.useState(null)
    const [articles, setarticles] = React.useState(null)

    async function setup() {
        ApiCallHandler(async () => await Api.fetchCategories(),
            setcategories,
            'CategoriesIndex fetchCategories',
            true
        )
        trackPromise(
            ApiCallHandler(async () => await Api.fetchArticles({ latest: true, with: ['category'] }),
                (data) => setarticles(data.data),
                'CategoriesIndex fetchArticles',
                true
            )
        )
    }
    React.useEffect(() => {
        setup()
    }, [])
    return (
        <div className='py-3'>

            <Helmet>
                <title>
                    {process.env.MIX_APP_NAME}
                </title>
            </Helmet>
            <Row>
                <Col lg={9}>
                    <Carousel interval={3000} fade>
                        <Carousel.Item>
                            <Link to={Routes.articleShow(1)}>
                                <img
                                    className="d-block w-100"
                                    src="/images/nature.jpg"
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>تعرف على اساسيات علم الكابالا</h3>
                                    <p className="d-none d-md-block">  حكمة الكابالا هي أداة علمية لدراسة العالم الروحي. لاستكشاف عالمنا ، نستخدم العلوم الطبيعية مثل الفيزياء والكيمياء والبيولوجيا. العلوم الطبيعية تدرس فقط العالم المادي الذي ندركه بحواسنا الخمس. لفهم العالم الذي نعيش فيه تمامًا ، نحتاج إلى أداة بحث يمكنها استكشاف العالم الخفي الذي لا تستطيع حواسنا إدراكه. هذه الأداة هي حكمة الكابالا.</p>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    </Carousel>

                    <div className="mt-2 bg-light border rounded p-2">
                        <div className='fs-5 fw-bold'>
                            أخر مقالات....
                        </div>
                        <LoadingIndicator />

                        <ArticlesCardsRender articles={articles} />

                        <div className="text-center mt-2">
                            <Link className="fs-5" to={Routes.articlesIndex()}>المزيد المقالات</Link>
                        </div>
                    </div>
                </Col>
                <Col lg={3}>
                    <div className="d-flex justify-content-around  border rounded bg-white my-2 p-3">

                        <a href='https://www.facebook.com/WisdomKabbalah/' target={'_blank'} className=''>
                            <AiFillFacebook size={50} />
                            <div>
                                فيسبوك
                            </div>
                        </a>
                        <a href='https://www.youtube.com/channel/UCJ3WaAE9Qb_RWIs9x6dKWNQ' target={'_blank'}>
                            <AiFillYoutube size={50} />
                            <div>
                                يوتيوب
                            </div>
                        </a>
                    </div>

                    <div className="p-2 border rounded bg-white my-2">

                        <div className="fw-bold mb-2">تصنيفات المقالات</div>
                        <CategoriesList />
                    </div>
                </Col>
            </Row>
        </div>
    )
}