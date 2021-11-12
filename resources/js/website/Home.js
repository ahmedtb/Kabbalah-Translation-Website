import React from "react"
import { Api, ApiCallHandler, Routes } from "./utility/Urls"
import { Col, Row, Carousel } from "react-bootstrap"
import { Link } from "react-router-dom"
import YoutubeEmbed from "../commonFiles/YoutubeEmbed"
import ArticlesCardsRender from "./components/ArticlesCardsRender"

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
                    {/* <div className='natureBackground maxWidth100 maxHeight100 '>
                        <div className='homeBackCover px-4'>
                            <p >
                                حكمة الكابالا هي أداة علمية لدراسة العالم الروحي. لاستكشاف عالمنا ، نستخدم العلوم الطبيعية مثل الفيزياء والكيمياء والبيولوجيا. العلوم الطبيعية تدرس فقط العالم المادي الذي ندركه بحواسنا الخمس. لفهم العالم الذي نعيش فيه تمامًا ، نحتاج إلى أداة بحث يمكنها استكشاف العالم الخفي الذي لا تستطيع حواسنا إدراكه. هذه الأداة هي حكمة الكابالا.
                            </p>
                        </div>
                    </div> */}
                    <Carousel interval={3000}>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="/assets/nature.jpg"
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="/assets/nature.jpg"
                                alt="Second slide"
                            />

                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="/assets/nature.jpg"
                                alt="Third slide"
                            />

                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                    <h1>Youtube Embed</h1>
                    <YoutubeEmbed embedId="rokGy0huYEA" />
                    <ArticlesCardsRender articles={articles} />
                </Col>
                <Col xs={2}>
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