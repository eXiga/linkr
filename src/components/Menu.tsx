import Image from "next/image";

function HeaderSection() {
  return (
    <div className="basis-1/5">
      <div className="flex flex-row gap-3 items-center justify-start pl-10 pt-10">
        <Image
          src="/images/bookmark.svg"
          height={24}
          width={24}
          alt="All bookmarks"
        />
        <p className="text-white text-lg">All bookmarks</p>
      </div>
    </div>
  );
}

function PrioritySection() {
  return <div className="basis-2/5 bg-lime-100">PRIORITY</div>;
}

function OtherSection() {
  return <div className="basis-2/5 bg-green-100">TBD</div>;
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
