export const formatJSON = (obj: unknown) => {
  return JSON.stringify(obj, null, 2);
};
