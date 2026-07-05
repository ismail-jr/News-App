import Navbar from "./components/Navbar.jsx";
import NewsBox from "./components/NewsBox.jsx";
import { useState } from "react";

const CATEGORIES = [
  "general",
  "technology",
  "business",
  "health",
  "sports",
  "science",
  "entertainment",
];

function App() {
  const [category, setCategory] = useState("general");

  return (
    <div className="app">
      <Navbar
        categories={CATEGORIES}
        activeCategory={category}
        onCategoryChange={setCategory}
      />
      <main className="container py-4">
        <NewsBox category={category} />
      </main>
      <footer className="app-footer text-center py-3">
        Powered by{" "}
        <a href="https://newsapi.org" target="_blank" rel="noreferrer">
          NewsAPI
        </a>
      </footer>
    </div>
  );
}

export default App;
