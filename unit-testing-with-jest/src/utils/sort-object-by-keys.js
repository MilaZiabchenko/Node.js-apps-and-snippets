const sortObjectByKeys = object =>
  Object.keys(object)
    .sort()
    .reduce((acc, key) => ({ ...acc, [key]: object[key] }), {});

export { sortObjectByKeys };
