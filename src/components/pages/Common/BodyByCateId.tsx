import { createTheme, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Pagination } from '@material-ui/lab';
import { Box, Rating } from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import { cartActions } from 'components/Cart/cartSlice';
import { Product } from 'models';
import React, { useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import { useProductsByCateId, useProductsPaginated } from '../hooks/useProductsData';

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

const BodyByCateId = ({productList}: ContainerProps) => {
    const dispatch = useAppDispatch()
    const classes = useStyles()
    const history= useHistory()
    const location = useLocation()
    const {cateId} = useParams<CateParam>()
    const pageNumber = parseInt(useQuery().get("_page") || "1");

    const {data: listProductbyCateId} = useProductsByCateId({categoryId : cateId, pageNumber})
    // console.log('listProductbyCateId', listProductbyCateId);
    const [pageNumberProduct, setPageNumberProduct] = useState(1)
    const [value, setValue] = React.useState<number | null>(4);

    
    function useQuery() {
        return new URLSearchParams(location.search);
      }


    const handlePageChange= (event: React.ChangeEvent<unknown>, value: number) => {
        console.log(value);
        
        setPageNumberProduct(value);
        history.push(`/categories/${cateId}?_page=${value}`)
      };

      const handleClickProduct =(product: Product)=>{
        history.push(`/products/${product.id}`)
    }



    return (
        <Box style={{marginTop:'64px'}}>
        <Typography variant="h6">Product List</Typography>
        <Box className={classes.root}>

            
        {listProductbyCateId?.data && listProductbyCateId?.data.map((product : Product) =>(
            <Grid item key={product.id} xs={12} sm={6} lg={3}>
                <Card className={classes.card} >
                    <CardActionArea onClick={()=> handleClickProduct(product)}>
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
                    <Button 
                    variant="contained" 
                    size="small" color="primary" 
                    style={{marginLeft: '0px'}}
                    onClick={() => dispatch(cartActions.addToCart(product.id))}
                    >
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
                    count={Math.ceil(listProductbyCateId?.pagination._totalRows / listProductbyCateId?.pagination._limit)} 
                    page={pageNumber} 
                    onChange={handlePageChange}
                />
            </Box>
        </Box>
        </Box>
    )
}

export default BodyByCateId
