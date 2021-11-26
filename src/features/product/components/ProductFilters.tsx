import { InputBase, InputLabel, makeStyles, Paper, Select, Box, FormControl, Grid, IconButton, MenuItem, Button } from '@material-ui/core'
import { Category, ListParams } from 'models'
import React, { ChangeEvent, FormEvent, useRef } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import LayersClearIcon from '@material-ui/icons/LayersClear';
import { useTranslation } from 'react-i18next';


export interface ProductFiltersProps {
    filter: ListParams;
    categoryList : Category[];
    onChange?: (newFilter: ListParams) => void;
    onSearchChange?: (newFilter: ListParams) => void;
}

const useStyles = makeStyles(theme=>({
    root:{},
    search:{
        display: 'flex',
        justifyContent: 'space-between',
        border: '1px solid #999',
    },
    input:{
        width: '100%',
        padding: '4px 12px'
    },
    searchIcon:{
        padding: '4px 12px'
    },
    selectCategory:{
        border: '1px solid #999',
    }
}))

const ProductFilters = ({filter, categoryList, onChange, onSearchChange}: ProductFiltersProps) => {
    const classes = useStyles()
    const searchRef = useRef<HTMLInputElement>()
    const {t} = useTranslation()
    
    const handleSearchChange=(e: ChangeEvent<HTMLInputElement>)=>{
        if (!onSearchChange) return;

        const newFilter : ListParams ={
            ...filter,
            name_like: e.target.value,
            _page: 1
        }

        onSearchChange(newFilter)
    }

    const handleSearch =(e: FormEvent<HTMLInputElement>)=>{
        e.preventDefault()
        
    }

    const handleCategoryChange =(e: ChangeEvent<{name?:string; value: unknown}>) => {
        if(!onChange) return;

        const newFilter: ListParams ={
            ...filter,
            categoryId: e.target.value || undefined,
            _page: 1
        }

        onChange(newFilter);
    }

    const handleSortChange = (e: ChangeEvent<{name?:string; value: unknown}>)=>{
        if(!onChange) return;

        const value=e.target.value;
        const [_sort, _order] = (value as string).split('.')
        const newFilter: ListParams ={
            ...filter,
            _sort: _sort || undefined,
           _order: (_order as 'asc' | 'desc') || undefined,
        }

        onChange(newFilter);
    }

    const handleClearFilter =()=>{
        if(!onChange) return

        const newFilter: ListParams ={
            ...filter,
            _page : 1,
            name_like: undefined,
            categoryId: undefined,
            _sort: undefined,
            _order:  undefined,
        }
       

        onChange(newFilter);
        if(searchRef.current){
            searchRef.current.value= '';
        }
    }

    

    return (
        <Box mt={2}>
            <Grid container spacing={3} justifyContent="space-between">

                {/* Search by product name */}
                <Grid item xs={12} md={6}>
                    {/* Search */}
                    <Paper component="form" className={classes.search} onSubmit={handleSearch}>
                        <InputBase
                            placeholder={t("search product")}
                            className={classes.input}
                            defaultValue={filter.name_like || ''}
                            onChange = {handleSearchChange}
                            inputRef={searchRef}
                        />
                        <IconButton type="submit"  aria-label="search" className={classes.searchIcon}>
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Grid>

                {/* Filter by category */}
                <Grid item xs={12} md={2} lg={2}>
                    <FormControl variant="outlined" fullWidth size="small">
                        <InputLabel id="demo-simple-select-outlined-label">{t("categories")}</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={filter.categoryId || ''}
                            onChange={handleCategoryChange}
                            label="Category"
                        >
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        {categoryList.map(category =>(
                            <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Sort by price */}
                <Grid item xs={12} md={2} lg={2}>
                    <FormControl variant="outlined" fullWidth size="small">
                        <InputLabel id="sortBy">{t("sortBy")}</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
                            onChange={handleSortChange}
                            label={t("sortBy")}
                        >
                        <MenuItem value="">
                            <em>{t("No sort")}</em>
                        </MenuItem>
                            <MenuItem value="name.asc" >{t("Name A-Z")}</MenuItem>
                            <MenuItem value="name.desc" >{t("Name Z-A")}</MenuItem>
                            <MenuItem value="price.asc" >{t("Price ASC")}</MenuItem>
                            <MenuItem value="price.desc" >{t("Price DESC")}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                {/* Cleart Filter */}
                <Grid item xs={12} md={2} lg={2}>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<LayersClearIcon />}
                        fullWidth
                        onClick={handleClearFilter}
                    >
                        {t("Clear Filter")}
                    </Button>
                    
                </Grid>
            </Grid>
        </Box>
    )
}

export default ProductFilters
