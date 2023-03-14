import { useStore } from "@/utils/store";

export default function Toast() {
  const isToastVisible = useStore((state) => state.isToastVisible);
  const toastMessage = useStore((state) => state.toastMessage);
  const hideToast = useStore((state) => state.hideToast);

  return (
    <div
      className={`${
        isToastVisible ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300 fixed bottom-5 left-5 flex items-center w-full max-w-xs p-4 space-x-4 text-black bg-white divide-x divide-gray-200 rounded-lg`}
      onClick={() => {
        hideToast();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 stroke-[#3caaa1]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div className="pl-4 text-sm font-normal">{toastMessage}</div>
    </div>
  );
}
