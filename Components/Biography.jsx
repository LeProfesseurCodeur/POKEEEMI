import { Box, Grid, Typography } from "@mui/material";
import numeral from "numeral";

function Biography(props) {

  const {
    height,
    weight,
    abilities,
    base_experience,
    base_happiness,
    flavor_text_entries,
    gender_rate,
    egg_groups,
    capture_rate,
    growth_rate,
  } = props;
  const gender_female = (gender_rate / 8) * 100;
  const gender_male = 100 - gender_female;
  const description = flavor_text_entries?.find(
    (flavor) => flavor.language.name === "fr"
  ).flavor_text;

  return (
    <Box m={3} sx={{
      border: "1px solid",
      borderRadius: '15px!important',
      bgcolor: '#0070f3',
      color: 'white',
      borderColor: '#FFCB03'
    }}>
      <Box m={3}>
        <Typography variant="h5" component="h3" sx={{
          color: '#FFCB03',
          fontWeight: 'bold'
        }}>
          Description
        </Typography>
        <Typography variant="subtitle1" component="p">
          {description}
        </Typography>
      </Box>
      <Box m={3}>
        <Typography variant="h5" component="h3" sx={{
          color: '#FFCB03',
          fontWeight: 'bold'
        }}>
          Détails
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Typography>Taille</Typography>
            <Typography>Poids</Typography>
            <Typography>Capacités</Typography>
            <Typography>Genre</Typography>
            <Typography>Groupe</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography>{height / 10}</Typography>
            <Typography>{weight / 10}</Typography>
            <Typography fontStyle={{ textTransform: "capitalize" }}>
              {abilities?.map((ability) => ability.ability.name).join(", ")}
            </Typography>
            {gender_female <= -1 ? (
              <Typography>Genre</Typography>
            ) : (
              <Typography>
                M: {gender_male}% | F: {gender_female}%
              </Typography>
            )}
            <Typography fontStyle={{ textTransform: "capitalize" }}>
              {egg_groups?.map((group) => group.name).join(", ")}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box m={3}>
        <Typography variant="h5" component="h3" sx={{
          color: '#FFCB03',
          fontWeight: 'bold'
        }}>
          Entraînement
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Typography>Base Exp</Typography>
            <Typography>Base Happiness</Typography>
            <Typography>Catch Rate</Typography>
            <Typography>Growth Rate</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography>{base_experience}</Typography>
            <Typography>{base_happiness}</Typography>
            <Typography>
              {numeral((capture_rate * 100) / 255).format("0.00")}%
            </Typography>
            <Typography fontStyle={{ textTransform: "capitalize" }}>
              {growth_rate.name}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Biography;

