import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import type { DropdownProps } from '../types';

export default function Dropdown(props: DropdownProps) {
  const [data, setData] = props.useState;
  const handleChange = (event: SelectChangeEvent<typeof data>) => {
    const {
      target: { value },
    } = event;
    setData(typeof value === 'string' ? value.split(',') : value);
  };
  return (
    <div className="w-full">
      <FormControl className="w-full">
        <InputLabel id="demo-multiple-chip-label">{props.title}</InputLabel>
        <Select
          multiple
          value={data}
          onChange={handleChange}
          input={<OutlinedInput label={props.title} />}
          renderValue={(selected) => (
            <div className="flex flex-wrap gap-2">
              {selected.length > 1 ? (
                <>
                  <Chip key={selected[0]} label={selected[0]} />
                  <Chip label="..." />
                </>
              ) : (
                selected.map((value) => <Chip key={value} label={value} />)
              )}
            </div>
          )}
          className="w-full"
        >
          {props.options.map((option: string) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
