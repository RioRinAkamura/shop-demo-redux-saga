import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Product } from 'models';
import { Box, Rating } from '@mui/material';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    // height: '1955px',
    overflow: 'hidden'
  },
  card:{
    margin: '16px 16px 0px 0px',
    boxShadow:  'rgba(0, 0, 0, 0.35) 1.95px 1.95px 2.6px'
  },
  cardAction:{
    display: 'flex', 
    flexDirection:'column' ,
    alignItems:'flex-end', 
    marginBottom: '12px',
    marginRight: '4px'
  },
  rating:{
    
    padding: '0px',
    margin: '0px',
  }
});

interface ContainerProps {
    productList: Product[]
}

const Container = ({productList}: ContainerProps) => {
    const [value, setValue] = React.useState<number | null>(4);
    console.log('productList: ', productList);
    
    const classes = useStyles()

    return (
        <Box style={{marginTop:'64px'}}>
        <Typography variant="h6">Product List</Typography>
        <Box className={classes.root}>
        {productList && productList.map(product =>(
            <Grid key={product.id} xs={12} sm={6} lg={3}>
                <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="200"
                    image={product.thumnailUrl}
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" style={{height: '24px', overflow: 'hidden'}}>
                        {product.name}
                    </Typography>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2" color="textSecondary" component="p">
                            Color: {product.color}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {product.price}$
                        </Typography>
                    </Box>
                    <Box component="fieldset" borderColor="transparent" className={classes.rating}>
                        <Rating value={value} readOnly size='small' />
                    </Box>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardAction} >
                    <Button variant="contained" size="small" color="primary" style={{marginLeft: '0px'}}>
                        Add to card
                    </Button>
                </CardActions>
            </Card>
            </Grid>
        ))}
        </Box>
        </Box>
    )
}

export default Container
