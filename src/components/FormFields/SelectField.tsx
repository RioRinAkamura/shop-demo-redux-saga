
import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@material-ui/core';
import { Control, useController } from 'react-hook-form';

export interface SelectOption{
    label?: string;
    value: string | number;
}

export interface SelectFieldProps {
    name: string;
    control: Control<any>;
    label?: string;
    disabled?: boolean;
    options: SelectOption[];
}

export const SelectField = ({name, control, label, disabled, options}: SelectFieldProps) => {
    const {
        field: {value, onChange, onBlur},
        fieldState: {invalid, error}
        } = useController({ name, control});

    return (
        <FormControl variant="outlined" fullWidth size="small" disabled={disabled} margin="normal" error={invalid}>
            <InputLabel id={`${name}_label`}>{label}</InputLabel>
            <Select
                labelId={`${name}_label`}
                value={value || ''}
                onChange={onChange}
                onBlur={onBlur}
                label={label}
            >
                {options.map(option=>(
                    <MenuItem key={option.value} value={option.value} >{option.label}</MenuItem>
                ))}               
            </Select>
            <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    )
}
