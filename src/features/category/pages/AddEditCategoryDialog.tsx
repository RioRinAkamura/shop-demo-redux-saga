import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import { Button, DialogContentText } from '@mui/material'
import { Category } from 'models';
import React, { useState } from 'react'

interface AddEditCategoryDialogProps {
    categoryList: Category[];
    onEdit?: (category: Category) => void;
    onRemove?: (category: Category) => void;
}

const AddEditCategory = () => {
        const [open, setOpen] = useState(false);
        const [selectedCategory, setSelectedCategory] = useState<Category>();

        const handleClose=()=>{
            setOpen(false);
        }
        

        const handleRemoveConfirm=(category: Category)=>{
            // onRemove?.(category)
            // setOpen(false)
        }

    return (
        
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
    )
}

export default AddEditCategory
