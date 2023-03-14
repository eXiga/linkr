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
        {bookmarks.data.map((bookmark) => {
          return (
            <li key={bookmark.id}>
              <Bookmark title={bookmark.title} url={bookmark.url} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
