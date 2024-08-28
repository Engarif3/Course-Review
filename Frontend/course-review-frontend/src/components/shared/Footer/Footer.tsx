import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import messenger from "@/assets/icons/messenger.webp";

const Footer = () => {
  return (
    <Box bgcolor="rgb(17,26,34)" py={5}>
      <Container>
        <Stack direction="row" gap={4} justifyContent="center">
          <Typography color="#fff" component={Link} href="./courses">
            Courses
          </Typography>
          <Typography color="#fff">About</Typography>
        </Stack>
        <Stack direction="row" gap={4} justifyContent="center" py={2}>
          <Image src={messenger} alt="messenger" height={30} width={30} />
          <Image src={messenger} alt="messenger" height={30} width={30} />
          <Image src={messenger} alt="messenger" height={30} width={30} />
          <Image src={messenger} alt="messenger" height={30} width={30} />
        </Stack>
        <div className="border-b-[1px] border-dashed"></div>
        <Stack
          direction="row"
          gap={4}
          justifyContent="space-between"
          alignItems="center"
          py={2}
        >
          <Typography component="p" color="white">
            &copy;2024 EduQuest. All rights reserved.
          </Typography>
          <Typography
            variant="h4"
            component={Link}
            href="/"
            fontWeight={600}
            color="white"
          >
            <Box component="span" color="primary.main">
              E
            </Box>
            du
            <Box component="span" color="orange">
              Q
            </Box>
            uest
          </Typography>
          <Typography component="p" color="white">
            Privacy policy! Terms and conditions.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
