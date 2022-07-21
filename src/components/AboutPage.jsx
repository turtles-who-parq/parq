import * as React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Signup } from "../components/Signup";
import topoBackground from "../../public/images/topoBackground.png";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import PaidIcon from "@mui/icons-material/Paid";
import CelebrationIcon from "@mui/icons-material/Celebration";
import Paper from "@mui/material/Paper";

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: "default",
  color: "secondary.main",
  fontWeight: "medium",
};

const image = {
  height: 55,
  my: 4,
};

function ProductHowItWorks() {
  return (
    <>
      <div
        className="topoAbout"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <img
          className="topo"
          src={topoBackground}
          width="100%"
          height="150%"
        ></img>
        <br></br>
        <Grid
          container
          display="flex"
          flexDirection="column"
          alignItems="center"
          justify="center"
        >
          <Box
            id="hero"
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            sx={{
              bgcolor: "inherit",
            }}
          >
            <Typography
              variant="h2"
              marked="center"
              component="h2"
              sx={{ mb: 14 }}
            >
              Parq like you've never Parqed before
            </Typography>
          </Box>

          <Grid
            container
            display="flex"
            flexDirection="column"
            alignItems="center"
            justify="center"
          >
            <Box
              display="flex"
              flexDirection="row"
              alignItems="space-between"
              width="80%"
            >
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
              >
                <EmojiTransportationIcon fontSize="large" />
                <Typography
                  variant="p"
                  marked="center"
                  component="h1"
                  sx={{ mb: 14 }}
                >
                  Parq helps you find places to park at anytime, anywhere.
                  Simply search your area and find parking anywhere you need it!
                </Typography>
                <img
                  src="https://www.heritagepartscentre.com/media/wysiwyg/Beetle-Mexico.jpg"
                  width="320px"
                  height="200px"
                ></img>
              </Box>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="space-between"
              width="80%"
            >
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
              >
                <img
                  src="https://www.heritagepartscentre.com/media/wysiwyg/Beetle.jpg"
                  width="320px"
                  height="200px"
                ></img>
                <Typography
                  variant="p"
                  marked="center"
                  component="h1"
                  sx={{ mb: 14 }}
                >
                  Got extra space? You can rent our your extra parking space and
                  make some extra money! Just make an account and post your
                  listing.
                </Typography>
                <PaidIcon fontSize="large" />
              </Box>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="space-between"
              width="80%"
            >
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
              >
                <CelebrationIcon fontSize="large" />
                <Typography
                  variant="p"
                  marked="center"
                  component="h1"
                  sx={{ mb: 14 }}
                >
                  Explore your city knowing you can go anywhere you'd like!
                </Typography>
                <img
                  src="https://media.istockphoto.com/photos/red-volkswagen-beetle-picture-id477470738?k=20&m=477470738&s=612x612&w=0&h=MJtwRK0kV5b5coZp_fhdkbgqgo8GnPY_jfQt-3sHjZI="
                  width="300px"
                  height="200px"
                ></img>
              </Box>
            </Box>
          </Grid>
          {/* </Grid> */}
        </Grid>
      </div>
    </>
  );
}

export default ProductHowItWorks;
