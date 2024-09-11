import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";

const Categories = async () => {
  const response = await fetch("http://localhost:5000/api/categories", {
    next: {
      revalidate: 10,
    },
  });
  const categories = await response.json();

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          margin: "40px 0px",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            textAlign: "start",
          }}
        >
          <Typography variant="h4" fontWeight={600}>
            Explore varieties of fields
          </Typography>
          <Typography component="p" fontWeight={300} fontSize={18}>
            Experienced instructors across all fields
          </Typography>
        </Box>
        <Stack direction="row" gap={4} mt={5}>
          {categories.data.categories.map((category: any) => (
            <Box
              key={category._id}
              sx={{
                flex: 1,
                width: "150px",
                backgroundColor: "rgba(245, 245, 245, 1)",
                border: "1px solid rgba(250, 250, 250, 1)",
                borderRadius: "10px",
                textAlign: "center",
                padding: "24px 10px",
                "& img": {
                  width: "80px",
                  height: "80px",
                  margin: "0 auto",
                },
                "&:hover": {
                  border: "1px solid blue",
                  borderRadius: "10px",
                },
              }}
            >
              <Image
                src={assets.images.engineering}
                width={100}
                height={100}
                alt="engineering"
              />
              <Box>
                <Typography component="p" fontWeight={600} fontSize={18}>
                  {category.name}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
        <Button variant="outlined" sx={{ marginTop: "20px" }}>
          View All
        </Button>
      </Box>
    </Container>
  );
};

export default Categories;
