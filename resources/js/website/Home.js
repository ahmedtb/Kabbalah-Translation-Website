import React from "react"
import { Api, ApiCallHandler, Routes } from "./utility/Urls"
import { Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import PageContentRender from "./components/PageContentRender"

export default function Home(props) {
    const [categories, setcategories] = React.useState(null)
    const [articles, setarticles] = React.useState(null)

    async function setup() {
        ApiCallHandler(async () => await Api.fetchCategories(),
            setcategories,
            'CategoriesIndex fetchCategories',
            true
        )
        ApiCallHandler(async () => await Api.fetchArticles({ latest: true, with: ['page', 'category'] }),
            (data) => setarticles(data.data),
            'CategoriesIndex fetchArticles',
            true
        )
    }
    React.useEffect(() => {
        setup()
    }, [])
    return (
        <div>
            <Row>
                <Col xs={10}>
                    <div className='natureBackground maxWidth100 maxHeight100 '>
                        <div className='homeBackCover px-4'>
                            <p >
                                حكمة الكابالا هي أداة علمية لدراسة العالم الروحي. لاستكشاف عالمنا ، نستخدم العلوم الطبيعية مثل الفيزياء والكيمياء والبيولوجيا. العلوم الطبيعية تدرس فقط العالم المادي الذي ندركه بحواسنا الخمس. لفهم العالم الذي نعيش فيه تمامًا ، نحتاج إلى أداة بحث يمكنها استكشاف العالم الخفي الذي لا تستطيع حواسنا إدراكه. هذه الأداة هي حكمة الكابالا.
                            </p>
                        </div>
                    </div>
                    {

                        articles?.map((article, index) => (
                            <div key={index}>
                                <h2> <Link to={Routes.articleShow(article.id)}> {article.page?.title}</Link></h2>
                                <div><Link to={Routes.articlesIndex({ category_id: article.category_id })}> {article.category?.name}</Link></div>
                                <PageContentRender page={article.page} />
                            </div>
                        ))
                    }
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