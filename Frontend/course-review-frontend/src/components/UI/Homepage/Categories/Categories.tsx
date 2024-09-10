const Categories = async () => {
  const response = await fetch("http://localhost:5000/api/categories");
  const categories = await response.json();
  return (
    <div>
      {categories.data.categories.map((category: any) => (
        <li>{category.name}</li>
      ))}
    </div>
  );
};

export default Categories;
