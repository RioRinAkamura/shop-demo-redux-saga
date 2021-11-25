
import { Box } from '@material-ui/core';
import { HomeWork, ImportContacts, PhoneAndroid, SportsBaseball } from '@material-ui/icons';
import { Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import ProductCheapList from './components/ProductCheapList';
import ProductRankingList from './components/ProductRankingList';
import StatisticItem from './components/StatisticItem';
import Widget from './components/Widget';
import { dashboardActions, selectDashboardLoading, selectDashboardStatistics, selectHighestProductList, selectLowestProductList } from './dashboardSlice';

interface Props {
  
}

const Dashboard = (props: Props) => {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectDashboardLoading)
  const statistics = useAppSelector(selectDashboardStatistics)
  const highestProductList = useAppSelector(selectHighestProductList)
  const lowestProductList = useAppSelector(selectLowestProductList)

  console.log({
    loading, statistics, highestProductList, lowestProductList
  });
  
  
  useEffect(()=>{
    dispatch(dashboardActions.fetchData())
  },[dispatch])

  return (
    <Box>
      {/* Static section */}
      <Grid container spacing={3}>

        <Grid item xs={12} md={6} lg={3} xl={3}>
          <StatisticItem 
          icon={<HomeWork fontSize="large" color="primary"/>} 
          label="Home product" 
          value={statistics.homeCount}
          
          />
          
        </Grid>

        <Grid item xs={12} md={6} lg={3} xl={3}>
          <StatisticItem 
          icon={<PhoneAndroid fontSize="large" color="primary"/>} 
          label="Electonic Product" 
          value={statistics.electronicCount}/>
        
        </Grid>

        <Grid item xs={12} md={6} lg={3} xl={3}>
          <StatisticItem 
          icon={<ImportContacts fontSize="large" color="primary"/>} 
          label="Book Product" 
          value={statistics.bookCount}/>
        
        </Grid>

        <Grid item xs={12} md={6} lg={3} xl={3}>
          <StatisticItem 
          icon={<SportsBaseball fontSize="large" color="primary"/>} 
          label="Sport Product" 
          value={statistics.sportCount}/>
        </Grid>

        
      </Grid>

      {/* Product ranking */}
      <Box mt={4}>
        <Typography variant="h4">Product</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <Widget title="Top expensive Products">
              <ProductRankingList productList={highestProductList}/>
            </Widget>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Widget title="Top cheap Products">
              <ProductCheapList productList={lowestProductList}/>  
            </Widget>
          </Grid>
        </Grid>
      </Box>

    </Box>
  )
}

export default Dashboard

