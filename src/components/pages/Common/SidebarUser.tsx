
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Typography } from '@mui/material';
import { Category } from 'models';
import React from 'react';



interface SidebarUserProps {
    categoryList : Category[]
}

function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
  return <ListItem button component="a" {...props} />;
}

const SidebarUser = ({categoryList}: SidebarUserProps) => {
   
    return (
        <Box style={{marginTop: '64px'}}>
            <Typography mb={2} mt={1}>Filter</Typography>
            <Divider/>
            <Typography mt={2}>Categories</Typography>
            <Box>
                <List component="nav" aria-label="main mailbox folders">
                    {categoryList && categoryList.map((category : Category, index:number) => (
                        <ListItem button key={category.id}>
                            <ListItemText primary={category.name} />
                        </ListItem>
                    ))}

                </List>
            </Box>
        </Box>
    )
}

export default SidebarUser
