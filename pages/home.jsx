import { Container, Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Head from "next/head";
import styles from '../styles/Home.module.css'
import { motion } from 'framer-motion'
import Pokemon from "../Components/Pokemon";
import List from "../Components/List";
import MyPagination from "../Components/MyPagination";
import { ARRAY_GEN_POKEMON } from "../src/utils";
import Generation from "../Components/Generation";

const defaultEndPoint = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=12";
const getOffset = (page, genOffset) => page * 12 - 12 + genOffset;

export default function Home({ data }) {
  const { results: defaultResults = [] } = data;
  const [results, setResults] = useState(defaultResults);
  const [page, setPage] = useState(1);
  const [generation, setGeneration] = useState(
    ARRAY_GEN_POKEMON.filter((gen) => gen.gen === "Pokémon")
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleGenChange = (e) => {
    setPage(1);
    setGeneration(ARRAY_GEN_POKEMON.filter((gen) => gen.gen === e.target.value));
  };

  useEffect(() => {
    const getNewResults = async () => {
      try {
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${getOffset(
          page,
          generation[0].offset
        )}&limit=12`;
        const res = await fetch(url);
        const data = await res.json();

        setResults(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    getNewResults();
  }, [page, generation]);

  return (
    <div>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>POKEEEMI</title>
      </Head>

      <motion.div initial="hidden" animate="visible" variants={{
          hidden: {
            scale: .8,
            opacity: 0
          },
          visible: {
            scale: 1,
            opacity: 1, 
            transition: {
              delay: .4
            }
          }
        }}>
          <h1 className={styles.title}>
            Bienvenue sur POKE-EEMI
          </h1>
        </motion.div>

      <Container>
        <Generation onChange={handleGenChange} generation={generation} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          component="main"
          my={5}
        >
          <List>
            {results.map((result) => {
              const { name, url } = result;
              return (
                <Grid
                  key={name}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Pokemon
                    url={url}
                    limit={generation[0].total + +generation[0].offset}
                  />
                </Grid>
              );
            })}
          </List>
        </Box>
        <MyPagination
          onChange={handlePageChange}
          page={page}
          generation={generation}
        />
      </Container>
    </div>
  );
}



export async function getServerSideProps() {
  const res = await fetch(defaultEndPoint);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
