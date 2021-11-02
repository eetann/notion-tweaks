import React from "react";
import ReactDOM from 'react-dom';
import {Box, Link} from '@mui/material';
import {FormBox} from "./FormBox";
import {ToggleSettings} from "./ToggleSettings";

const App: React.VFC = () => {
  return (
    <Box sx={{m: 2}}>
      <Box sx={{my: 4}}>
        <Link href="https://github.com/eetann/notion-tweaks#readme" variant="h5">
          README
        </Link>
      </Box>
      <FormBox />
      <ToggleSettings />
    </Box>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
