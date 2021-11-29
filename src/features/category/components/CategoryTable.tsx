import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
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
import { AxiosResponse } from 'axios';
import { Category } from 'models';
import React, { useState } from 'react';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import { useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';



export interface CategoryTableProps{
    categoryList: Category[],
    refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<AxiosResponse<any, any>, unknown>>

    onEdit?: (category: Category) => void;
    onRemove?: (category: Category) => void;
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
    

const CategoryTable = ({ categoryList, refetch, onEdit, onRemove } : CategoryTableProps ) => {
    const history = useHistory();
    const classes = useStyles();
    const match = useRouteMatch();

    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category>();

    const handleClose=()=>{
        setOpen(false);
    }
    

    const handleRemoveConfirm=(category: Category)=>{
        onRemove?.(category)
        setOpen(false)
    }

    const handleRemoveClick=(category: Category)=>{
        setOpen(true)
    }

    const handleEditClick= async(category: Category)=>{
      history.push(`${match.url}/${category.id}`)
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
          {categoryList && categoryList.map((category, index) => (
            <StyledTableRow key={category.id}>
              <StyledTableCell align="left">{index + 1}</StyledTableCell>
              <StyledTableCell align="left">{category.id}</StyledTableCell>
              <StyledTableCell align="left">{category.name}</StyledTableCell>
              <StyledTableCell>
                    <EditIcon className={classes.action} color="primary" onClick={()=> handleEditClick(category)}/>&nbsp;
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
            <DialogTitle id="alert-dialog-title">Remove product?</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you sure to remove product? <br/>
                <b>{selectedCategory?.name} </b>
                <TextField
                  autoFocus
                  margin="dense"
                  id="categoryId"
                  label="categoryId"
                  type="text"
                  fullWidth
                  value={selectedCategory?.id}
                />
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
