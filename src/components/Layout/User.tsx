
import { makeStyles } from "@material-ui/core"
import { Box } from "@mui/material"
import { useAppSelector } from "app/hooks"
import Container from "components/pages/Common/Container"
import Footer from "components/pages/Common/Footer"
import HeaderUser from "components/pages/Common/HeaderUser"
import SidebarUser from "components/pages/Common/SidebarUser"
import { useProductsData } from "components/pages/hooks/useProductsData"
import { useCategoriesData } from "features/category/hooks/useCategoriesData"
import { selectProductList } from "features/product/productSlice"



interface UserProps {
    
}
const useStyles = makeStyles(theme => ({
    root: {
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gridTemplateColumns: '250px 1fr',
        gridTemplateAreas: `"header header" "sidebar container" "footer footer"`,
        minHeight: '100vh',

    },

    header:{
        gridArea: 'header',
        // borderBottom: '1px solid rgba(20, 20, 20, 0.1) ',

    },
    sidebar:{
        gridArea: 'sidebar',
        backgroundColor: theme.palette.background.paper,
        borderRight: '1px solid rgba(20, 20, 20, 0.2)',
        padding: theme.spacing(2,3),



    },
    container:{
        gridArea: 'container',
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2,3)
    },
    footer:{
        gridArea: 'footer',
        backgroundColor: 'red'
    }
}))






export const User = (props: UserProps) => {

    const classes = useStyles()

    const onSuccess = ()=>{} 
    const onError = ()=>{}
    //fetch category data using react query
    const {data : categories} = useCategoriesData({onSuccess, onError})
    

    //fetch category data using react query
    const {data : productList} = useProductsData({onSuccess, onError})
    // console.log('productList from user', data);
    

    return (
        <Box className={classes.root}>
            <Box className={classes.header}>
                <HeaderUser/>
            </Box>

            <Box className={classes.sidebar}>
                <SidebarUser categoryList={categories}/>
            </Box>

            <Box className={classes.container}>
                <Container productList={productList}/>
            </Box>

            <Box className={classes.footer}>
                <Footer />
            </Box>
        </Box>
    )
}
