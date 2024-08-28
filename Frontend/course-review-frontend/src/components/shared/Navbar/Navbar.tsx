import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";

const Navbar = () => {
  return (
    <Container>
      <Stack
        py={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" component={Link} href="/" fontWeight={600}>
          <Box component="span" color="primary.main">
            E
          </Box>
          du
          <Box component="span" color="orange">
            Q
          </Box>
          uest
        </Typography>
        <Stack direction="row" gap={4} alignItems="center">
          <Typography component={Link} href="./courses">
            Courses
          </Typography>
          <Typography>About</Typography>
        </Stack>
        <Button component={Link} href="./login">
          Login
        </Button>
      </Stack>
    </Container>
  );
};

export default Navbar;
