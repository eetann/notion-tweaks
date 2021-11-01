import React, {useEffect, useState} from "react";
import {Box, Switch, FormControlLabel, Stack} from '@mui/material';
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
      <Stack>
        <MySwitch name="onTodayPage" label="Today's Page" />
        <MySwitch name="onTimeStamp" label="Time Stamp" />
        <MySwitch name="onCloseMenu" label="Close menu" />
        <MySwitch name="onCreateZ10n" label="Create Page of z10n database" />
        <MySwitch name="narrow-page-width" label="Narrower Page Width" />
        <MySwitch name="narrow-code-block-bottom" label="Narrower Code Block Bottom" />
        <MySwitch name="show-code-block-language" label="Show Code Block Language" />
      </Stack>
    </Box>
  );
}
