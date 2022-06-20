import { AppBar, Box, Container, Toolbar } from "@mui/material";

function Header() {
  return (
    <Box sx={{ flexGrow: 1 }} component="header">
      <AppBar position="static">
        <Toolbar>
            <Container>
              <a href="/">
                <img src="/logo.svg" alt="Pokémon" width={100} height={50} />
              </a>
            </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
