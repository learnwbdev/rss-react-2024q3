export const getFile = (key: string, formData: FormData): File => {
  const file = formData.get(key);

  if (!file || !(file instanceof File)) {
    throw new Error('File is not uploaded');
  }
  return file;
};
