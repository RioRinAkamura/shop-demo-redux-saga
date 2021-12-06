import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Category, Product } from 'models';
import { Box, Rating } from '@mui/material';
import { Grid, createTheme } from '@material-ui/core';
import { useProductsByCateId, useProductsPaginated } from '../hooks/useProductsData';
import { Pagination } from '@material-ui/lab';
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router';
import axios from 'axios';

const theme = createTheme();
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    // height: '1955px',
    overflow: 'hidden'
  },
  card:{
    // padding: theme.spacing(1),
    margin: '0px 16px 16px 0px',
    boxShadow:  'rgba(0, 0, 0, 0.35) 1.95px 1.95px 2.6px',
  },
  cardAction:{
    display: 'flex', 
    flexDirection:'column' ,
    alignItems:'flex-end', 
    marginBottom: '8px',
    marginRight: '4px'
  },
  rating:{
    
    padding: '0px',
    margin: '0px',
  },
  pagination:{
      width: '100%',
    display: 'flex',
    justifyContent: 'center',
    margin: '16px 0px'
}
});


interface ContainerProps {
    productList?: Product[]
    
}

interface CateParam{
    cateId: string
}
interface PageNumber{
    pageDefault: number
}

const Body = ({productList}: ContainerProps) => {
    const history= useHistory()

    const location = useLocation()
    

    function useQuery() {
        return new URLSearchParams(location.search);
      }
      const page = parseInt(useQuery().get("_page") || "1");

      console.log('search page: ', page);

    const [value, setValue] = React.useState<number | null>(4);

    const [pageNumberProduct, setPageNumberProduct] = useState(1)

    const {data: listProductPaginated} = useProductsPaginated(pageNumberProduct)
    

    
    const classes = useStyles()

    const handlePageChange= (event: React.ChangeEvent<unknown>, value: number) => {
        setPageNumberProduct(value);
        history.push(`/products?_page=${value}`)
      };

    return (
        <Box style={{marginTop:'64px'}}>
        <Typography variant="h6">Product List</Typography>
        <Box className={classes.root}>

            
        {listProductPaginated?.data && listProductPaginated?.data.map((product : Product) =>(
            <Grid item key={product.id} xs={12} sm={6} lg={3}>
                <Card className={classes.card} >
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
                <CardActions className={classes.cardAction}>
                    <Button variant="contained" size="small" color="primary" style={{marginLeft: '0px'}}>
                        Add to card
                    </Button>
                </CardActions>
            </Card>
            </Grid>
        ))}

         <Box className={classes.pagination}>
                <Pagination 
                    
                    color="primary"
                    shape="rounded"
                    count={Math.ceil(listProductPaginated?.pagination._totalRows / listProductPaginated?.pagination._limit)} 
                    page={page} 
                    onChange={handlePageChange}
                />
            </Box>
        </Box>
        </Box>
    )
}

export default Body
