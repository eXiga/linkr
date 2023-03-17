import Image from "next/image";
import { trpc } from "@/utils/trpc";
import { useStore } from "@/utils/store";

interface MenuButtonProps {
  iconPath: string;
  title: string;
  badgeCount: number;
  isLoading: boolean;
  isSelected: boolean;
  onClick: () => void;
}

function MenuButton(props: MenuButtonProps) {
  return (
    <button
      type="button"
      className="flex flex-row gap-3 items-center justify-start pl-10"
      onClick={props.onClick}
    >
      <Image src={props.iconPath} height={24} width={24} alt={props.title} />
      <p
        className={`text-lg truncate tracking-wide ${
          props.isSelected ? "text-[#3caaa1]" : "text-white"
        } hover:underline underline-offset-4 decoration-[#3caaa1]`}
      >
        {props.title}
      </p>
      {props.isLoading ? (
        <div className="w-6 h-6 ml-auto mr-10 rounded-full bg-gradient-to-tr from-[#3caaa1] to-[#c2f5ff] animate-spin" />
      ) : (
        props.badgeCount > 0 && (
          <div className="bg-[#3caaa1] w-6 h-6 ml-auto mr-10 rounded-full text-center text-white">
            {props.badgeCount}
          </div>
        )
      )}
    </button>
  );
}

function HeaderSection() {
  const setSelectedMode = useStore((state) => state.setSelectedMode);
  const selectedMode = useStore((state) => state.selectedMode);

  return (
    <div className="basis-1/5">
      <div className="pt-20">
        <MenuButton
          iconPath="/images/bookmark.svg"
          title="All bookmarks"
          badgeCount={0}
          isLoading={false}
          isSelected={selectedMode === "All"}
          onClick={() => {
            setSelectedMode("All");
          }}
        />
      </div>
    </div>
  );
}

function PrioritySection() {
  const setSelectedMode = useStore((state) => state.setSelectedMode);
  const selectedMode = useStore((state) => state.selectedMode);

  const badgesCount = trpc.bookmarks.getCount.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  return (
    <div className="basis-2/5">
      <div className="flex flex-col gap-5">
        <p className="pl-7 text-slate-500 tracking-wider">Reading priority</p>
        <MenuButton
          iconPath="/images/flame.svg"
          title="Read it ASAP"
          badgeCount={badgesCount.data ? badgesCount.data[0].count : 0}
          isLoading={badgesCount.isLoading}
          isSelected={selectedMode === "Must"}
          onClick={() => {
            setSelectedMode("Must");
          }}
        />
        <MenuButton
          iconPath="/images/book.svg"
          title="Consider reading"
          badgeCount={badgesCount.data ? badgesCount.data[1].count : 0}
          isLoading={badgesCount.isLoading}
          isSelected={selectedMode === "Consider"}
          onClick={() => {
            setSelectedMode("Consider");
          }}
        />
        <MenuButton
          iconPath="/images/sleep.svg"
          title="If you have time"
          badgeCount={badgesCount.data ? badgesCount.data[2].count : 0}
          isLoading={badgesCount.isLoading}
          isSelected={selectedMode === "Later"}
          onClick={() => {
            setSelectedMode("Later");
          }}
        />
      </div>
    </div>
  );
}

// under construction, will add functionality later
function OtherSection() {
  return (
    <div className="basis-2/5">
      <div className="flex flex-row justify-center ml-10 mr-10 rounded bg-[#3caaa1] hover:bg-[#2f847d] active:bg-[#28716b]">
        <button
          className="w-full text-white text-lg"
          onClick={() => {
            console.log("CLICK");
          }}
        >
          Add new
        </button>
      </div>
    </div>
  );
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
