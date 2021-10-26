import React, {useEffect} from "react";
import {useForm, Controller} from "react-hook-form";
import {TextField, Button, Box, Select, MenuItem} from '@mui/material';
import {getStorage, setStorage} from "../lib/storage"
import toast, {Toaster} from 'react-hot-toast';

interface TodayData {
  date: string,
  url: string,
}

function onSubmit(data: any): void {
  (async () => {
    if (data["select-api"] === "gas-url") {
      await setStorage("gas-url", data["gas-url"]);
      await setStorage("notion-api", "");
    } else {
      await setStorage("gas-url", "");
      await setStorage("notion-api", data["notion-api"]);
    }
    await setStorage("select-api", data["select-api"]);
    await setStorage("notion-daily-id", data["notion-daily-id"]);
    await setStorage("notion-z10n-id", data["notion-z10n-id"]);
    const date = new Date();
    const dateStr: string = date.toISOString().slice(0, 10);
    const todayData: TodayData = {date: dateStr, url: data["today-url"]};
    await setStorage("today", todayData);
    toast.success('Saved!', {duration: 4000, position: 'top-right'});
  })();
}

export const FormBox: React.VFC = () => {
  const {control, handleSubmit, setValue, watch} = useForm();
  useEffect(() => {
    const get = async () => {
      setValue("select-api", await getStorage("select-api") || "gas-url");
      setValue("gas-url", await getStorage("gas-url") || "");
      setValue("notion-api", await getStorage("notion-api") || "");
      setValue("notion-daily-id", await getStorage("notion-daily-id") || "");
      setValue("notion-z10n-id", await getStorage("notion-z10n-id") || "");
      const todayData = (await getStorage("today") as TodayData);
      if (todayData !== null) {
        const date = new Date();
        const dateStr: string = date.toISOString().slice(0, 10);
        if ((todayData["date"] === dateStr) || (todayData["url"] !== "")) {
          setValue("today-url", todayData.url);
        }
      }
    };
    get();
  }, []);
  const selectAPI = watch("select-api", "gas-url");
  return (
    <Box sx={{'& button': {my: 2}}}>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)} style={{width: "640px"}}>
        <Controller
          name="select-api"
          control={control}
          defaultValue="gas-url"
          render={({field}) =>
            <Select label="Select API" variant="standard" {...field}>
              <MenuItem value="gas-url">GAS URL</MenuItem>
              <MenuItem value="notion-api">Notion API Direct</MenuItem>
            </ Select>
          }
        />
        {
          selectAPI === "gas-url"
            ? <Controller
              name="gas-url"
              key="gas-url"
              control={control}
              defaultValue=""
              render={({field}) =>
                <TextField id="gas-url" label="GAS URL" variant="standard" margin="normal" fullWidth {...field} />
              }
            />
            : <Controller
              name="notion-api"
              key="notion-api"
              control={control}
              defaultValue=""
              render={({field}) =>
                <TextField id="notion-api" label="Notion API" variant="standard" margin="normal" fullWidth {...field} />
              }
            />
        }
        <Controller
          name="notion-daily-id"
          control={control}
          defaultValue=""
          render={({field}) =>
            <TextField id="notion-daily-id" label="Daily database ID" variant="standard" margin="normal" fullWidth {...field} />
          }
        />
        <Controller
          name="notion-z10n-id"
          control={control}
          defaultValue=""
          render={({field}) =>
            <TextField id="notion-z10n-id" label="z10n database ID" variant="standard" margin="normal" fullWidth {...field} />
          }
        />
        <Controller
          name="today-url"
          control={control}
          defaultValue=""
          render={({field}) =>
            <TextField id="today-url" label="Today Page URL" variant="standard" margin="normal" fullWidth {...field} />
          }
        />
        <Button type="submit" variant="contained">Update</Button>
      </form>
    </Box>
  );
}
