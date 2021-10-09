// "NOTIN_DAILY_ID": "",
// "NTION_Z10N_ID": "",
import * as React from "react";
import ReactDOM from 'react-dom';
import {useForm, Controller} from "react-hook-form";
import {TextField, Button, Box} from '@mui/material';
import {getStorage, setStorage} from "../lib/storage"


function onSubmit(data: any) {
  console.log(data);
  (async () => {
    await setStorage("gasUrl", data["gasUrl"]);
    await setStorage("notionDailyId", data["notionDailyId"]);
    await setStorage("notionZ10nId", data["notionZ10nId"]);
  })();
}

const styles = {
  form: {
    width: "640px"
  },
}

function App() {
  const {control, handleSubmit, setValue, formState: {isSubmitSuccessful}} = useForm();
  (async () => {
    setValue("gasUrl", await getStorage("gasUrl"));
    setValue("notionDailyId", await getStorage("notionDailyId"));
    setValue("notionZ10nId", await getStorage("notionZ10nId"));
  })();
  return (
    <Box sx={{m: 2}}>
      <Box sx={{'& button': {my: 2}}}>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <Controller
            name="gasUrl"
            control={control}
            defaultValue=""
            render={({field}) =>
              <TextField id="gas_url" label="GAS URL" variant="standard" margin="normal" fullWidth {...field} />
            }
          />
          <Controller
            name="notionDailyId"
            control={control}
            defaultValue=""
            render={({field}) =>
              <TextField id="notion_daily_id" label="Daily database ID" variant="standard" margin="normal" fullWidth {...field} />
            }
          />
          <Controller
            name="notionZ10nId"
            control={control}
            defaultValue=""
            render={({field}) =>
              <TextField id="notion_z10n_id" label="z10n database ID" variant="standard" margin="normal" fullWidth {...field} />
            }
          />
          <Button type="submit" variant="contained">Resister</Button>
        </form>
        {isSubmitSuccessful && <p>Resistered!</p>}
      </Box>
    </Box>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
