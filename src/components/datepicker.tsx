import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
export default function DatePickerValue(props: {
  label: string;
  useState: [Date | null, (value: Date | null) => void];
}) {
  const [value, setValue] = props.useState;

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={props.label}
          value={value ? dayjs(value) : null}
          onChange={(newValue) => setValue(newValue ? newValue.toDate() : null)}
        />
      </LocalizationProvider>
    </div>
  );
}
