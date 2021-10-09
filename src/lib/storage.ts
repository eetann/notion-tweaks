export const getStorage = (key: string) => new Promise(resolve => {
  chrome.storage.local.get(key, (data: any) => {
    if (typeof data[key] === "undefined") {
      resolve(null);
      return;
    }
    resolve(JSON.parse(data[key]));
    return;
  });
});


interface storageType {
  [key: string]: any;
}

export const setStorage = (key: string, value: any) => new Promise(resolve => {
  const setObj: storageType = {[key]: JSON.stringify(value)}
  chrome.storage.local.set(setObj, () => {
    resolve(true);
  });
});

export const clearStorage = () => new Promise(resolve => {
  chrome.storage.local.clear(() => resolve(true));
});
