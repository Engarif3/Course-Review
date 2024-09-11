import { Container } from "@mui/material";

const GetAllCourses = async () => {
  const allCourses = await fetch("http://localhost:5000/api/courses");
  const response = await allCourses.json();

  return (
    <Container maxWidth="xl">
      {response.data.courses.map((course: any) => (
        <li>
          {course.title}
          <br></br>
          {course.instructor}
        </li>
      ))}
    </Container>
  );
};

export default GetAllCourses;
