import Home from "./Home";
import { getLastItems } from "./database/queries/all";

export default async function Page() {
  const items = await getLastItems();

  return <Home items={items} />;
}
