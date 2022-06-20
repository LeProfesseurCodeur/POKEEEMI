import { Box, Chip, Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { generateID } from "../../../src/utils";
import { COLORS_BG, COLORS_TITLE, COLORS_TYPE } from "../../../src/colors";
import Biography from "../../../Components/Biography"
import { useState } from "react";

const pokemonEndPoint = "https://pokeapi.co/api/v2/pokemon/";
const speciesEndPoint = "https://pokeapi.co/api/v2/pokemon-species/";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
};

function allyProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

function Pokemon({ pokemonData, speciesData }) {
  const {
    abilities,
    base_experience,
    height,
    id,
    name,
    sprites,
    stats,
    types,
    weight,
  } = pokemonData;
  const {
    base_happiness,
    capture_rate,
    egg_groups,
    flavor_text_entries,
    gender_rate,
    genera,
    growth_rate,
  } = speciesData;

  const fullId = generateID(id);
  const image = sprites.other["official-artwork"].front_default;
  const typesArray = types.map((type) => type.type.name);
  const species = genera?.find((genus) => genus.language.name === "en").genus;

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Head>
        <title style={{ textTransform: "capitalize" }}>
          #{fullId} {name}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Box
          component={Grid}
          container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          my={5}
          spacing={3}
        >
          <Box
            component={Grid}
            item
            xs={12}
            lg={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                borderRadius: "15%",
                width: 320,
                height: 320,
                background: `${COLORS_BG[typesArray[0]]}`,
              }}
            >
              <Typography
                variant="h5"
                component="h1"
                fontStyle={{ textTransform: "uppercase" }}
                color={COLORS_TITLE[typesArray[0]]}
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
                <Image
                  src={image}
                  alt={`${name} official artwork`}
                  layout="fill"
                />
              </Box>
              <Typography
                variant="h6"
                component="h2"
                fontStyle={{ textTransform: "uppercase" }}
                color={COLORS_TITLE[typesArray[0]]}
              >
                {species}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: 180,
                }}
              >
                {typesArray.map((type, i) => (
                  <Chip
                    key={i}
                    label={type}
                    sx={{
                      textTransform: "uppercase",
                      color: COLORS_TITLE[typesArray[i]],
                      background: COLORS_TYPE[typesArray[i]],
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
          <Box
            component={Grid}
            item
            xs={12}
            lg={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Tabs value={value} onChange={handleChange} aria-label="tabs">
              <Tab label="Description" {...allyProps(0)} />
            </Tabs>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TabPanel value={value} index={0}>
                <Biography
                  flavor_text_entries={flavor_text_entries}
                  height={height}
                  weight={weight}
                  abilities={abilities}
                  gender_rate={gender_rate}
                  egg_groups={egg_groups}
                  base_experience={base_experience}
                  base_happiness={base_happiness}
                  capture_rate={capture_rate}
                  growth_rate={growth_rate}
                />
              </TabPanel>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const { id } = query;
  const pokemonRes = await fetch(`${pokemonEndPoint}${id}`);
  const pokemonData = await pokemonRes.json();

  const speciesRes = await fetch(`${speciesEndPoint}${id}`);
  const speciesData = await speciesRes.json();

  return {
    props: {
      pokemonData,
      speciesData,
    },
  };
}

export default Pokemon;
