import { createSlice } from "@reduxjs/toolkit";
import { tableStructData } from "../data";

const tableData = createSlice({
  name: "tabledata",
  initialState: {
    data: tableStructData,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    searchData: (state, action) => {
      const filteredData = tableStructData.filter((record) => {
        if (
          record["key"]
            .toString()
            .toLowerCase()
            .includes(action.payload.toLowerCase()) ||
          record["name"]
            .toString()
            .toLowerCase()
            .includes(action.payload.toLowerCase()) ||
          record["number"]
            .toString()
            .toLowerCase()
            .includes(action.payload.toLowerCase())
        )
          return record;
      });

      state.data = filteredData;
    },
    sortData: (state) => {
      const newArray = [...state.data];
      for (let i = 0; i < newArray.length; i++) {
        let minElemIndex = i;
        for (let j = i + 1; j < newArray.length; j++) {
          if (newArray[j].number < newArray[minElemIndex].number) {
            minElemIndex = j;
          }
        }

        // Previously here i was trying to change the element of object instead of changing the object itself, that's why it was throwing me error that i was trying to change readonly property - "number"
        let temp = newArray[i];
        newArray[i] = newArray[minElemIndex];
        newArray[minElemIndex] = temp;
      }

      // Or We can use Inbuilt Sort method also -->
      // As in previous javascript interview with Sachin, he asked me not to use Sort in interview so I didn't use this and commented it -->

      //   const sortedData = state.data.sort(
      //     (first, second) => first.number - second.number
      //   );

      state.data = newArray;
    },
  },
});

export const { setData, searchData, sortData } = tableData.actions;

export default tableData.reducer;
