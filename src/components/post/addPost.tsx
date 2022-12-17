import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Grid,
  MenuItem,
  Select,
  Typography,
  TextField as BaseTextField,
} from "@mui/material";
import { Field, Form, Formik, FormikValues } from "formik";
import { TextField } from "formik-mui";
import pageService from "../../services/pageService";
import { useNavigate } from "react-router";
import * as yup from "yup";
import postService from "../../services/postService";

const validationSchema = yup.object().shape({
  content: yup.string().required(),
});

const AddPost = ({}) => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [categories, setCategories] = useState<any>([]);
  const [tags, setPages] = useState<any>([]);

  useEffect(() => {
    const fetchMyPages = async () => {
      const response = await pageService.getMyPages();
      setPages(response.data);
    };
    fetchMyPages();
  }, []);

  const onSubmit = async (values: FormikValues) => {
    setError("");
    try {
      await postService.createItem(values.content, categories);
      navigate("/");
    } catch (err) {
      console.log("Ooops i did it again");
    }
  };

  return (
    <Container
      sx={{
        paddingTop: 1,
        paddingBottom: 10,
      }}
      component={Card}
    >
      <Formik
        initialValues={{
          content: "",
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
                  color="primary"
                  component={TextField}
                  name="content"
                  multiline
                  label="content"
                  helperText={errors.content}
                  error={errors.content}
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  fullWidth
                  color="primary"
                  label="Category"
                  value={categories}
                  onChange={(e: any) => setCategories(e.target.value)}
                >
                  {/* @ts-ignore */}
                  {tags.map(({ id, name }) => (
                    <MenuItem value={id}>{name}</MenuItem>
                  ))}
                </Select>
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
                  Add Post
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

export default AddPost;
