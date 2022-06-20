import { Grid } from "@mui/material";

function List({ children }) {
  return (
    <Grid container spacing={4}>
      {children}
    </Grid>
  );
}

export default List;

