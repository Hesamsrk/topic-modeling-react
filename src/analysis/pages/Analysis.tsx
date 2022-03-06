import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import AdminAppBar from "../../admin/components/AdminAppBar";
import AdminToolbar from "../../admin/components/AdminToolbar";
import {FileOutput, UploadButton} from "../components/UploadButton";
import {Chip, Grid} from "@mui/material";
import {ModelList} from "../components/ModelList";
import {PredictForm} from "../components/PredictForm";
import ModelDialog from "../components/ModelDialog";
import styled from "@emotion/styled";

const models = [
    "test.txt - 1235125351261263_time_2022_3_5_15_57_fbdb838b-06ba-47b6-968e-24",
    "test.txt - 1235125124261263_time_2022_3_5_15_57_fbdb838b-06ba-47b6-968e-336c124b8a411d6",
    "test.txt - 1235125312451261263_time_2022_3_5_15_57_fbdb838b-06ba-47b6-968e-336cb41248a411d6",
    "test.txt - 12351253511261263_time_2022_3_5_15_57_fbdb838b-06ba-47b6-968e-336cb8a411d6",
    "test.txt - 1235125311241261263_time_2022_3_5_15_57_fbdb838b-06ba-47b6-968e-336cb8124411d6"
]


const Analysis = () => {
        const {t} = useTranslation();
        const [fileOutput, setFileOutput] = useState<FileOutput | undefined>(undefined)
        const [selectedModel, setSelectedModel] = useState<number | undefined>(undefined)
        const [openAddModelDialog, setOpenAddModelDialog] = useState<boolean>(false)


        return (
            <React.Fragment>
                <AdminAppBar>
                    <AdminToolbar title={t("analysis.title")}>
                        {
                            fileOutput ?
                                <FileChip dir={'ltr'} label={fileOutput.name} onDelete={() => setFileOutput(undefined)}
                                          size={"medium"}
                                          variant={'filled'}
                                          color={"primary"}/> :
                                <UploadButton title={t("analysis.button.title")}
                                              fileNameFormatter={(name) => `${Date.now()}-${name}`}
                                              onUploaded={(fileData) => {
                                                  setFileOutput(fileData)
                                              }}/>
                        }
                    </AdminToolbar>
                </AdminAppBar>

                {
                    fileOutput ? <>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <ModelList onAddNewModel={() => setOpenAddModelDialog(true)}
                                           selectedModel={selectedModel}
                                           onSelect={(index) => setSelectedModel(index)}
                                           models={models.map(item => ({name: item}))}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <PredictForm/>
                            </Grid>
                        </Grid>
                        {
                            openAddModelDialog &&
                            <ModelDialog fileName={fileOutput.name} open={openAddModelDialog}
                                         onClose={() => setOpenAddModelDialog(false)}/>
                        }
                    </> : <>{t("analysis.initialPlaceHolder")}</>
                }
            </React.Fragment>
        );
    }
;


const FileChip = styled(Chip)`
  padding: 10px;
`

export default Analysis;
