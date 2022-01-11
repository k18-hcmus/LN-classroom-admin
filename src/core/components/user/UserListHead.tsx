import { Box, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
// material
import { visuallyHidden } from '@mui/utils';
import React from 'react';

// ----------------------------------------------------------------------

interface UserListHeadProps {
  order: 'asc' | 'desc',
  orderBy: string,
  rowCount: number,
  headLabel: any[],
  onRequestSort: any,
};

const UserListHead: React.FunctionComponent<UserListHeadProps> = ({
  order,
  orderBy,
  rowCount,
  headLabel,
  onRequestSort,
}) => {
  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default UserListHead;