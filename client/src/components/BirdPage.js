import React, { useEffect, useState } from "react";
import NewBirdForm from "./NewBirdForm";
import BirdList from "./BirdList";
import Search from "./Search";

function BirdPage() {
  const [birds, setBirds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);  // Added loading state

  useEffect(() => {
    fetch("/birds")
      .then((r) => {
        if (!r.ok) {
          throw new Error(`Failed to fetch data: ${r.statusText}`);
        }
        return r.json();
      })
      .then((birdsArray) => {
        setBirds(birdsArray || []);  // Ensure birdsArray is an array or use an empty array
        setLoading(false);  // Set loading to false after fetching data
      })
      .catch((error) => {
        console.error("Error fetching bird data:", error);
        setLoading(false);  // Set loading to false in case of an error
      });
  }, []);

  function handleAddBird(newBird) {
    const updatedBirdsArray = [...birds, newBird];
    setBirds(updatedBirdsArray);
  }

  const displayedBirds = loading ? [] : birds.filter((bird) => {
    return bird.name && bird.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <main>
      <NewBirdForm onAddBird={handleAddBird} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <BirdList birds={displayedBirds} />
      )}
    </main>
  );
}

export default BirdPage;
