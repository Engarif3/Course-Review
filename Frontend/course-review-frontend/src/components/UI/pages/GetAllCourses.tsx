const GetAllCourses = async () => {
  const allCourses = await fetch("http://localhost:5000/api/courses");
  const response = await allCourses.json();
  console.log(response);

  return (
    <div>
      {response.data.courses.map((course: any) => (
        <li>
          {course.title}
          <br></br>
          {course.instructor}
        </li>
      ))}
    </div>
  );
};

export default GetAllCourses;
