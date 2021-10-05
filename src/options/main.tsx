// "NOTIN_DAILY_ID": "",
// "NTION_Z10N_ID": "",
import * as React from "react";
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';

// const getStorage = (key=null) => new Promise(resolve => {
//   chrome.storage.local.get(key, (data) => {resolve(data)});
// });
// 
// const setStorage = (obj) => new Promise(resolve => {
//   chrome.storage.local.set(obj, () => resolve);
// });
// 

function App() {
  return <Button variant="contained">Hello World</Button>;
}

ReactDOM.render(<App />, document.querySelector('#app'));
