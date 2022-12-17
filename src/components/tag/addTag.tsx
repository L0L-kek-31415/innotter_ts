import React, { useState } from "react";
import {
  Button,
  Card,
  Container,
  Grid,
  Typography,
  TextField as BaseTextField,
} from "@mui/material";
import { Field, Form, Formik, FormikValues } from "formik";
import { TextField } from "formik-mui";
import pageService from "../../services/pageService";
import { useNavigate } from "react-router";
import * as yup from "yup";
import postService from "../../services/postService";
import tagService from "../../services/tagService";

const validationSchema = yup.object().shape({
  name: yup.string().required(),
});

const AddTag = ({}) => {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const onSubmit = async (values: FormikValues) => {
    setError("");
    try {
      await tagService.createTag(values.name);
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
          name: "",
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
                  name="name"
                  multiline
                  label="name"
                  helperText={errors.name}
                  error={errors.name}
                />
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
                  Add Tag
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

export default AddTag;
