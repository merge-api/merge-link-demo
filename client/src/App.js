import "./styles.css";
import MergeLinkButton from "./components/MergeLinkButton";

/**
 * App Component
 *
 * This component serves as the root of the application.
 * It renders the main interface, including the Merge logo, a title,
 * a subtitle with a reference to the README, and the MergeLinkButton component.
 */
export default function App() {
  return (
    <div className="App">
      {/* Displaying the Merge logo */}
      <img src={process.env.PUBLIC_URL + "/Merge.svg"} alt="Merge Logo" />

      {/* Application title */}
      <h1>Merge Link Demo</h1>

      {/* Merge link button component */}
      <MergeLinkButton />
    </div>
  );
}
