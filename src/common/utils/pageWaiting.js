import { appActionTypes } from "app/actions";

const pageWating = (dispatch) => {
  dispatch(appActionTypes.setIsLoading(true));

  setTimeout(() => {
    dispatch(appActionTypes.setIsLoading(false));
  }, 1000);
};

export default pageWating;
