import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import {Box, Button, CardActions, Grid} from "@mui/material";
import Card from "@mui/material/Card";
import {useTranslation} from "react-i18next";
import {useFormik} from "formik";
import TextField from "@mui/material/TextField";
import React from "react";

interface PropTypes {

}


export const PredictForm = (props: PropTypes): JSX.Element => {
    const {t} = useTranslation();
    const formik = useFormik({
        initialValues: {
            text: "",
            stopWords: "persianST",
            columnName: "Text",
        },
        onSubmit: () => {
        },
    });
    return <Card >
        <CardHeader title={t("analysis.predict.title")}/>
        <CardContent>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}><TextField
                    margin="normal"
                    required
                    fullWidth
                    multiline
                    rows={9}
                    maxRows={9}
                    label={t<string>("analysis.predict.form.text")}
                    name="text"
                    value={formik.values.text}
                    onChange={formik.handleChange}
                    error={formik.touched.text && Boolean(formik.errors.text)}
                    helperText={formik.touched.text && formik.errors.text}
                /></Grid>
                <Grid item xs={12} md={6}><TextField
                    margin="normal"
                    required
                    fullWidth
                    label={t<string>("analysis.predict.form.stopWords")}
                    name="stopWords"
                    value={formik.values.stopWords}
                    onChange={formik.handleChange}
                    error={formik.touched.stopWords && Boolean(formik.errors.stopWords)}
                    helperText={formik.touched.stopWords && formik.errors.stopWords}
                /></Grid>
                <Grid item xs={12} md={6}><TextField
                    margin="normal"
                    required
                    fullWidth
                    label={t<string>("analysis.predict.form.columnName")}
                    name="columnName"
                    value={formik.values.columnName}
                    onChange={formik.handleChange}
                    error={formik.touched.columnName && Boolean(formik.errors.columnName)}
                    helperText={formik.touched.columnName && formik.errors.columnName}
                /></Grid>
            </Grid>
        </CardContent>
        <CardActions>
            <Box sx={{display: "inline-flex", justifyContent: "start"}}>
                <Button size="large" variant="contained" color="primary" onClick={() => {
                }}>
                    {t("analysis.predict.form.confirm")}
                </Button>
            </Box>
        </CardActions>
    </Card>
}