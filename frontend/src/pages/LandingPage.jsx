import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid2,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ReceiptIcon from "@mui/icons-material/Receipt";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import PublicIcon from "@mui/icons-material/Public";
import sushiImage from "../assets/japanese-dishes.webp";
import pastaImage from "../assets/pasta.jpg";
import burgerImage from "../assets/hamburger.webp";
import demoGif from "../assets/landing_page.gif";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4a148c",
    },
    secondary: {
      main: "#ff6f00",
    },
  },
});

function LandingPage() {
  const navigate = useNavigate();
  const sendToFoodList = () => {
    navigate("/food-list");
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="min-h-screen flex flex-col">
        <AppBar position="static" className="bg-primary">
          <Toolbar className="bg-gray-600">
            <RestaurantMenuIcon className="mr-2" />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, textAlign: "left" }}
            >
              Meal Idea Pod
            </Typography>
            <Button color="inherit" onClick={() => sendToFoodList()}>
              Get Started
            </Button>
          </Toolbar>
        </AppBar>

        <main className="flex-grow">
          <Container maxWidth="lg" className="mt-8">
            <Grid2 container spacing={4} aligns="center">
              <Grid2 xs={12} md={6}>
                <Typography variant="h2" component="h1" gutterBottom>
                  Discover Your Next Meal with Meal Idea Pod
                </Typography>
                <Typography variant="h5" paragraph>
                  Track your food, get personalized meal ideas, and explore new
                  recipes based on your preferences.
                </Typography>
                <Button
                  variant="contained"
                  color="info"
                  size="large"
                  sx={{ m: 1 }}
                  onClick={() => sendToFoodList()}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  color="info"
                  size="large"
                  sx={{ m: 1 }}
                >
                  Learn More
                </Button>
              </Grid2>
              <Grid2
                xs={12}
                md={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <img
                  src={demoGif}
                  alt="Meal Idea Pod app"
                  className="rounded-lg shadow-2xl max-w-md min-w-60"
                />
              </Grid2>
            </Grid2>

            <Box my={8}>
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                className="text-center"
              >
                Key Features
              </Typography>
              <Grid2>
                <Grid2 xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <ReceiptIcon fontSize="large" color="info" />
                      <Typography variant="h5" component="div" gutterBottom>
                        Easy Food Tracking
                      </Typography>
                      <Typography variant="body2">
                        Log your meals manually or by uploading a photo of your
                        receipt for quick and easy tracking.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid2>
                <Grid2 xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <PublicIcon fontSize="large" color="info" />
                      <Typography variant="h5" component="div" gutterBottom>
                        Cuisine Preferences
                      </Typography>
                      <Typography variant="body2">
                        Set your favorite cuisines like Japanese, Korean, and
                        more for tailored meal suggestions.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid2>
                <Grid2 xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <FastfoodIcon fontSize="large" color="info" />
                      <Typography variant="h5" component="div" gutterBottom>
                        Personalized Meal Ideas
                      </Typography>
                      <Typography variant="body2">
                        Get inspired with meal suggestions based on your food
                        preferences and dietary needs.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid2>
              </Grid2>
            </Box>

            <Box my={8}>
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                className="text-center"
              >
                How It Works
              </Typography>
              <Grid2 container spacing={4} aligns="center">
                {/* <Grid2 xs={12} md={6}>
                  <img
                    src="/placeholder.svg"
                    alt="How Meal Idea Pod works"
                    className="w-full rounded-lg shadow-lg"
                  />
                </Grid2> */}
                <Grid2 xs={12} md={6}>
                  <ol className="space-y-4">
                    <li className="flex flex-wrap justify-center text-center s-center space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                        1
                      </div>
                      <Typography
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        Track your meals by manual entry or receipt upload
                      </Typography>
                    </li>
                    <li className="flex flex-wrap justify-center s-center space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                        2
                      </div>
                      <Typography
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        Choose your preference and get meal ideas.
                      </Typography>
                    </li>
                    <li className="flex flex-wrap justify-center s-center space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                        3
                      </div>
                      <Typography
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        Start cooking with the recipe instruction provided.
                      </Typography>
                    </li>
                  </ol>
                </Grid2>
              </Grid2>
            </Box>

            <Box my={8} className="bg-black text-white p-8 rounded-lg">
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                className="text-center"
              >
                Explore New Cuisines
              </Typography>
              <Typography variant="h6" paragraph className="text-center">
                Discover delicious meal ideas from various cuisines around the
                world.
              </Typography>
              <Grid2 container spacing={4} justifyContent="center">
                {[
                  ["Japanese", sushiImage],
                  ["Italian", pastaImage],
                  ["American", burgerImage],
                ].map((cuisine) => (
                  <Grid2 key={cuisine[0]} xs={12} sm={4}>
                    <Card sx={{ bgcolor: "black" }}>
                      <CardMedia
                        component="img"
                        image={cuisine[1]}
                        sx={{
                          borderRadius: "50%",
                          height: 140,
                          width: 140,
                          objectFit: "cover",
                        }}
                        alt={`${cuisine[0]} cuisine`}
                      />
                      <CardContent sx={{ bgcolor: "black" }}>
                        <Typography gutterBottom color="white" component="div">
                          {cuisine[0]}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid2>
                ))}
              </Grid2>
            </Box>
          </Container>
        </main>

        <footer className="bg-gray-600 py-4 text-white">
          <Container>
            <Grid2 container justifyContent="space-evenly" aligns="center">
              <Grid2 aligns="center">
                <Typography
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  © 2024 Meal Idea Pod. All rights reserved.
                </Typography>
              </Grid2>
              <Grid2>
                <Button color="inherit">Terms of Service</Button>
                <Button color="inherit">Privacy Policy</Button>
              </Grid2>
            </Grid2>
          </Container>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default LandingPage;
