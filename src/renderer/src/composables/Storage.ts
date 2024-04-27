export function useStorage() {
  function readStorage(path: string): string {
    setTimeout(() => {
      console.log("veri gitti.")
      window.electron.ipcRenderer.send('readFile', 1);
    }, 2000);
    return '';
  }

  function writeStorage(path: string, data: string) {}

  return {
    readStorage,
    writeStorage,
  };
}
