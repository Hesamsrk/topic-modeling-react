import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import {useFormik} from "formik";
import {useTranslation} from "react-i18next";
import {FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import React from "react";

interface PropTypes {
    open: boolean
    onClose: () => void
    fileName: string
};

const ModelDialog = (
    {
        open, onClose, fileName
    }: PropTypes) => {
    const {t} = useTranslation();


    const formik = useFormik({
        initialValues: {
            fileName,
            method: "nfm",
            stopWords: "persianST",
            columnName: "Text",
            numTopics: 5
        },
        onSubmit: () => {
        },
    });

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="event-dialog-title">
            <form onSubmit={formik.handleSubmit} noValidate>
                <DialogTitle id="event-dialog-title">
                    {t<string>("analysis.modelDialog.title")}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}><TextField
                            margin="normal"
                            required
                            fullWidth
                            label={t<string>("analysis.modelDialog.form.filename")}
                            name="filename"
                            disabled={true}
                            value={formik.values.fileName}
                            onChange={formik.handleChange}
                            error={formik.touched.fileName && Boolean(formik.errors.fileName)}
                            helperText={formik.touched.fileName && formik.errors.fileName}
                        /></Grid>
                        <Grid item xs={12} md={12}><FormControl fullWidth>
                            <InputLabel id="method-selector">{t<string>("analysis.modelDialog.form.method")}</InputLabel>
                            <Select
                                autoFocus
                                required
                                labelId="method-selector"
                                name='method'
                                value={formik.values.method}
                                label={t<string>("analysis.modelDialog.form.method")}
                                onChange={formik.handleChange}
                            >
                                <MenuItem value={"nfm"}>NFM</MenuItem>
                                <MenuItem value={"lda"}>LDA</MenuItem>
                            </Select>
                        </FormControl></Grid>
                        <Grid item xs={12} md={12}><TextField
                            margin="normal"
                            required
                            fullWidth
                            label={t<string>("analysis.modelDialog.form.stopWords")}
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
                            label={t<string>("analysis.modelDialog.form.columnName")}
                            name="columnName"
                            value={formik.values.columnName}
                            onChange={formik.handleChange}
                            error={formik.touched.columnName && Boolean(formik.errors.columnName)}
                            helperText={formik.touched.columnName && formik.errors.columnName}
                        /></Grid>
                        <Grid item xs={12} md={6}><TextField
                            margin="normal"
                            required
                            fullWidth
                            label={t<string>("analysis.modelDialog.form.numTopics")}
                            name="numTopics"
                            type={"number"}
                            value={formik.values.numTopics}
                            onChange={formik.handleChange}
                            error={formik.touched.numTopics && Boolean(formik.errors.numTopics)}
                            helperText={formik.touched.numTopics && formik.errors.numTopics}
                        /></Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Box sx={{flexGrow: 1}}/>
                    <Button onClick={onClose}>{t("analysis.modelDialog.form.cancel")}</Button>
                    <Button onClick={onClose} variant={'contained'}>{t("analysis.modelDialog.form.confirm")}</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ModelDialog;
