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
import { Button, DialogContentText } from '@mui/material';
import { Category, Product } from 'models';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface ProductTabletProps{
    productList: Product[];
    categoryMap: {
      [key:string] : Category,
    },
    onEdit?: (product: Product) => void,
    onRemove?: (product: Product) => void,
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
  tableContainer:{
    marginTop: '20px',
    // border: '1px solid #999'
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    
  },
  action:{
    cursor:'pointer',

    '&:hover':{
      opacity: .8
    }
  },
});

export default function ProductTable({productList, categoryMap,  onEdit, onRemove}: ProductTabletProps) {
      const classes = useStyles();
      const [open, setOpen] = useState(false);
      const [selectedProduct, setSelectedProduct] = useState<Product>();
      const {t} = useTranslation()

      const handleClose = () => {
        setOpen(false);
      };

      const handleRemoveClick = (product: Product) =>{
        //set selected product
        setSelectedProduct(product)
        //show comfirm dialog
        setOpen(true)
      }

      const handleRemoveConfirm = (product: Product) =>{

        onRemove?.(product)

        setOpen(false)
      }

      return (
        <>
        <TableContainer component={Paper} className={classes.tableContainer}>

    <Table className={classes.table} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>{t("product id")}</StyledTableCell>
          <StyledTableCell align="left">{t("product name")}</StyledTableCell>
          <StyledTableCell align="left">{t("color")}</StyledTableCell>
          <StyledTableCell align="left">{t("Category")}</StyledTableCell>
          <StyledTableCell align="right">{t("price")}($)</StyledTableCell>
          <StyledTableCell align="left">{t("thumnailUrl")}</StyledTableCell>
          <StyledTableCell align="right">{t("actions")}</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {productList.map((product) => (
          <StyledTableRow key={product.id}>
            <StyledTableCell align="left">{product.id}</StyledTableCell>
            <StyledTableCell align="left">{product.name}</StyledTableCell>
            <StyledTableCell align="left">{product.color}</StyledTableCell>
            <StyledTableCell align="left">{categoryMap[product.categoryId]?.name}</StyledTableCell>
            <StyledTableCell align="right">{product.price}</StyledTableCell>
            <StyledTableCell align="right">{product.thumnailUrl}</StyledTableCell>
            <StyledTableCell>
              <EditIcon color="primary" className={classes.action} onClick={()=> onEdit?.(product)}/>&nbsp;
              <DeleteIcon color="secondary" className={classes.action} onClick={()=> handleRemoveClick(product)}/>
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
    </TableContainer>
    
    {/* Remove dialog  */}
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
              <b>{selectedProduct?.name} </b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit" variant="contained">
            Cancel
          </Button>
          <Button variant="contained" color="secondary" 
            onClick={()=> handleRemoveConfirm(selectedProduct as Product)}>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>

    
  );
}

