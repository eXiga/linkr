import React, { useState } from "react";
import Image from "next/image";
import Modal from "@/components/Modal";
import Dropdown from "@/components/Dropdown";

interface BookmarkActionButtonProps {
  priorityId: number;
  imagePath: string;
  alt: string;
  shouldAskForConfirmation: boolean;
  shouldShowMenu: boolean;
  onClick: (priorityId: number) => void;
}

export default function BookmarkActionButton(props: BookmarkActionButtonProps) {
  const [isModalOpened, setModalOpened] = useState(false);
  const [isMenuOpened, setMenuOpened] = useState(false);

  const priorityMenuItems = (priorityId: number) => {
    const combinations = [
      [
        { title: "Consider reading", priorityId: 2 },
        { title: "If you have time", priorityId: 3 },
      ],
      [
        { title: "Read it ASAP", priorityId: 1 },
        { title: "If you have time", priorityId: 3 },
      ],
      [
        { title: "Read it ASAP", priorityId: 1 },
        { title: "Consider reading", priorityId: 2 },
      ],
    ];
    return combinations[priorityId - 1];
  };

  const onClick = () => {
    if (props.shouldAskForConfirmation) {
      setModalOpened(true);
    } else if (props.shouldShowMenu) {
      setMenuOpened(!isMenuOpened);
    } else {
      props.onClick(props.priorityId);
    }
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
          isVisible={isModalOpened}
          onClose={() => setModalOpened(false)}
          onConfirm={() => {
            setModalOpened(false);
            props.onClick(props.priorityId);
          }}
        />
      )}
      {props.shouldShowMenu && (
        <Dropdown
          isVisible={isMenuOpened}
          menuItems={priorityMenuItems(props.priorityId)}
          onItemSelected={(priorityId) => {
            setMenuOpened(false);
            props.onClick(priorityId);
          }}
        />
      )}
    </>
  );
}
