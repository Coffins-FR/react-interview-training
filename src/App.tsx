import { Link } from "react-router";

function App() {
  return (
    <div className="p-8">
      <ul className="flex flex-col gap-4">
        <li>
          <Link to="/page/autocomplete">Autocomplete</Link>
        </li>
      </ul>
    </div>
  );
}

export default App;
