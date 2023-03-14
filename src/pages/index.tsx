import { trpc } from "@/utils/trpc";
import Bookmark from "@/components/Bookmark";

export default function Home() {
  const links = trpc.links.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  if (!links.data) {
    return <div>Loading</div>;
  }

  return (
    <div className="h-full rounded-3xl bg-white">
      <ul>
        {links.data.map((link) => {
          return (
            <li key={link.id}>
              <Bookmark title={link.title} url={link.url} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
