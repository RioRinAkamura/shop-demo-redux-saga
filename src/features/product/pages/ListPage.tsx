import { makeStyles } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { Box, Button, Typography } from '@mui/material'
import { flexbox } from '@mui/material/node_modules/@mui/system'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import  { useEffect } from 'react'
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
    const classes = useStyles()
    const dispatch = useAppDispatch()
    const productList = useAppSelector(selectProductList)
    const pagination = useAppSelector(selectProductPagination)
    const filter = useAppSelector(selectProductFilter)

    useEffect(()=>{
        dispatch(productActions.fetchProductList(filter))
    },[dispatch, filter])

    const handlePageChange=(e: any, page: number)=>{
        dispatch(productActions.setFilter({
            ...filter,
            _page: page,
        }))
    }

    return (
        <Box className={classes.root}>
            <Box className={classes.titleContainer}>
                <Typography variant="h5">Products</Typography>
                <Button variant="contained" color="primary">Add Product</Button>
            </Box>
            {/* Product table */}
            <ProductTable productList={productList} />

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
