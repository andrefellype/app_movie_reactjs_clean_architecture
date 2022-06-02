/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prefer-stateless-function */
import React from "react"
import { TextField, FormControl, MenuItem } from "@mui/material"

export default class FormControlFieldSelect extends React.Component<{
    labelValue?: string, sizeValue?: "small" | "medium", variantValue?: "standard" | "filled" | "outlined", valueDefault?: string | number | boolean | null, isDisabled?: boolean,
    InputProps?: any | null, selectList: { label: string, value: any }[], onChangeForm?: (e) => void, style?: any, isMultiline?: boolean, totalRows?: number
}> {
    render() {

        const { labelValue, sizeValue = "small", variantValue = "outlined", isDisabled = false, valueDefault, onChangeForm, isMultiline = false, totalRows = 1, selectList, ...other } = this.props

        return (
            <FormControl fullWidth>
                <TextField size={sizeValue} variant={variantValue} multiline={isMultiline} maxRows={totalRows} disabled={isDisabled} label={labelValue} value={valueDefault} select onChange={onChangeForm} {...other}>
                    {selectList.map((option, key) => (
                        <MenuItem key={key} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </FormControl>
        )
    }
}
