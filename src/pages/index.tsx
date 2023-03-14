import { trpc } from "@/utils/trpc";
import Bookmark from "@/components/Bookmark";

export default function Home() {
  const bookmarks = trpc.bookmarks.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  if (!bookmarks.data) {
    return <div>Loading</div>;
  }

  return (
    <div className="h-full rounded-3xl bg-white">
      <ul>
        {bookmarks.data.map((link) => {
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
