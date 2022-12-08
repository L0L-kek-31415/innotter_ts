import { useState, useEffect } from "react"
import axiosInstance from "../../axios"

interface PageList {

}
interface Page {
    name: string;
    tags: any[];
    description: string;
    followers: any[];
    follow_requests: any[];
    owner: string;
    id: number;
}

const PagesList: React.FC<PageList> = ({}) => {
    const [pages, setPages] = useState<Page[]>([])

    useEffect(() => {
        axiosInstance
            .get('/api/v1/page')
            .then(resp => resp.data)
            .then(resp => setPages(resp))
            .catch(error => console.log(error))
    },[])
    return (
        <div>
            {pages.map(page => {
            return (
            <div>
                <h2>{page.name}</h2>
                    <div className="info">
                        <p>tags: {page.tags.join(' ')}</p>
                        <p>description: {page.description}</p>
                        <p>followers: {(page.followers).length}</p>
                        <p>follow requests: {page.follow_requests.length}</p>
                        <p>owner: {page.owner}</p>
                        {/* <Follow uuid={page.id}/> */}
                        
                    </div>
            </div>
            )
        })}
        </div>
    )
}
