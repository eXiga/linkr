import Image from "next/image";
import { trpc } from "@/utils/trpc";

interface MenuButtonProps {
  iconPath: string;
  title: string;
  badgeCount: number;
  isLoading: boolean;
}

function MenuButton(props: MenuButtonProps) {
  return (
    <div className="flex flex-row gap-3 items-center justify-start pl-10">
      <Image src={props.iconPath} height={24} width={24} alt={props.title} />
      <p className="text-white text-lg truncate tracking-wide">{props.title}</p>
      {props.isLoading ? (
        <div className="w-6 h-6 ml-auto mr-10 rounded-full bg-gradient-to-tr from-[#3caaa1] to-[#c2f5ff] animate-spin" />
      ) : (
        props.badgeCount > 0 && (
          <div className="bg-[#3caaa1] w-6 h-6 ml-auto mr-10 rounded-full text-center text-white">
            {props.badgeCount}
          </div>
        )
      )}
    </div>
  );
}

function HeaderSection() {
  return (
    <div className="basis-1/5">
      <div className="pt-20">
        <MenuButton
          iconPath="/images/bookmark.svg"
          title="All bookmarks"
          badgeCount={0}
          isLoading={false}
        />
      </div>
    </div>
  );
}

function PrioritySection() {
  const badgesCount = trpc.links.getCount.useQuery();

  return (
    <div className="basis-2/5">
      <div className="flex flex-col gap-5">
        <p className=" pl-7 text-slate-500 tracking-wider">Reading priority</p>
        <MenuButton
          iconPath="/images/flame.svg"
          title="Read it ASAP"
          badgeCount={badgesCount.data ? badgesCount.data[0].count : 0}
          isLoading={badgesCount.isLoading}
        />
        <MenuButton
          iconPath="/images/book.svg"
          title="Consider reading"
          badgeCount={badgesCount.data ? badgesCount.data[1].count : 0}
          isLoading={badgesCount.isLoading}
        />
        <MenuButton
          iconPath="/images/sleep.svg"
          title="If you have time"
          badgeCount={badgesCount.data ? badgesCount.data[2].count : 0}
          isLoading={badgesCount.isLoading}
        />
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
