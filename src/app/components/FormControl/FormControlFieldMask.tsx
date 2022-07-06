/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prefer-stateless-function */
import React from "react"
import { TextField, FormControl } from "@mui/material"
import InputMask from "react-input-mask"

export default class FormControlFieldMask extends React.Component<{
    labelValue?: string, sizeValue?: "small" | "medium", typeField?: string, valueMask: string,
    variantValue?: "standard" | "filled" | "outlined", isDisabled?: boolean, valueDefault?: any | null,
    InputProps?: object, onChangeForm?: (e) => void, style?: any, isMultiline?: boolean, totalRows?: number
}> {
    render() {
        const {
            labelValue, sizeValue = "small", typeField, isDisabled = false, valueMask, variantValue = "outlined",
            valueDefault, onChangeForm, isMultiline = false, totalRows = 1, ...other
        } = this.props

        return (
            <FormControl fullWidth>
                <InputMask type={typeField} mask={valueMask} value={!isDisabled ? valueDefault : ""}
                    disabled={isDisabled} onChange={onChangeForm} maxRows={totalRows} multiline={isMultiline}>
                    {() => <TextField size={sizeValue} variant={variantValue} label={labelValue} {...other} />}
                </InputMask>
            </FormControl>
        )
    }
}