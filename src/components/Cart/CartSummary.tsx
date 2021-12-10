import { makeStyles, Paper } from '@material-ui/core'
import { Box, Button, Typography } from '@mui/material'
import React from 'react'

interface Props {
    
}
const useStyles = makeStyles({
    root:{
        marginTop: '12px',
        textAlign:'center'
    },
    summaryContent:{
        padding: "12px"
    }
})

const CartSummary = (props: Props) => {
    const classes = useStyles()
    return (
        <Box>
            <Typography variant="h5">Cart summary</Typography>
            <Paper elevation={3} className={classes.root}>
                <Box className={classes.summaryContent}>
                    <Typography variant="h6">Total:  ($) </Typography>
                    <Button variant="contained" color="primary">Process to checkout</Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default CartSummary
