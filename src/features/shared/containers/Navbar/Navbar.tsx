import { Link } from "react-router";
import { ThemeDropdown } from "@/src/features/shared/components/Theme/ThemeDropdown/ThemeDropdown";

const Navbar = () => {
  return (
    <div className="flex flex-row border-border border-b bg-card">
      <nav className="flex flex-row justify-between items-center p-4 w-full">
        <ul className="flex flex-row gap-4 bg-background p-4 text-primary">
          <li className="hover:text-chart-1 transition ease-in-out">
            <Link to="/page/autocomplete">Autocomplete</Link>
          </li>
          <li className="hover:text-chart-1 transition ease-in-out">
            <Link to="/page/dndtodolist">Dnd Todo List</Link>
          </li>
          <li className="hover:text-chart-1 transition ease-in-out">
            <Link to="/page/dogogallery">Dogo Gallery</Link>
          </li>
        </ul>
        <ThemeDropdown />
      </nav>
    </div>
  );
};

export default Navbar;
