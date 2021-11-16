import React from "react"
import { Api, ApiCallHandler, Routes } from "./utility/Urls"
import { Col, Row, Carousel } from "react-bootstrap"
import { Link } from "react-router-dom"
import ArticlesCardsRender from "./components/ArticlesCardsRender"
import { LinkContainer } from "react-router-bootstrap"
import { AiFillFacebook } from "react-icons/ai"

export default function Home(props) {
    const [categories, setcategories] = React.useState(null)
    const [articles, setarticles] = React.useState(null)

    async function setup() {
        ApiCallHandler(async () => await Api.fetchCategories(),
            setcategories,
            'CategoriesIndex fetchCategories',
            true
        )
        ApiCallHandler(async () => await Api.fetchArticles({ latest: true, with: ['category'] }),
            (data) => setarticles(data.data),
            'CategoriesIndex fetchArticles',
            true
        )
    }
    React.useEffect(() => {
        setup()
    }, [])
    return (
        <div className='py-3'>
            <Row>
                <Col xs={10}>
                    <Carousel interval={3000} fade>
                        <Carousel.Item>
                            <Link to={Routes.articleShow(1)}>
                                <img
                                    className="d-block w-100"
                                    src="/images/sketch.jpg"
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>تعرف على اساسيات علم الكابالا</h3>
                                    <p>  حكمة الكابالا هي أداة علمية لدراسة العالم الروحي. لاستكشاف عالمنا ، نستخدم العلوم الطبيعية مثل الفيزياء والكيمياء والبيولوجيا. العلوم الطبيعية تدرس فقط العالم المادي الذي ندركه بحواسنا الخمس. لفهم العالم الذي نعيش فيه تمامًا ، نحتاج إلى أداة بحث يمكنها استكشاف العالم الخفي الذي لا تستطيع حواسنا إدراكه. هذه الأداة هي حكمة الكابالا.</p>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    </Carousel>
                    {/* <h1>Youtube Embed</h1> */}
                    {/* <YoutubeEmbed embedId="rokGy0huYEA" /> */}
                    <ArticlesCardsRender articles={articles} />
                </Col>
                <Col xs={2}>
                    <a href='https://www.facebook.com/WisdomKabbalah/'>
                        <AiFillFacebook size={50}/>
                        حكمة الكابالا
                    </a>
                    <h4>تصنيفات</h4>
                    {
                        categories?.map((category, index) => (
                            <div key={index}>
                                <Link to={Routes.articlesIndex({ category_id: category.id })}> {category.name}  </Link>
                            </div>
                        ))
                    }
                </Col>
            </Row>
        </div>
    )
}