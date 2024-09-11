import { Box, Container } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";

const HeroSection = () => {
  return (
    <Container sx={{ display: "flex", direction: "row", my: 16 }} maxWidth="xl">
      <Box
        sx={{
          flex: 1,
          position: "row",
        }}
      >
        <Box>
          <Image src={assets.svgs.whatsapp} alt="" />
        </Box>
      </Box>
      <Box>Right</Box>
    </Container>
  );
};

export default HeroSection;
