import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/reducers/rootReducer"
import { useNavigate } from "react-router-dom";
import { load } from "../../action/page/load";
import { PageState } from "../../store/reducers/pageReducer";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useEffect, useState } from "react";
import { search } from "../../action/page/search";
import { IPage } from "../../store/reducers/pageReducer";
import axiosInstance, { refresh } from "../../axios";
import { PageButtons } from "./pageButtons";
import { me } from "../../action/user/me";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup';
import { create } from "../../action/page/create";

interface ITag{
    id: number,
    name: string,
}
const validationSchema = yup.object().shape({
    name: yup.string().required(),
    uuid: yup.number().required(),
    description: yup.string().required(),
  });


export function CreatePage () {
    const [articles, setArticles] = useState([])

    const navigate = useNavigate()
    const dispatch = useDispatch<any>();
    useEffect(() => {
        dispatch(me())
        axiosInstance
            .get('/api/v1/tag/')
            .then((resp: any) => resp.data)
            .then(resp => setArticles(resp))

    },[])

    function getSelectValues(select: any) {
        var result = [];
        var options = select && select.options;
        var opt;
      
        for (var i=0, iLen=options.length; i<iLen; i++) {
          opt = options[i];
      
          if (opt.selected) {
            var fuck = opt.value
            result.push(fuck);
          }
        }
  
        return result;
    }
    const formik = useFormik({
        initialValues: {
          name: '', 
          uuid: 0,
          description: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values: any) => {
          var el = document.getElementsByTagName('select')[0];
          var tags = getSelectValues(el)  
          const x = JSON.stringify(Object.assign(values, {'tags': tags}), null, 3)
          console.log(x)
          dispatch(create(x, navigate))
        },
      });


        return (
        <div>
        <Box className='box'
        sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
            m: 5,
            width: 400,
            height: 450,
        },
        }}>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="uuid"
                  name="uuid"
                  label="uuid"
                  value={formik.values.uuid}
                  onChange={formik.handleChange}
                  error={formik.touched.uuid && Boolean(formik.errors.uuid)}
                  helperText={formik.touched.uuid && formik.errors.uuid}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label="description"
                  type="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />
              </Grid>
              <select name="tags" id="tags" multiple>
                {articles.map((article: ITag) => {
                  return (
                    <option key={article.id} value={article.id}>{article.name}</option>
                  )
                })}
              </select>
              <Grid item xs={12}>
                <Button color="primary" variant="contained" fullWidth type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>


          </Box>
        </Box>
        </div>
    )
} 

