import { useParams } from "react-router"


export default function BookBrowser(props) {
    const { id } = useParams()
    const [ page, setpage ] = React.useState()
    return <div>
        <Page page={page} />

    </div>
}