import { createStyles, Theme, makeStyles } from '@material-ui/core'
import { Box, Grid} from '@mui/material'
import CartList from 'components/Cart/CartList'
import CartSummary from 'components/Cart/CartSummary'
import React from 'react'

interface Props {
    
}

const useStyles = makeStyles((theme=> ({

        root:{
            display: 'flex',
            flexGrow: 1,
            justifyContent:'center',
            alignItems: 'center',
            marginTop: '64px',
            marginBottom: '64px'
        },
        cartLeft:{
            height: '344px',
            // backgroundColor: 'red',
            flex: 8,
            padding: '12px'
        },
        cartRight:{
            height: '344px',
            // backgroundColor: 'green',
            flex: 4,
            padding: '12px'
        }
       
    })))

const Cart = (props: Props) => {
    const classes = useStyles()

    return (
        <Grid container className={classes.root}>
            <Grid item className={classes.cartLeft}>
                <CartList/>
            </Grid>
            <Grid item  className={classes.cartRight}>
                <CartSummary />
            </Grid>
        </Grid>
    )
}

export default Cart
