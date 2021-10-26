import React from "react";
import ReactDOM from 'react-dom';
import {Box} from '@mui/material';
import {FormBox} from "./FormBox";

const App: React.VFC = () => {
  return (
    <Box sx={{m: 2}}>
      <FormBox />
    </Box>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
