import React, {useEffect, useState} from "react";
import {Box, Switch, FormControlLabel} from '@mui/material';
import {getStorage, setStorage} from "../lib/storage"
import toast, {Toaster} from 'react-hot-toast';

interface Props {
  name: string
  label: string
}

const MySwitch: React.VFC<Props> = (props) => {
  if (props.name === "") {
    console.log("props.name is empty!");
    return <Box>Error!</Box>
  }
  const [disabled, setDisabled] = useState(true);
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    const get = async () => {
      // 存在しない場合はオフ
      setChecked((await getStorage(props.name) as boolean) || false);
      setDisabled(false);
      toast.success('Switch read!', {duration: 4000, position: 'top-right'});
    };
    get();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name: string = event.target.name;
    const checked: boolean = event.target.checked;
    setChecked(checked);
    (async () => {
      await setStorage(name, checked);
      toast.success('Saved!', {duration: 4000, position: 'top-right'});
    })();
  };
  return (
    <FormControlLabel
      control={
        <Switch
          name={props.name}
          onChange={handleChange}
          disabled={disabled}
          checked={checked}
        />}
      label={props.label} />
  )
};


export const ToggleSettings: React.VFC = () => {
  return (
    <Box>
      <Toaster />
      <MySwitch name="onTodayPage" label="Today's Page" />
    </Box>
  );
}
