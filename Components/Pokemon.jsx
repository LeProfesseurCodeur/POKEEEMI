import { Box, Chip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "../src/Link";
import { COLORS_BG, COLORS_TITLE, COLORS_TYPE } from "../src/colors";

function Pokemon({ url, limit }) {
  const [id, setId] = useState("");
  const [image, setImage] = useState(
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
  );
  const [name, setName] = useState("");
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const getPokemonData = async () => {
      const res = await fetch(url);
      const data = await res.json();
      const idString = "" + data.id;
      const filler = "000";
      const idFull = filler.substring(0, filler.length - idString.length) + idString;
      const typesArray = data.types.map((type) => type.type.name);

      setId(idFull);
      setImage(data.sprites.other["official-artwork"].front_default);
      setName(data.name);
      setTypes(typesArray);
    };
    getPokemonData();
  }, []);

  return id > limit ? null : (
    <Box
      component={Link}
      href={`/pokemon/${name}`}
      underline="none"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        borderRadius: "10%",
        width: 350,
        height: 350,
        background: `${COLORS_BG[types[0]]}`,
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        fontStyle={{ textTransform: "uppercase" }}
        color={COLORS_TITLE[types[0]]}
      >
        {name}
      </Typography>
      
      <Box
        sx={{
          position: "relative",
          width: 150,
          height: 150,
        }}
      >
        <Image src={image} alt={`${name} official artwork`} layout="fill" />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          width: 180,
        }}
      >
        {types.map((type, i) => (
          <Chip
            key={i}
            label={type}
            sx={{
              textTransform: "uppercase",
              color: COLORS_TITLE[types[i]],
              background: COLORS_TYPE[types[i]],
              cursor: "pointer",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

export default Pokemon;
