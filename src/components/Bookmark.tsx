import Image from "next/image";

interface BookmarkProps {
  title: string;
  url: string;
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
      <div className="flex flex-row gap-10">
        <BookmarkActionButton
          imagePath="images/share.svg"
          alt="Share"
          onClick={async () => {
            await navigator.clipboard.writeText(props.url);
          }}
        />
        <BookmarkActionButton
          imagePath="images/delete.svg"
          alt="Delete"
          onClick={() => {}}
        />
        <BookmarkActionButton
          imagePath="images/dots.svg"
          alt="Menu"
          onClick={() => {}}
        />
      </div>
    </div>
  );
}