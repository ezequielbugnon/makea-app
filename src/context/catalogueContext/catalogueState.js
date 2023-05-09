import React, { useReducer } from "react";
import axios from "axios";
import CatalogueContext from "./catalogueContext";
import catalogueReducer from "./catalogueReducer";
import { URL } from '@env';

const CatalogueState = (props) => {
  const initialState = {
    data: null,
    filter: null,
  };

  const [state, dispatch] = useReducer(catalogueReducer, initialState);

  const getCatalogue = async () => {
    try {
      const response = await axios.get(`${URL}/catalogue`);
      dispatch({
        type: "CHARGE",
        payload: response.data,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.message);
      }
    }
  };

  const getFilter = async (data , term) => {
    if (term === "todo") {
      dispatch({
        type: "FILTER",
        payload: data,
      });
      return;
    }
    const dataFilter = data.filter((e) => e.category === term);

    dispatch({
      type: "FILTER",
      payload: dataFilter,
    });
  };

  return (
    <CatalogueContext.Provider
      value={{
        data: state.data,
        filter: state.filter,
        getCatalogue,
        getFilter,
      }}
    >
 
      {props.children}
    </CatalogueContext.Provider>
  );
};

export default CatalogueState;
