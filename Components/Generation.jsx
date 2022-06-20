import { Box, TextField, MenuItem } from "@mui/material";
import { ARRAY_GEN_POKEMON } from "../src/utils";

function Generation({ onChange, generation }) {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignitems: "center" }}
      mt={5}
    >
      <TextField
        select
        label="Choisir une génération"
        value={generation[0].gen}
        onChange={onChange}
        helperText="Merci de séléctionner une génération de Pokémon"
      >
        {ARRAY_GEN_POKEMON.map((gen) => (
          <MenuItem key={gen.gen} value={gen.gen}>
            {gen.gen === "Pokémon" ? gen.gen : `${gen.gen}`}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}

export default Generation;
