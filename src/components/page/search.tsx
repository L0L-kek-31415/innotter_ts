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
import PageList from "./pageList";
import { useDispatch } from "react-redux";
import { search } from "../../action/page/search";

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  uuid: yup.number().required(),
});

const Search = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<any>([]);
  const [tags, setTag] = useState<any>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await pageService.getTags();
      setTag(response.data);
    };
    fetchCategories();
  }, []);

  const onSubmit = async (values: FormikValues) => {
    setError("");
    try {
      dispatch(search(values.name, values.uuid, categories)).then(
        (res: any) => {
          // return PageList(res)
        }
      );
    } catch (err) {
      console.log("Ooops i did it again");
    }
  };

  return (
    <Container
      sx={{
        marginTop: 10,
        paddingTop: 1,
        paddingBottom: 10,
      }}
      component={Card}
    >
      <Formik
        initialValues={{
          name: "",
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
                  component={TextField}
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
                  component={TextField}
                  name="uuid"
                  label="uuid"
                  helperText={errors.name}
                  error={errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  fullWidth
                  color="primary"
                  label="Category"
                  value={categories}
                  multiple
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
                  Search
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

export default Search;
