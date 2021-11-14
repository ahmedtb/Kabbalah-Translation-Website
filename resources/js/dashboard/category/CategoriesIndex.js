import React from 'react'
import { Redirect } from 'react-router'
import { Api, Routes, ApiCallHandler } from '../utility/URLs'
import { Container, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Pagination from '../../commonFiles/Pagination'
import { TextFilter } from '../components/Filters'
export default function CategoriesIndex(props) {
    const [categories, setcategories] = React.useState(null)
    const [links, setlinks] = React.useState([])
    const [params, setparams] = React.useState([])

    // async function setup() {
    //     ApiCallHandler(async () => await Api.fetchCategories(),
    //         setcategories,
    //         'CategoriesIndex setup',
    //         true
    //     )
    // }

    function fetchCategories(link = null, params = null) {
        ApiCallHandler(
            async () => (link ?
                await axios.get(link, { params:params }) :
                await Api.fetchCategories(params)
            ),
            (data) => { setcategories(data.data); setlinks(data.links ?? []); setparams(params) },
            'CategoriesIndex fetchCategories',
            true
        )
    }
    React.useEffect(() => {
        fetchCategories()
    }, [])


    function deleteCategory(id) {
        ApiCallHandler(async () => await Api.deleteCategory(id),
            setup,
            'CategorysIndex deleteCategory',
            true
        )
    }

    return <div>
        <TextFilter
            params={params}
            fetchPage={(newparams) => fetchCategories(null, newparams)}
            property={'name'}
            label={'اسم التصنيف'}
        />
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>العنوان</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    categories?.map((category, index) => (
                        <tr key={index}>
                            <td> <Link to={Routes.categoryShow(category.id)}> {category.id}  </Link> </td>
                            <td>{category.name}</td>
                            <td onClick={() => {
                                if (confirm('هل انت متاكد من الحدف؟'))
                                    deleteCategory(category.id)
                            }}>حدف</td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
        <Pagination fetchPage={fetchCategories} links={links} />

    </div>
}