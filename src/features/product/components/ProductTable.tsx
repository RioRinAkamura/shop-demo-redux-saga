import React from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Product } from 'models';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { LinearProgress } from '@material-ui/core';

export interface ProductTabletProps{
    productList: Product[];
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
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
  },
  action:{
    cursor:'pointer',

    '&:hover':{
      opacity: .8
    }
  },
});

export default function ProductTable({productList, onEdit, onRemove}: ProductTabletProps) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>

      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Product ID</StyledTableCell>
            <StyledTableCell align="left">Product name</StyledTableCell>
            <StyledTableCell align="left">Color</StyledTableCell>
            <StyledTableCell align="left">CategoryId</StyledTableCell>
            <StyledTableCell align="right">Price($)</StyledTableCell>
            <StyledTableCell align="left">ThumnailUrl</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productList.map((product) => (
            <StyledTableRow key={product.id}>
              <StyledTableCell align="left">{product.id}</StyledTableCell>
              <StyledTableCell align="left">{product.name}</StyledTableCell>
              <StyledTableCell align="left">{product.color}</StyledTableCell>
              <StyledTableCell align="left">{product.categoryId}</StyledTableCell>
              <StyledTableCell align="right">{product.price}</StyledTableCell>
              <StyledTableCell align="right">{product.thumnailUrl}</StyledTableCell>
              <StyledTableCell>
                <EditIcon color="primary" className={classes.action} onClick={()=> onEdit?.(product)}/>&nbsp;
                <DeleteIcon color="secondary" className={classes.action} onClick={()=> onRemove?.(product)}/>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

