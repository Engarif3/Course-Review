import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";

const HeroSection = () => {
  return (
    <Container sx={{ display: "flex", direction: "row", my: 16 }} maxWidth="xl">
      <Box
        sx={{
          flex: 1,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            zIndex: 0,
            // width: "900px",
            top: "-90px",
            left: "-120px",
            opacity: "60%",
          }}
        >
          <Image src={assets.images.grid1} alt="" />
        </Box>
        <Typography variant="h3" component="h1" fontWeight={600}>
          Explore the Knowledge Of
        </Typography>
        <Typography variant="h3" component="h1" fontWeight={600}>
          Deep Ocean
        </Typography>
        <Typography
          color="primary.main"
          variant="h3"
          component="h1"
          fontWeight={600}
        >
          With EduQuest
        </Typography>
        <Typography
          variant="h6"
          component="p"
          fontWeight={300}
          sx={{ width: "50%" }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
          doloribus, suscipit saepe eveniet itaque incidunt distinctio, beatae
          rem sed deleniti praesentium. Inventore quo debitis harum qui
          molestias sunt expedita corrupti nam accusamus quas, numquam autem
          perferendis omnis exercitationem.
        </Typography>
        <Button>Enroll Now</Button>
        <Button
          variant="outlined"
          sx={{
            marginTop: "5px",
            marginLeft: "8px",
          }}
        >
          Contact Us
        </Button>
      </Box>
      <Box
        sx={{
          position: "absolute",
          zIndex: 1,
          width: "600px",
          top: "100px",
          right: "240px",
          opacity: "15%",
        }}
      >
        <Image src={assets.images.grid} alt="" />
      </Box>
    </Container>
  );
};

export default HeroSection;
