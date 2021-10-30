import React from "react";
import ReactDOM from 'react-dom';
import {Box} from '@mui/material';
import {FormBox} from "./FormBox";
import {ToggleSettings} from "./ToggleSettings";

const App: React.VFC = () => {
  return (
    <Box sx={{m: 2}}>
      <FormBox />
      <ToggleSettings />
    </Box>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
