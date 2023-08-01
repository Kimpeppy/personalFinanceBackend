
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState, ChangeEvent } from 'react';

interface TransactionsInputProps {
  onNameChange: (name: string) => void;
}

const TransactionsInput: React.FC<TransactionsInputProps> = ({ onNameChange }) => {
  const [nameOfTransaction, setNameOfTransaction] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setNameOfTransaction(name);
    onNameChange(name); // Notify the parent component about the change
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Transaction Name"
        variant="outlined"
        value={nameOfTransaction}
        onChange={handleInputChange}
      />
    </Box>
  );
}

export default TransactionsInput;
