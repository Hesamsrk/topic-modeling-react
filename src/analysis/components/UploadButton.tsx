import {Button} from "@mui/material";
import styled from "@emotion/styled";
import React, {useCallback, useRef} from "react";
import {fileToBase64} from "../../utils";
import {Add} from "@mui/icons-material";


export interface FileOutput {
    name: string
    base64Body: string
}

interface PropTypes {
    title: string,
    onUploaded: (output: FileOutput) => void,
    fileNameFormatter?: (fileName: string) => string,
}


export const UploadButton = (props: PropTypes): JSX.Element => {
    const inputRef = useRef<HTMLInputElement>(null)

    const uploadFile = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }, [inputRef])

    const OnFileUploaded = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            const file = e.currentTarget.files[0]

            props.onUploaded({
                name: props.fileNameFormatter ? props.fileNameFormatter(file.name) : file.name,
                base64Body: (await fileToBase64(file)).split(",")[1] || ""
            })
        }
    }

    return <label htmlFor="contained-button-file">
        <Input type="file" ref={inputRef} accept=".txt" multiple={false} onChange={(e) => OnFileUploaded(e)}/>
        <Button
            aria-label="add file"
            color="primary"
            variant={"contained"}
            size="medium"
            onClick={uploadFile}
        >
            {props.title} <Add/>
        </Button>
    </label>
}


const Input = styled.input`
  display: none;
`