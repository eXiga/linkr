import Image from "next/image";

interface MenuButtonProps {
  iconPath: string;
  title: string;
}

function MenuButton(props: MenuButtonProps) {
  return (
    <div className="flex flex-row gap-3 items-center justify-start pl-10">
      <Image src={props.iconPath} height={24} width={24} alt={props.title} />
      <p className="text-white text-lg truncate tracking-wide">{props.title}</p>
    </div>
  );
}

function HeaderSection() {
  return (
    <div className="basis-1/5">
      <div className="pt-20">
        <MenuButton iconPath="/images/bookmark.svg" title="All bookmarks" />
      </div>
    </div>
  );
}

function PrioritySection() {
  return (
    <div className="basis-2/5">
      <div className="flex flex-col gap-5">
        <p className=" pl-7 text-slate-500 tracking-wider">Reading priority</p>
        <MenuButton iconPath="/images/flame.svg" title="Read it ASAP" />
        <MenuButton iconPath="/images/book.svg" title="Consider reading" />
        <MenuButton iconPath="/images/sleep.svg" title="If you have time" />
      </div>
    </div>
  );
}

// under construction, will add functionality later
function OtherSection() {
  return <div className="basis-2/5"></div>;
}

export default function Menu() {
  return (
    <div className="h-screen flex flex-col">
      <HeaderSection />
      <PrioritySection />
      <OtherSection />
    </div>
  );
}
