import { Box } from '@mui/material';

type PageTitleProps = {
  children: string;
};

const PageTitle = (props: PageTitleProps) => {
  return (
    <Box>
      <h2>{props.children}</h2>
    </Box>
  );
};

export default PageTitle;
