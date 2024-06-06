//console.log(import.meta.env.VITE_API_KEY);

import { LoadingButton } from "@mui/lab";
import { Box, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
const API_WEATHER = 'https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY&q}';
export default function App() {
  const [city, setCity] = useState("");
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState({
    city: "",
    country: "",
    temperature: 0,
    condition: "",
    conditionText: "",
    icon: "",

  });
  const onSubmit = async (e) => {
    e.preventDeault();
    setError({ error: true, message: "" });
    setLoading(true);
    try {
      if (!city.trim()) throw { message: "El campo ciudad es obligatorio." }
      const res = await fetch(API_WEATHER + city);
      const data = await res.json();
      if (data.error) throw { message: data.error.message };
      setWeather({
        city: data.location.name,
        country: data.location.country,
        temperature: data.current.temp_c,
        condition: data.current.condition.code,
        conditionText: data.current.condition
          .text,
        icon: data.current.condition.icon,

      });
    } catch (error) {
      console.log(error)
      setError({
        error: true,
        message: error.message
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container
      maxWidth="xs"
      sx={{ mt: 2 }}
    >
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
      >
        Weather App
      </Typography>
      <Box sx={{ display: "grid", gap: 2 }}
        component="form"
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <TextField
          id="City"
          label="Ciudad"
          variant="outlined"
          size="small"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
          error={error.error}
          helperText={error.message}
        />
        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          loadingIndicator="Buscando..."
        >
          Buscar
        </LoadingButton>
      </Box>
      {weather.city && (
        <Box
          sx={{
            mt: 2,
            display: "grid",
            gap: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h4" component="h2">
            {weather.city}, {weather.country}

          </Typography>
          <Box
            component="img"
            alt={weather.conditionText}
            src={weather.icon}
            sx={{ width: "0 auto" }}
          ></Box>
          <Typography variant="h5" component="h3">
            {weather.temperature} °C
          </Typography>
          <Typography variant="h6" component="h4">
            {weather.conditionText}
          </Typography>
        </Box>
      )}
      <Typography
        textAlign="center"
        sx={{ mt: 2, fontSize: "10px" }}

      >
        Powered by:{" "}
        <a href="http://www.weatherapi.com/"
          title="Weather API">
          WeatherAPI.com
        </a>
      </Typography>
    </Container>
  )
}