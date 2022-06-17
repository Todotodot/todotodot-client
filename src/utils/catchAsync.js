const catchAsync = (asyncFunction) => async (req, res) => {
  try {
    await asyncFunction(req, res);
  } catch (err) {
    console.error(err);
  }
};

export default catchAsync;
