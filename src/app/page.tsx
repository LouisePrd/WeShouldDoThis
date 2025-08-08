import Home from "./Home";
import { getLastItems } from "./database/queries/all";

export default async function Page() {
  const rawItems = await getLastItems();
  const items = rawItems.map(item => ({
    ...item,
    type: item.type as "film" | "place" | "ressource"
  }));
  return (
    <main>
      <Home items={items} />
    </main>
  );
}
