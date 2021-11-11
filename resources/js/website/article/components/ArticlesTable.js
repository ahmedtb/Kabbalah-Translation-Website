import { Table } from "react-bootstrap"
export default function ArticlesTable(){
    const articles = props.articles
    
    return <Table striped bordered hover>
        <thead>
            <tr>
                <th>#</th>
                <th>عنوان المقالة</th>
                <th>تصنيف المقالة</th>
            </tr>
        </thead>
        <tbody>
            {
                articles?.map((article, index) => (
                    <tr key={index}>
                        <td>  {article.id}   </td>
                        <td> <Link to={Routes.articleShow(article.id)}> {article.page?.title}</Link></td>
                        <td><Link to={Routes.categoryShow(article.category_id)}> {article.category?.name}</Link></td>
                    </tr>
                ))
            }
        </tbody>
    </Table> 
}