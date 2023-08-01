import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface DropDownMenuProps {
  choices: string[]; // Replace number[] with the actual type of the choices array
  name: string;
  onChange: (selectedOption: string) => void; // Function to handle the change event
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ choices, name, onChange }) => {
  const [selectedOption, setSelectedOption] = React.useState(choices[0]); // Set the default value to the first option in the choices array

  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value as string;
    setSelectedOption(selectedValue);
    onChange(selectedValue); // Call the onChange function passed from the parent component
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{name}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedOption}
          label="Options"
          onChange={handleChange}
        >
          {choices.map((choice) => (
            <MenuItem key={choice} value={choice}>
              {choice}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropDownMenu;
