import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";

const TopRatedCourse = async () => {
  const response = await fetch("http://localhost:5000/api/courses", {
    next: {
      revalidate: 10,
    },
  });
  const courses = await response.json();

  function formatDate(dateString: string) {
    // Convert string to Date object
    const date = new Date(dateString);

    // Define month names
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Extract day, month, and year
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Return formatted date
    return `${day} ${month} ${year}`;
  }
  return (
    <Box>
      <Box
        sx={{
          my: 10,
          py: 30,
          backgroundColor: "rgba(20, 20, 20, 0.1)",
          clipPath: "polygon(0 0, 100% 25%, 100% 100%, 0 75%)",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Typography variant="h4" fontWeight={600}>
            Explore varieties of fields
          </Typography>
          <Typography component="p" fontWeight={300} fontSize={18}>
            Experienced instructors across all fields
          </Typography>
        </Box>
        <Container maxWidth="xl">
          <Stack direction="row" gap={4} mt={5}>
            {courses.data.courses.map((bestCourse: any) => (
              <Box
                key={bestCourse._id}
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
                  <Typography
                    component="p"
                    fontWeight={600}
                    fontSize={18}
                    color="orange"
                  >
                    {bestCourse.title}
                  </Typography>
                  <Box sx={{ paddingLeft: "20px", mt: "5px" }}>
                    <Typography
                      component="p"
                      fontWeight={400}
                      fontSize={16}
                      textAlign="start"
                    >
                      {/* Instructor: {bestCourse.instructor} */}
                    </Typography>
                    <Typography
                      component="p"
                      fontWeight={400}
                      fontSize={16}
                      textAlign="start"
                    >
                      Starts: {formatDate(bestCourse.startDate)}
                    </Typography>
                    <Typography
                      component="p"
                      fontWeight={400}
                      fontSize={16}
                      textAlign="start"
                    >
                      Ends: {formatDate(bestCourse.endDate)}
                    </Typography>
                    <Typography
                      component="p"
                      fontWeight={400}
                      fontSize={16}
                      textAlign="start"
                    >
                      Duration: {bestCourse.durationInWeeks} Weeks
                    </Typography>
                    <Typography
                      component="p"
                      fontWeight={400}
                      fontSize={18}
                      textAlign="start"
                    >
                      Price: {bestCourse.price} €
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Stack>
        </Container>
        <Button variant="outlined" sx={{ marginTop: "20px" }}>
          View All
        </Button>
      </Box>
    </Box>
  );
};

export default TopRatedCourse;
