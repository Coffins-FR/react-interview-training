import { Link } from "react-router";

function App() {
  return (
    <div className="p-8">
      <ul className="flex flex-col gap-4 bg-gray-200 p-4 rounded-md border border-gray-400 text-blue-600">
        <li className="hover:text-blue-800 transition ease-in-out">
          <Link to="/page/autocomplete">Autocomplete</Link>
        </li>
        <li className="hover:text-blue-800 transition ease-in-out">
          <Link to="/page/dndtodolist">Dnd Todo List</Link>
        </li>
        <li className="hover:text-blue-800 transition ease-in-out">
          <Link to="/page/dogogallery">Dogo Gallery</Link>
        </li>
      </ul>
    </div>
  );
}

export default App;
