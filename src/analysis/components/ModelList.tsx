import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import {Add, CheckBoxOutlineBlank, CheckBoxOutlined} from '@mui/icons-material';
import ListItemText from "@mui/material/ListItemText";
import {useTheme} from "@mui/material/styles";
import {useTranslation} from "react-i18next";
import {Box, Button, CardActions} from "@mui/material";


interface Model {
    name: string
}

interface PropTypes {
    models: Model[],
    selectedModel: number | undefined
    onSelect: (index: number) => void,
    onAddNewModel: () => void
}


export const ModelList = (
    {
        selectedModel,
        onSelect,
        models,
        onAddNewModel
    }
        : PropTypes): JSX.Element => {
    const theme = useTheme();
    const {t} = useTranslation();

    return <Card sx={{minHeight: "100%"}}>
        <CardHeader title={t("analysis.modelList.title")}/>
        <CardContent>
            <List sx={{height: 360, overflowY: "scroll"}}>
                {
                    models.length ? models.map((model: Model, index) => (
                            <ListItem disableGutters key={index}>
                                <ListItemSecondaryAction>
                                    <IconButton
                                        onClick={() => onSelect(index)}
                                        aria-label="Select model"
                                        color={"primary"}
                                        edge="start">
                                        {selectedModel === index ? <CheckBoxOutlined/> : <CheckBoxOutlineBlank/>}
                                    </IconButton>
                                </ListItemSecondaryAction>
                                <ListItemText
                                    sx={{
                                        mx: 4
                                    }}
                                    primary={t("analysis.modelList.modelName")}
                                    primaryTypographyProps={{
                                        fontWeight: theme.typography.fontWeightMedium,
                                    }}
                                    secondary={model.name}
                                />

                            </ListItem>
                        ))
                        :
                        <Box sx={{
                            display: "inline-flex",
                            width: "100%",
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            {t("No models defined yet!")}
                        </Box>
                }
            </List>
        </CardContent>
        <CardActions>
            <Box sx={{display: "inline-flex", justifyContent: "start"}}>
                <Button size="small" variant="outlined" color="primary" onClick={() => onAddNewModel()}>
                    <Add/> {t("analysis.modelList.newModel")}
                </Button>
            </Box>
        </CardActions>
    </Card>
}

