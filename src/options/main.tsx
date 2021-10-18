// "NOTIN_DAILY_ID": "",
// "NTION_Z10N_ID": "",
import * as React from "react";
import ReactDOM from 'react-dom';
import {useForm, Controller} from "react-hook-form";
import {TextField, Button, Box, Select, MenuItem} from '@mui/material';
import {getStorage, setStorage} from "../lib/storage"
import toast, {Toaster} from 'react-hot-toast';


function onSubmit(data: any) {
  (async () => {
    await setStorage("gas-url", data["gas-url"]);
    await setStorage("notion-daily-id", data["notion-daily-id"]);
    await setStorage("notion-z10n-id", data["notion-z10n-id"]);
    toast.success('Saved!', {duration: 4000, position: 'top-right'});
  })();
}

const styles = {
  form: {
    width: "640px"
  },
}

function App() {
  const {control, handleSubmit, setValue, watch} = useForm();
  (async () => {
    setValue("gas-url", await getStorage("gas-url") || "");
    setValue("notion-daily-id", await getStorage("notion-daily-id") || "");
    setValue("notion-z10n-id", await getStorage("notion-z10n-id") || "");
  })();
  const selectAPI = watch("select-api", "gas-url");
  return (
    <Box sx={{m: 2}}>
      <Toaster />
      <Box sx={{'& button': {my: 2}}}>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <Controller
            name="select-api"
            control={control}
            defaultValue="gas-url"
            render={({field}) =>
              <Select id="select-api" label="Select API" variant="standard" {...field}>
                <MenuItem value={"gas-url"}>GAS URL</MenuItem>
                <MenuItem value={"notion-api"}>Notion API Direct</MenuItem>
              </ Select>
            }
          />
          {
            selectAPI === "gas-url" ?
              <Controller
                name="gas-url"
                control={control}
                defaultValue=""
                render={({field}) =>
                  <TextField id="gas-url" label="GAS URL" variant="standard" margin="normal" fullWidth {...field} />
                }
              />
              :
              <Controller
                name="notion-api"
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
          <Button type="submit" variant="contained">Resister</Button>
        </form>
      </Box>
    </Box>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
