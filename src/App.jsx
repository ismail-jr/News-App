import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import NewsBox from "./components/NewsBox.jsx";

function App() {
  const [category, setCategory] = useState("general");

  return (
    <div>
      <Navbar setCategory={setCategory} />
      <NewsBox category={category} />
    </div>
  );
}

export default App;
