const asyncHandler = promise =>
  promise.then(data => [null, data]).catch(err => Promise.resolve([err, null]));

module.exports = { asyncHandler };
