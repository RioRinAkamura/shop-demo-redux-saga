import { createStyles, ListItemText, makeStyles, Theme } from '@material-ui/core'
import { Grid, List, ListItem, Typography } from '@mui/material'
import React from 'react'

interface FooterProps {
    
}
const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    borderTop: '1px solid rgba(20, 20,20 , 0.3',
    textAlign: 'center',
    height: '64px',
    },
    content:{
        display:'flex',
        justifyContent: 'center',
        textAlign: 'center',
    }
}))

const Footer = (props: FooterProps) => {
    const classes = useStyles()

    return (
        
            <Grid container className={classes.root}>
                <Grid item xs={12} sm={12} md ={12} lg={12} className={classes.content}>
                    {/* <Typography>Shop</Typography>
                    <List>
                        <ListItem>
                            <ListItemText>
                                About us
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                About us
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                About us
                            </ListItemText>
                        </ListItem>
                    </List> */}
                    <Typography style={{textAlign: 'center'}}>
                        © 2021 - Aka shop
                    </Typography>
                </Grid>
            </Grid>
      
    )
}

export default Footer
