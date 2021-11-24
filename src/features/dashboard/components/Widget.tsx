
import { makeStyles, Paper } from '@material-ui/core'
import { Box, Typography } from '@mui/material'
import React from 'react'

const useStyles = makeStyles(theme =>({
    root: {
        padding: theme.spacing(2,3),
        border:  `1px solid ${theme.palette.divider}`,
        borderRadius: '10px'
    }
}))

export interface WidgetProps {
    title: string;
    children: any;
}

const Widget = ({title, children}: WidgetProps) => {
    const classes = useStyles()
    return (
        <Paper className={classes.root}>
            <Typography variant="button">{title}</Typography>
            <Box mt={2}>
                {children}
            </Box>
            
        </Paper>
    )
}

export default Widget
