
import { TextField } from '@material-ui/core';
import { Box } from '@mui/material';
import React, { InputHTMLAttributes } from 'react'
import { Control, useController } from 'react-hook-form'

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    control: Control<any>;
    label?: string;
}

export const InputField = ({name, control, label, ...inputProps}: InputFieldProps) => {
    const {
        field: {value, onChange, onBlur, ref},
        fieldState: {invalid, error}
        } = useController({ name, control});

    return (
        <Box>
            <TextField 
                size="small"
                fullWidth margin="normal" 
                value={value} 
                label={label} 
                variant="outlined" 
                onChange={onChange}
                onBlur={onBlur}
                inputRef = {ref}
                error={invalid}
                helperText={error?.message}
                inputProps={inputProps}
            />
        </Box>
    )
}
