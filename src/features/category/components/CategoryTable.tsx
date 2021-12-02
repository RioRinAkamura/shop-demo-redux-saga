import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Box, Button, DialogContentText, Typography } from '@mui/material';
import { Category } from 'models';
import React, { useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { useCategoriesData, useRemoveCategoryData } from '../hooks/useCategoriesData';



export interface CategoryTableProps{

}



const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

const useStyles = makeStyles({
  table: {
  },
  action:{
    cursor:'pointer',

    '&:hover':{
      opacity: .8
    }
  },
});
    

const CategoryTable = () => {
    const history = useHistory();
    const classes = useStyles();
    const match = useRouteMatch();

    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category>();

    const handleClose=()=>{
        setOpen(false);
    }

    const onSuccess = ()=>{} 
    const onError = ()=>{}

    //fetch data
    const {data} = useCategoriesData({onSuccess, onError})
    console.log('data: ',data);
    
    
    //remove
    const {mutate: removeCate} = useRemoveCategoryData()
    const handleRemoveClick=(category: Category)=>{
        setOpen(true)
        setSelectedCategory(category)
        // console.log(category.id);
               
        
    }

    const handleRemoveConfirm=(category: Category)=>{
      // const categoryRemove = {category}
      const categoryId = category.id
      removeCate(categoryId) 
      setOpen(false)
    }


    return (
        <>
        {/* <Button variant="contained" onClick={onRefecthCategories}>Fetch Categories</Button> */}
        <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="h4" >Categories React query</Typography>
                <Link to={`${match.url}/add`} style={{textDecoration:"none"}}>
                  <Button variant="contained" color="primary"> Add Category </Button>
                </Link>
            </Box>
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell align="left">Category id</StyledTableCell>
            <StyledTableCell align="left">Category Name</StyledTableCell>
            <StyledTableCell align="left">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((category: Category, index: number) => (
            <StyledTableRow key={category.id}>
              <StyledTableCell align="left">{index + 1}</StyledTableCell>
              <StyledTableCell align="left">{category.id}</StyledTableCell>
              <StyledTableCell align="left">{category.name}</StyledTableCell>
              <StyledTableCell>
                    <Link to={{
                      pathname:`${match.url}/${category.id}`,
                      state: {category}
                    }}>
                        <EditIcon className={classes.action} color="primary"/>
                    </Link>
                    <DeleteIcon className={classes.action} color="secondary" onClick={()=> handleRemoveClick(category)}/>
            </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    {/* Dialog add edit */}
    <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Remove category?</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you sure to remove category? <br/>
                <b>{selectedCategory?.name} </b>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="inherit" variant="contained">
                    Cancel
                </Button>
                <Button variant="contained" color="secondary" 
                    onClick={()=> handleRemoveConfirm(selectedCategory as Category)}>
                    Remove
                </Button>
            </DialogActions>
        </Dialog>

    </>
    )
}

export default CategoryTable
