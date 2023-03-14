import Image from "next/image";

interface BookmarkProps {
  title: string;
  url: string;
}

export default function Bookmark(props: BookmarkProps) {
  return (
    <div className="flex flex-row items-center justify-between pt-10 pr-10">
      <div className="flex flex-col items-start justify-center pl-10">
        <a
          href={props.url}
          className="text-black text-lg truncate tracking-wide"
        >
          {props.title}
        </a>
        <p className="text-slate-400 text-xs truncate tracking-normal">
          {props.url}
        </p>
      </div>
      <div className="flex flex-row gap-10">
        <Image src="images/share.svg" height={24} width={24} alt="Share" />
        <Image src="images/delete.svg" height={24} width={24} alt="Delete" />
        <Image src="images/dots.svg" height={24} width={24} alt="Menu" />
      </div>
    </div>
  );
}
