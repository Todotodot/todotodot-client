import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const catchAsync = (asyncFunction) => async (req, res) => {
  try {
    await asyncFunction(req, res);
  } catch (err) {
    navigate("*");
  }
};

export default catchAsync;
