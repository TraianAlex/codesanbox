import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import EnhancedTable from "./components/EnhancedTable";
import makeData from "./makeData";

const App = () => {
  const columns = React.useMemo(
    () => [
      {
        header: "First Name",
        accessorKey: "firstName",
      },
      {
        header: "Last Name",
        accessorKey: "lastName",
      },
      {
        header: "Age",
        accessorKey: "age",
      },
      {
        header: "Visits",
        accessorKey: "visits",
      },
      {
        header: "Status",
        accessorKey: "status",
      },
      {
        header: "Profile Progress",
        accessorKey: "progress",
      },
    ],
    []
  );

  const [data, setData] = React.useState(() => makeData(40));
  const [skipPageReset, setSkipPageReset] = React.useState(false);

  React.useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  return (
    <div>
      <CssBaseline />
      <EnhancedTable
        columns={columns}
        data={data}
        setData={setData}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
    </div>
  );
};

export default App;
