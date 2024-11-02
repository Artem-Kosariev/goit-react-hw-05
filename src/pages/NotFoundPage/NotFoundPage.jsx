
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <h2>Something went wrong</h2>
      <Link to="/">Back home!</Link>
    </div>
  );
}