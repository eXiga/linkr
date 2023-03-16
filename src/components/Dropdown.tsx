interface DropdownProps {
  isVisible: boolean;
  menuItems: { title: string; priorityId: number }[];
  onItemSelected: (priorityId: number) => void;
}

export default function Dropdown(props: DropdownProps) {
  return (
    <div
      className={`${props.isVisible ? "block" : "hidden"
        } absolute drop-shadow-xl text-sm min-w-max bg-white px-2 py-2 rounded-lg left-auto right-0 mt-6`}
    >
      <ul className="divide-y divide-slate-100">
        {props.menuItems.map((item, index) => (
          <li key={index}>
            <button
              className="px-3 rounded-full hover:bg-slate-100 active:bg-slate-300"
              type="button"
              onClick={() => {
                props.onItemSelected(item.priorityId);
              }}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
