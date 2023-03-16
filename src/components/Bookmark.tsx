import React, { useState } from "react";
import Image from "next/image";
import { trpc } from "@/utils/trpc";
import { useStore } from "@/utils/store";

import Modal from "@/components/Modal";

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
  shouldAskForConfirmation: boolean;
  onClick: () => void;
}

function BookmarkActionButton(props: BookmarkActionButtonProps) {
  const [isModalOpened, setModalOpened] = useState(false);

  const onClick = () => {
    props.shouldAskForConfirmation ? setModalOpened(true) : props.onClick();
  };

  return (
    <>
      <button
        type="button"
        className="rounded-xl cursor-pointer hover:bg-slate-100 active:bg-slate-200"
        onClick={onClick}
      >
        <Image src={props.imagePath} height={24} width={24} alt={props.alt} />
      </button>
      {props.shouldAskForConfirmation && (
        <Modal
          title="Delete this bookmark?"
          buttonTitle="Delete"
          isOpened={isModalOpened}
          onClose={() => setModalOpened(false)}
          onConfirm={() => {
            setModalOpened(false);
            props.onClick();
          }}
        />
      )}
    </>
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
    showToast("Bookmark was deleted.");
    setTimeout(() => {
      hideToast();
    }, 2000);
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
            shouldAskForConfirmation={false}
            onClick={onShareButtonClick}
          />
          <BookmarkActionButton
            imagePath="images/delete.svg"
            alt="Delete"
            shouldAskForConfirmation={true}
            onClick={() => {
              onDeleteButtonClick(props.id);
            }}
          />
          <BookmarkActionButton
            imagePath="images/dots.svg"
            alt="Menu"
            shouldAskForConfirmation={false}
            onClick={() => {}}
          />
        </div>
      )}
    </div>
  );
}
