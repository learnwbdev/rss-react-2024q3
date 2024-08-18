export const convertFileToBase64 = (file: File | null): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file.'));
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to Base64: result is not a string.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read the file.'));
    };
    reader.readAsDataURL(file);
  });
};
