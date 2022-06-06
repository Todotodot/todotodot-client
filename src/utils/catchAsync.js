const catchAsync = (asyncFunction) => async (req, res) => {
  try {
    await asyncFunction(req, res);
  } catch (err) {
    console.log(err);
  }
};

export default catchAsync;
