import { trpc } from "@/utils/trpc";
import { useStore } from "@/utils/store";

import BookmarkActionButton from "@/components/BookmarkActionButton";

interface BookmarkProps {
  id: number;
  priorityId: number;
  title: string;
  url: string;
  actionsAvailable: boolean;
}

export default function Bookmark(props: BookmarkProps) {
  const showToast = useStore((state) => state.showToast);
  const hideToast = useStore((state) => state.hideToast);

  const utils = trpc.useContext();
  const deleteBookmark = trpc.bookmarks.delete.useMutation({
    onSuccess() {
      utils.bookmarks.getAll.invalidate();
      utils.bookmarks.getCount.invalidate();
      utils.bookmarks.getByPriorityId.invalidate({
        priority: props.priorityId,
      });
    },
  });

  const updatePriority = trpc.bookmarks.updatePriority.useMutation({
    onSuccess() {
      utils.bookmarks.getCount.invalidate();
      utils.bookmarks.getByPriorityId.invalidate({
        priority: props.priorityId,
      });
    },
  });

  const onShareButtonClick = async () => {
    showToast("Link copied to clipboard.");
    await navigator.clipboard.writeText(props.url);
    setTimeout(() => {
      hideToast();
    }, 2000);
  };

  const onDeleteButtonClick = (id: number) => {
    deleteBookmark.mutate({ id: id });
    showToast("Bookmark was deleted.");
    setTimeout(() => {
      hideToast();
    }, 2000);
  };

  const onUpdatePriorityClick = (bookmarkId: number, priorityId: number) => {
    updatePriority.mutate(
      { id: bookmarkId, priority: priorityId },
      {
        onSuccess() {
          utils.bookmarks.getByPriorityId.invalidate({
            priority: priorityId,
          });
        },
      }
    );
  };

  return (
    <div className="flex flex-row items-center justify-between pt-10 pr-10">
      <div className="flex flex-col items-start justify-center pl-10">
        <a
          href={props.url}
          target="_blank"
          rel="noreferrer"
          className="text-black text-lg truncate tracking-wide hover:underline"
        >
          {props.title}
        </a>
        <p className="text-slate-400 text-xs truncate tracking-normal">
          {props.url.replace("https://", "")}
        </p>
      </div>
      {props.actionsAvailable && (
        <div className="flex flex-row gap-10">
          <BookmarkActionButton
            priorityId={props.priorityId}
            imagePath="images/share.svg"
            alt="Share"
            shouldAskForConfirmation={false}
            shouldShowMenu={false}
            onClick={onShareButtonClick}
          />
          <BookmarkActionButton
            priorityId={props.priorityId}
            imagePath="images/delete.svg"
            alt="Delete"
            shouldAskForConfirmation={true}
            shouldShowMenu={false}
            onClick={() => {
              onDeleteButtonClick(props.id);
            }}
          />
          <BookmarkActionButton
            priorityId={props.priorityId}
            imagePath="images/dots.svg"
            alt="Menu"
            shouldAskForConfirmation={false}
            shouldShowMenu={true}
            onClick={(priorityId) => {
              onUpdatePriorityClick(props.id, priorityId);
            }}
          />
        </div>
      )}
    </div>
  );
}
