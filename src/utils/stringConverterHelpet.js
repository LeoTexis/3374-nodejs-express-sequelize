module.exports = (objParams) => {
  for (let prop in objParams) {
    if (/Id|id/.test(prop)) {
      objParams[prop] = Number(objParams[prop]);
    }
  }
  return objParams;
};