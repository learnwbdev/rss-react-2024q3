export const getQuotedValue = (val: string): string => {
  if (val.includes(',') || val.includes('\n')) {
    return `"${val.replace(/"/g, '\\"')}"`;
  }

  return val;
};
