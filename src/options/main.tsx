// "NOTIN_DAILY_ID": "",
// "NTION_Z10N_ID": "",
import * as React from "react";
import ReactDOM from 'react-dom';
import {useForm, Controller} from "react-hook-form";
import {TextField, Button, Grid} from '@mui/material';

// const getStorage = (key=null) => new Promise(resolve => {
//   chrome.storage.local.get(key, (data) => {resolve(data)});
// });
// 
// const setStorage = (obj) => new Promise(resolve => {
//   chrome.storage.local.set(obj, () => resolve);
// });
// 

function App() {
  const {control, handleSubmit} = useForm();
  const onSubmit = () => console.log("obSubmit!");
  return (
    <Grid container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          render={({field}) => <Grid item>
            <TextField id="gas_url" label="GAS URL" variant="outlined" margin="normal" {...field} />
          </Grid>
          }
        />
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          render={({field}) =>  <Grid item>
            <TextField id="notion_daily_id" label="Daily database ID" variant="outlined" margin="normal" {...field} />
          </Grid>
          }
        />
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          render={({field}) =>  <Grid item>
            <TextField id="notion_z10n_id" label="z10n database ID" variant="outlined" margin="normal" {...field} />
            </Grid>
          }
        />
        <Button type="submit" variant="contained">Resister</Button>
      </form>
    </Grid>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
