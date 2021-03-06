export default schema => values => {
  const errors = {},
        result = schema.validate(values, { abortEarly: false });

  if (!!result.error) {
    result.error.details.forEach(cur => {
      const path = cur.path[cur.path.length - 1],
            message = cur.message;

      errors[path]
        && (errors[path] += message)
        || (errors[path] = message);
    });
  }

  if (DEBUG) {
    require('./customLogger').customLogger('Log > createJoiValidator.js >', errors);
  }

  return errors;
};
