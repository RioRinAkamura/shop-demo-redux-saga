
import { makeStyles } from "@material-ui/core"
import { Box, Container } from "@mui/material"
import Body from "components/pages/Common/Body"
import BodyByCateId from "components/pages/Common/BodyByCateId"
import Footer from "components/pages/Common/Footer"
import HeaderUser from "components/pages/Common/HeaderUser"
import SidebarUser from "components/pages/Common/SidebarUser"
import { useProductsByCateId, useProductsData } from "components/pages/hooks/useProductsData"
import { useCategoriesData } from "features/category/hooks/useCategoriesData"
import { Product } from "models"
import { Route, Switch, useParams, useRouteMatch } from "react-router"



interface UserProps {
    
}
const useStyles = makeStyles(theme => ({
    root: {
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gridTemplateColumns: '200px 1fr',
        gridTemplateAreas: `"header header" "sidebar container" "footer footer"`,
        minHeight: '100vh',

    },

    header:{
        gridArea: 'header',
        // borderBottom: '1px solid rgba(20, 20, 20, 0.1) ',

    },
    sidebar:{
        gridArea: 'sidebar',
        // backgroundColor: theme.palette.background.paper,
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
    }
}))



interface ParamsType{
    categoryId: string
}


export const User = (props: UserProps) => {
    const match = useRouteMatch()

    const classes = useStyles()

    const onSuccess = ()=>{} 
    const onError = ()=>{}
    //fetch category data using react query
    const {data : categories} = useCategoriesData({onSuccess, onError})
    

    //fetch category data using react query
    const {data : productList} = useProductsData({onSuccess, onError})
    // console.log('productList from user', productList);

    
    

    return (
        <Container>
            <Box className={classes.header}>
                <HeaderUser/>
            </Box>
            <Box className={classes.root}>
                <Box className={classes.sidebar}>
                    <SidebarUser categoryList={categories}/>
                </Box>

                <Box className={classes.container}>
                    
                        <Switch>
                            <Route path="/products/:cateId">
                                <BodyByCateId />
                            </Route>

                            <Route path="/" exact>
                                <Body productList={productList}/>
                            </Route>
                            
                            <Route path="/products" exact>
                                <Body productList={productList}/>
                            </Route>

                            

                            
                        </Switch>

                        {/* <Switch>
                            <Route path="/">
                                <Body productList={productList}/>
                            </Route>
                            {productList.map((product: Product) =>(
                                <Route path={`/products?_name=${product.categoryId}`} key={product.id}>
                                    <Body productList={productList}/>
                                </Route>
                            ))}
                        
                        </Switch> */}
                </Box>

                <Box className={classes.footer}>
                    <Footer />
                </Box>
            </Box>
        </Container>

       
  
    )
}
