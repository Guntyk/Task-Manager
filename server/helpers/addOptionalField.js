const addOptionalField = (newDataObject, query) => {
  const [firstKey, ...restKeys] = Object.keys(newDataObject);
  const [firstValue, ...restValues] = Object.values(newDataObject);

  let newQuery = query + firstKey;
  const values = [firstValue];

  restKeys.forEach((key, index) => {
    if (newDataObject[key] !== undefined) {
      newQuery += `, ${key}`;
      values.push(restValues[index]);
    }
  });

  newQuery += `) VALUES ($1`;
  newQuery += restValues.map((_, i) => `, $${i + 2}`).join('');
  newQuery += `) RETURNING *`;

  return [newQuery, values];
};

module.exports = { addOptionalField };
