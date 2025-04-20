import { useLoaderData } from "react-router-dom"
import PantCard from "./components/PantCard";
import { useState } from "react";


function App() {
  const loadedPants = useLoaderData()
  const [pants, setPants] = useState(loadedPants)
  // console.log(loadedPants);
  return (
    <div className="md:6 m-2">
      <h1 className="text-4xl font-bold text-center text-indigo-800 my-6 border bg-indigo-200 p-4 rounded-full">Export Gallery</h1>
      <div className="md:grid md:grid-cols-2 gap-5">
        {pants.map(pant => <PantCard key={pant._id} pant={pant} setPants={setPants} />)}
      </div>

    </div>
  )
}

export default App
