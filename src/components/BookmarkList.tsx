import { trpc } from "@/utils/trpc";
import { useStore, SelectedMode } from "@/utils/store";

import Bookmark from "@/components/Bookmark";

function queryForSelectedMode(mode: SelectedMode) {
  if (mode === "All") {
    return trpc.bookmarks.getAll.useQuery(undefined, {
      refetchOnWindowFocus: false,
    });
  } else {
    const convertModeToPriorityId = (mode: SelectedMode) => {
      const modes: SelectedMode[] = ["All", "Must", "Consider", "Later"];
      return modes.indexOf(mode);
    };

    return trpc.bookmarks.getByPriorityId.useQuery(
      { priority: convertModeToPriorityId(mode) },
      {
        refetchOnWindowFocus: false,
      }
    );
  }
}

export default function BookmarkList() {
  const selectedMode = useStore((state) => state.selectedMode);
  const bookmarks = queryForSelectedMode(selectedMode);

  if (!bookmarks.data) {
    return (
      <div>
        <ul>
          <li>
            <Bookmark
              id={-1}
              priorityId={-1}
              title="Loading"
              url="Loading"
              actionsAvailable={false}
            />
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto pb-5">
      <ul>
        {bookmarks.data.map((bookmark) => {
          return (
            <li key={bookmark.id}>
              <Bookmark
                id={bookmark.id}
                priorityId={bookmark.priority}
                title={bookmark.title}
                url={bookmark.url}
                actionsAvailable={true}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
