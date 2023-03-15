import Image from "next/image";
import { trpc } from "@/utils/trpc";
import { useStore } from "@/utils/store";

interface BookmarkProps {
  id: number;
  priorityId: number;
  title: string;
  url: string;
  actionsAvailable: boolean;
}

interface BookmarkActionButtonProps {
  imagePath: string;
  alt: string;
  onClick: () => void;
}

function BookmarkActionButton(props: BookmarkActionButtonProps) {
  return (
    <a
      className="rounded-xl cursor-pointer hover:bg-slate-100 active:bg-slate-200"
      onClick={props.onClick}
    >
      <Image src={props.imagePath} height={24} width={24} alt={props.alt} />
    </a>
  );
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

  const onShareButtonClick = async () => {
    showToast("Link copied to clipboard.");
    await navigator.clipboard.writeText(props.url);
    setTimeout(() => {
      hideToast();
    }, 2000);
  };

  const onDeleteButtonClick = (id: number) => {
    deleteBookmark.mutate({ id: id });
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
            imagePath="images/share.svg"
            alt="Share"
            onClick={onShareButtonClick}
          />
          <BookmarkActionButton
            imagePath="images/delete.svg"
            alt="Delete"
            onClick={() => {
              onDeleteButtonClick(props.id);
            }}
          />
          <BookmarkActionButton
            imagePath="images/dots.svg"
            alt="Menu"
            onClick={() => { }}
          />
        </div>
      )}
    </div>
  );
}
