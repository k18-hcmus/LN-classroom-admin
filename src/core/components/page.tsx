// material
import { Box } from '@mui/material';
import React, { forwardRef } from 'react';

// ----------------------------------------------------------------------

const Page: React.FunctionComponent<PageProp> = forwardRef(({ children, title = '', ...other }, ref) => (
  <Box ref={ref} {...other}>
    {children}
  </Box>
));

interface PageProp {
  children: any,
  title?: string
};

export default Page;
