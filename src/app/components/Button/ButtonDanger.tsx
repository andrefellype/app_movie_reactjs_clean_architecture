/* eslint-disable no-console */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import Button, { ButtonProps } from '@mui/material/Button'
import { styled } from "@mui/material/styles"
import { red } from "@mui/material/colors"
import IconList from "../IconList"

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
        backgroundColor: red[700],
    },
}))

export default class ButtonDanger extends React.Component<{
    title?: string, iconStart?: string, iconStartSize?: 'inherit' | 'large' | 'medium' | 'small', titleIcon?: string, iconTitleSize?: 'inherit' | 'large' | 'medium' | 'small', isFullWidth?: boolean, isDisabled?: boolean, valueVariant?: 'text' | 'outlined' | 'contained', sizeBtn?: 'small' | 'medium' | 'large', actionClick?: () => void | null, style?: object
}> {

    render() {
        const { title = "", iconStart = "", iconStartSize = "small", titleIcon = "", iconTitleSize = "small", isFullWidth = false, isDisabled = false, valueVariant = "contained", sizeBtn = "small", actionClick = null, children, ...other } = this.props

        return (
            <ColorButton variant={valueVariant} fullWidth={isFullWidth} disabled={isDisabled} startIcon={iconStart ? <IconList icon={iconStart} sizeIcon={iconStartSize} /> : ""}
                size={sizeBtn} onClick={actionClick !== null ? actionClick : () => { console.log("ButtonDanger Click") }} {...other}>
                {titleIcon && <IconList icon={titleIcon} sizeIcon={iconTitleSize} />}{title}
                {children}
            </ColorButton>
        )
    }
}