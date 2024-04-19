import { configureStore } from "@reduxjs/toolkit";
import tableDataReducer from "./reduxSlices/tableData";

const appStore = configureStore({
  reducer: {
    tabledata: tableDataReducer,
  },
});

export default appStore;
