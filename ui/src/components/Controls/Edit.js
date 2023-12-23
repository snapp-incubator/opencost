import { makeStyles } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
  
import React from 'react';

import SelectWindow from '../SelectWindow';

const useStyles = makeStyles({
  wrapper: {
    display: 'inline-flex',
  },
  formControl: {
    margin: 8,
    minWidth: 120,
  },
});



function EditControl({
  windowOptions, window, setWindow,
  aggregationOptions, aggregateBy, setAggregateBy,
  accumulateOptions, accumulate, setAccumulate,
  setLabel,label,labelOptions,
  currencyOptions, currency, setCurrency,
}) {
  const classes = useStyles();

  const handleAggregateByChange = (event) => {
    const {
      target: { value },
    } = event;
    setAggregateBy( typeof value === 'string' ? value.split(',') : value,);
  }

  return (
    <div className={classes.wrapper}>
      <SelectWindow
        windowOptions={windowOptions}
        window={window}
        setWindow={setWindow} />
      <FormControl className={classes.formControl}>
        <InputLabel id="aggregation-select-label">Breakdown</InputLabel>
        <Select
          id="aggregation-select"
          multiple={true}
          value={aggregateBy}
          MenuProps={{
            PaperProps: {
              style: {
                width: 250,
              },
            },
          }}
          onChange={handleAggregateByChange}
          renderValue={(selected) =>
            Array.isArray(selected) ? selected.join(', ') : selected
          }
        >
          {aggregationOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              <Checkbox checked={aggregateBy.indexOf(opt.value) > -1} />
              <ListItemText primary={opt.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="accumulate-label">Resolution</InputLabel>
        <Select
          id="accumulate"
          value={accumulate}
          onChange={e => setAccumulate(e.target.value)}
        >
          {accumulateOptions.map((opt) => <MenuItem key={opt.value} value={opt.value}>{opt.name}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="team-label">Label</InputLabel>
        <Select
          id="team-label"
          value={label}
          onChange={e => setLabel(e.target.value)}
        >
          {labelOptions.map((opt) => <MenuItem key={opt.value} value={opt.value}>{opt.name}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="currency-label">Currency</InputLabel>
        <Select
          id="currency"
          value={currency}
          onChange={e => setCurrency(e.target.value)}
        >
          {currencyOptions?.map((currency) => (
            <MenuItem key={currency} value={currency}>
              {currency}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default React.memo(EditControl);
