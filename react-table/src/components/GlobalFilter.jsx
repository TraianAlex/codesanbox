import React from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import { alpha } from "@mui/material/styles";
import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";

const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;

  return (
    <Box
      sx={(theme) => ({
        position: "relative",
        borderRadius: 1,
        backgroundColor: alpha(theme.palette.common.black, 0.06),
        "&:hover": {
          backgroundColor: alpha(theme.palette.common.black, 0.1),
        },
        mr: 2,
        ml: { xs: 0, sm: 3 },
        width: { xs: "100%", sm: "auto" },
      })}
    >
      <Box
        sx={{
          width: 56,
          height: "100%",
          position: "absolute",
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SearchIcon />
      </Box>
      <InputBase
        value={globalFilter ?? ""}
        onChange={(event) => {
          setGlobalFilter(event.target.value || undefined);
        }}
        placeholder={`${count} records...`}
        inputProps={{ "aria-label": "search" }}
        sx={{
          color: "inherit",
          "& .MuiInputBase-input": {
            py: 1,
            pr: 1,
            pl: 7,
            width: { xs: "100%", md: 200 },
            transition: (theme) => theme.transitions.create("width"),
          },
        }}
      />
    </Box>
  );
};

GlobalFilter.propTypes = {
  preGlobalFilteredRows: PropTypes.array.isRequired,
  globalFilter: PropTypes.string,
  setGlobalFilter: PropTypes.func.isRequired,
};

export default GlobalFilter;
