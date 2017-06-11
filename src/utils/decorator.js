export default (response) => {
  let fields = response.fields;
  let stats = response.data.map((data) => {
    let stat = fields.reduce((acc, field, i) => {
      acc[field.label] = isNaN(Number(data[i])) ? data[i] : Number(data[i]);
      return acc;
    }, {})
    return stat;
  });
  return {stats, fields};
}
