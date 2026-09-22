import React from "react";
import AddUserDialog from "./AddUserDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import GlobalFilter from "./GlobalFilter";
import IconButton from "@mui/material/IconButton";
import { alpha } from "@mui/material/styles";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

const TableToolbar = (props) => {
  const {
    numSelected,
    addUserHandler,
    deleteUserHandler,
    preGlobalFilteredRows,
    setGlobalFilter,
    globalFilter,
  } = props;

  return (
    <Toolbar
      sx={(theme) => ({
        pl: 2,
        pr: 1,
        ...(numSelected > 0 && {
          color:
            theme.palette.mode === "light"
              ? theme.palette.secondary.main
              : theme.palette.text.primary,
          bgcolor:
            theme.palette.mode === "light"
              ? alpha(theme.palette.secondary.light, 0.85)
              : theme.palette.secondary.dark,
        }),
      })}
    >
      <AddUserDialog addUserHandler={addUserHandler} />
      {numSelected > 0 ? (
        <Typography sx={{ flex: "1 1 100%" }} color="inherit" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle">
          Users
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={deleteUserHandler}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      )}
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  addUserHandler: PropTypes.func.isRequired,
  deleteUserHandler: PropTypes.func.isRequired,
  setGlobalFilter: PropTypes.func.isRequired,
  preGlobalFilteredRows: PropTypes.array.isRequired,
  globalFilter: PropTypes.string,
};

export default TableToolbar;
