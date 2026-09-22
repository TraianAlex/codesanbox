import React from 'react'

import InputBase from '@mui/material/InputBase'
import { alpha } from '@mui/material/styles'
import PropTypes from 'prop-types'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'

const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length

  // Global filter only works with pagination from the first page.
  // This may not be a problem for server side pagination when
  // only the current page is downloaded.

  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: 1,
        backgroundColor: theme => alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: theme => alpha(theme.palette.common.white, 0.25),
        },
        mr: 2,
        ml: 0,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: 56,
          height: '100%',
          position: 'absolute',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SearchIcon />
      </Box>
      <InputBase
        value={globalFilter || ''}
        onChange={e => {
          setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`${count} records...`}
        sx={{
          color: 'inherit',
          '& .MuiInputBase-input': {
            py: 1,
            pr: 1,
            pl: 7,
            width: { xs: '100%', md: 200 },
          },
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </Box>
  )
}

GlobalFilter.propTypes = {
  preGlobalFilteredRows: PropTypes.array.isRequired,
  globalFilter: PropTypes.string.isRequired,
  setGlobalFilter: PropTypes.func.isRequired,
}

export default GlobalFilter
