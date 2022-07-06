/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prefer-stateless-function */
import React from "react"
import { TextField, FormControl } from "@mui/material"

export default class FormControlField extends React.Component<{
    labelValue?: string, sizeValue?: "small" | "medium", typeField?: string,
    variantValue?: "standard" | "filled" | "outlined", isDisabled?: boolean,
    valueDefault?: string | number | boolean | null, InputProps?: object, onChangeForm?: (e) => void,
    style?: object, isMultiline?: boolean, totalRows?: number
}> {
    render() {
        const {
            labelValue, sizeValue = "small", typeField, variantValue = "outlined",
            valueDefault, isDisabled = false, onChangeForm, isMultiline = false, totalRows = 1, ...other
        } = this.props

        return (
            <FormControl fullWidth>
                <TextField type={typeField} multiline={isMultiline} size={sizeValue} variant={variantValue}
                    disabled={isDisabled} label={labelValue}
                    value={!isDisabled ? valueDefault : ""} onChange={onChangeForm} maxRows={totalRows} {...other} />
            </FormControl>
        )
    }
}