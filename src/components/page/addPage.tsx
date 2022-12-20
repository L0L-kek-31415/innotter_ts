import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Grid,
  Typography,
  TextField as BaseTextField,
  Stack,
  Box,
} from "@mui/material";
import { Field, Form, Formik, FormikValues } from "formik";
import { TextField as TextFieldFormik } from "formik-mui";
import pageService from "../../services/pageService";
import { useNavigate } from "react-router";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import tagService from "../../services/tagService";
import MyButton from "../buttons/button";
import { Autocomplete } from "@mui/material";

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  uuid: yup.number().required(),
  description: yup.string().required(),
});


interface ITag{
  name: string
  id?: number
}

const AddPage = ({}) => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [categories, setCategories] = useState<ITag[]>([]);
  const [tags, setTag] = useState<any>([]);

  function get_tags(): any{
    const fetchCategories = async () => {
      const response = await tagService.getTags();
      setTag(response.data);
    };
    fetchCategories();  
  }
  useEffect(() =>{
    get_tags();
  }, [])

  const onSubmit = async (values: FormikValues) => {
    setError("");
    let cat: any[] = []
    for(let i = 0; i < categories.length; i++){
      cat.push(categories[i].id)
    }
    console.log(cat)
    if (cat.length == 0){
      alert('please select tags)))')
    }
    else{
      try {
        await pageService.createItem(
          values.name,
          values.description,
          values.uuid,
          cat
        );
        navigate("/");
      } catch (err) {
        console.log("Ooops i did it again");
      }
    }
    
  };
  function ebanat () {
    const x = document.getElementById("tags")
    const new_tag = x?.getAttribute('value')
    tagService.createTag(new_tag)
    get_tags()
  }

  return (
    <Container
      sx={{
        paddingBottom: 10,
      }}
      component={Card}
    >
      <Formik
        initialValues={{
          name: "",
          description: "",
          uuid: "",
        }}
        onSubmit={onSubmit}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={validationSchema}
      >
        {({ values, errors }) => (
          <Form>
            <Grid container spacing={2} marginTop={2}>
              <Grid item xs={12}>
                <Field
                  fullWidth
                  component={TextFieldFormik}
                  name="name"
                  label="Name"
                  helperText={errors.name}
                  error={errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  fullWidth
                  color="primary"
                  component={TextFieldFormik}
                  name="description"
                  multiline
                  label="Description"
                  helperText={errors.name}
                  error={errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  fullWidth
                  color="primary"
                  component={TextFieldFormik}
                  name="uuid"
                  label="uuid"
                  helperText={errors.name}
                  error={errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <Stack> 
                  <Autocomplete 
                    id='tags'
                    multiple
                    options={tags}
                    getOptionLabel={(options: any) => `${options.name}`}
                    noOptionsText={
                      <MyButton children="add" onClick={() => ebanat()}/>
                    }
                    renderOption={(props, tags) =>
                      <Box component='li' {...props} key={tags.id}>
                        {tags.name}
                      </Box>
                    }
                    renderInput={(params) => <TextField {...params} label='tags'/>}
                    onChange={(event, value) => setCategories(value)}
                  />
                </Stack>
              </Grid>
            </Grid>
            <Grid container item xs={12} direction="row-reverse">
              <Grid item>
                <Button
                  sx={{
                    marginTop: 1,
                  }}
                  type="submit"
                  variant="contained"
                >
                  Add Item
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <Typography color="red">{error}</Typography>
    </Container>
  );
};

export default AddPage;
