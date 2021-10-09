// "NOTIN_DAILY_ID": "",
// "NTION_Z10N_ID": "",
import * as React from "react";
import ReactDOM from 'react-dom';
import {useForm, Controller} from "react-hook-form";
import {TextField, Button, Grid} from '@mui/material';
import {setStorage, clearStorage} from "../lib/storage"


function onSubmit(data: any) {
  console.log(data);
  (async () => {
    await setStorage("gasUrl", data["gasUrl"]);
    await setStorage("notionDailyId", data["notionDailyId"]);
    await setStorage("notionZ10nId", data["notionZ10nId"]);
  })();
}

function clearButton() {
  (async () => {
    await clearStorage();
  })();
}

function App() {
  const {control, handleSubmit} = useForm();
  return (
    <Grid container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="gasUrl"
          control={control}
          defaultValue=""
          render={({field}) => <Grid item>
            <TextField id="gas_url" label="GAS URL" variant="standard" margin="normal" {...field} />
          </Grid>
          }
        />
        <Controller
          name="notionDailyId"
          control={control}
          defaultValue=""
          render={({field}) => <Grid item>
            <TextField id="notion_daily_id" label="Daily database ID" variant="standard" margin="normal" {...field} />
          </Grid>
          }
        />
        <Controller
          name="notionZ10nId"
          control={control}
          defaultValue=""
          render={({field}) => <Grid item>
            <TextField id="notion_z10n_id" label="z10n database ID" variant="standard" margin="normal" {...field} />
          </Grid>
          }
        />
        <Button type="submit" variant="contained">Resister</Button>
      </form>
      <Button variant="contained" onClick={clearButton}>Clear</Button>
    </Grid>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
