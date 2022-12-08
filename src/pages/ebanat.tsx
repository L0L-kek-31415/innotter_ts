import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/reducers/rootReducer"
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { load } from "../action/page/load";
import { PageState } from "../store/reducers/pageReducer";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useEffect, useState } from "react";
import { search } from "../action/page/search";
import { IPage } from "../store/reducers/pageReducer";
import axiosInstance from "../axios";

interface ITag{
    id: number,
    name: string,
}


export function Eblan () {
    const [articles, setArticles] = useState([])
    const [uuid, setUuid] = useState('')
    const [name, setName] = useState('')
    var pages = null
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(load(navigate))
    },[])

    useEffect(() => {
        axiosInstance
            .get('/api/v1/tag/')
            .then((resp: any) => resp.data)
            .then(resp => setArticles(resp))
    },[])

    const dispatch = useDispatch<any>();
    pages = useSelector<RootState, PageState>(state => state.pages).pages

    const HandleSubmit = async (e: any) => {
        var el = document.getElementsByTagName('select')[0];
        var tags = getSelectValues(el) || ''
        dispatch(search(uuid, tags, name, navigate))
        pages = useSelector<RootState, PageState>(state => state.pages).pages
        window.location.reload()
      };
    function getSelectValues(select: any) {
        var options = select && select.options;
        var opt;
      
        for (var i=0, iLen=options.length; i<iLen; i++) {
          opt = options[i];
      
          if (opt.selected) {
            return `${opt.value}`.toString()

          }
          return ''
        }
        }
    return (
        <div>
            <div style={{padding: "100px"}}>
            <Grid item xs={12}>
                    <select name="tags" id="tags">
                      {articles.map((article: ITag) => {
                        return (
                          <option value={article.id}>{article.name}</option>
                        )
                      })}
                    </select>

                  </Grid>
            <input type="text" id='uuid' onChange={(e) => setUuid(e.target.value)} />
            <input type="text" id='name' onChange={(e) => setName(e.target.value)} />
            <button onClick={HandleSubmit}>FIND</button>

            </div>

        <Box className='box'
        sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
            m: 5,
            width: 400,
            height: 450,
        },
        }}
    >
            {pages?.map((page: any) => {
                return (
                        <Paper className='paper'>
                            <h2 className="title">{page.name}</h2>
                                <div className="info">
                                    <p>tags: {page.tags.join(' ')}</p>
                                    <p>description: {page.description}</p>
                                    <p>followers: {(page.followers).length}</p>
                                    <p>follow requests: {page.follow_requests.length}</p>
                                    <p>owner: {page.owner}</p>
                                    {/* <Follow uuid={page.id}/> */}
                                    
                                </div>
                        </Paper>
                        )
            })}
        </Box>
        </div>

    )
} 

