import { makeStyles } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { Box, Button, Typography } from '@mui/material'
import productApi from 'api/productApi'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selectCategoryList, selectCategoryMap } from 'features/category/categorySlice'
import { ListParams, Product } from 'models'
import { useEffect } from 'react'
import { Link, useRouteMatch, useHistory } from 'react-router-dom'
import ProductFilters from '../components/ProductFilters'
import ProductTable from '../components/ProductTable'
import { productActions, selectProductFilter, selectProductList, selectProductPagination } from '../productSlice'

const useStyles = makeStyles(theme=>({
    root:{

    },
    titleContainer:{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems:' center'
    },
    pagination:{
        display: 'flex',
        justifyContent: 'center',
        margin: '16px 0px'
    }
}))

interface ListPageProps {
    
}

const ListPage = (props: ListPageProps) => {
    const match = useRouteMatch()
    const history = useHistory()

    const classes = useStyles()
    const dispatch = useAppDispatch()
    const productList = useAppSelector(selectProductList)
    const pagination = useAppSelector(selectProductPagination)
    const filter = useAppSelector(selectProductFilter)
    const categoryMap = useAppSelector(selectCategoryMap)
    const categoryList = useAppSelector(selectCategoryList)

    useEffect(()=>{
        dispatch(productActions.fetchProductList(filter))
    },[dispatch, filter])

    const handlePageChange=(e: any, page: number)=>{
        dispatch(productActions.setFilter({
            ...filter,
            _page: page,
        }))
    }

    const handleSearchChange = (newFilter: ListParams)=>{
        dispatch(productActions.setFilterWithDebounce(newFilter))
    }

    const handleCategoryChange = (newFilter: ListParams)=>{
        dispatch(productActions.setFilter(newFilter))
    }

    const handleRemoveProduct = async (product: Product )=>{
        console.log('handle remove product', product);
        try {
            //Remove prodtuc Api
            await productApi.remove(product?.id || '');

            const newFilter = {...filter}
            dispatch(productActions.setFilter(newFilter))

        } catch (error) {
            //Toast error
            console.log('Failed to fetch product', error);
            
        }
        
    }

    const handleEditProduct = async(product: Product)=>{
        history.push(`${match.url}/${product.id}`)
    }

    return (
        <Box className={classes.root}>
            <Box className={classes.titleContainer}>
                <Typography variant="h4">Products</Typography>

                <Link to={`${match.url}/add`} style={{textDecoration: 'none'}}>
                    <Button variant="contained" color="primary">Add Product</Button>
                </Link>

            </Box>
            
                <Box mb={2}>
                    <ProductFilters 
                        filter={filter} 
                        categoryList={categoryList} 
                        onSearchChange={handleSearchChange}
                        onChange={handleCategoryChange}    
                    />
                </Box>
            


            {/* Product table */}
            <ProductTable productList={productList} categoryMap={categoryMap} onRemove={handleRemoveProduct} onEdit={handleEditProduct}/>

            {/* Pagination */}
            <Box className={classes.pagination}>
                <Pagination 
                    color="primary"
                    shape="rounded"
                    count={Math.ceil(pagination._totalRows / pagination._limit)} 
                    page={pagination._page} 
                    onChange={handlePageChange} 
                />
            </Box>
        </Box>
    )
}

export default ListPage
