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
import SearchIcon from "@mui/icons-material/Search";
import ItemItem from "./item";

const validationSchema = yup.object().shape({
  name: yup.string(),
  uuid: yup.number(),
});

const Search = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<any>([]);
  const [tags, setTag] = useState<any>([]);
  const [pages, setPages] = useState<any[]>([]);

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
      let params: { [key: string]: string } = {};
      if (values.uuid) {
        params["uuid"] = values.uuid;
      }
      if (values.name) {
        params["name"] = values.name;
      }
      if (categories) {
        params["tags"] = categories;
      }
      pageService.search(params).then((res) => {
        setPages(res.data);
      });
    } catch (err) {
      console.log("Ooops i did it again");
    }
  };

  const render =
    pages.length === 0 ? (
      <div>
        <SearchIcon sx={{ fontSize: 128 }} />
        <p>Ooops... Looks like there is no pages</p>
      </div>
    ) : (
      <Grid container spacing={6} marginTop={4} minWidth={10}>
        {pages.map(
          ({
            id,
            name,
            description,
            owner,
            tags,
            followers,
            follow_requests,
          }) => (
            <ItemItem
              id={id}
              name={name}
              description={description}
              tags={tags}
              owner={owner}
              followers={followers}
              follow_requests={follow_requests}
            />
          )
        )}
      </Grid>
    );

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
      {render}
      <Typography color="red">{error}</Typography>
    </Container>
  );
};

export default Search;
