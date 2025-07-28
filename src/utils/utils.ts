export function downloadToFile(jsonStr: string) {
  const blob = new Blob([jsonStr], { type: 'text/plain' });
  const elem = window.document.createElement('a');
  elem.href = window.URL.createObjectURL(blob);
  elem.download = `my-tasks-backup-${(new Date()).toISOString()}.json`;
  document.body.appendChild(elem);
  elem.click();
  document.body.removeChild(elem);
}

export async function selectFile() {
  return new Promise<FileList>((resolve, reject) => {
    const input = window.document.createElement('input');
    input.type = 'file';
    input.style.display = 'none';
    document.body.appendChild(input);
    input.addEventListener('change', () => {
      if (!input.files) {
        reject(new Error('INVALID_SELECTION'));
      }
      else {
        resolve(input.files);
      }
      document.body.removeChild(input);
    });

    input.addEventListener('cancel', () => reject(new Error('USER_CANCELLATION')));
    const clickEvent = new MouseEvent('click');
    input.dispatchEvent(clickEvent);
  });
}

export async function readFile() {
  const files = await selectFile();
  if (files.length < 1) {
    throw new Error('INVALID_SELECTION');
  }

  return new Promise<string>((resolve, reject) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (err) => {
      console.log(err);
      reject(new Error('FAILED_TO_READ_FILE'));
    };
    reader.readAsText(file);
  });
}
