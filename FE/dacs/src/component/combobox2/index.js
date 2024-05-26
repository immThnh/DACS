import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/system';
import styles from './Combobox.module.scss';

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  padding: '0 10px 0 0',
  marginRight: theme.spacing(1),
}));

const StockDropdown = ({ options, handleSelectChange }) => {
  return (
    <Autocomplete
      multiple
      options={options}
      disableCloseOnSelect
      getOptionLabel={(option) => option.label}
      onChange={(event, value) => handleSelectChange(value)}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <StyledCheckbox checked={selected} />
          {option.label}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label="Category" placeholder="Select category" />
      )}
      className={styles.dropdown}
    />
  );
};

export default StockDropdown;
