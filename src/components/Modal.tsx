import ReactDOM from "react-dom";

interface ModalProps {
  title: string;
  buttonTitle: string;
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
export default function Modal(props: ModalProps) {
  if (!props.isVisible) return <></>;

  const modalDiv = document.getElementById("modal");

  if (modalDiv === null) return <></>;

  return ReactDOM.createPortal(
    <div className="bg-gray-500 bg-opacity-70 absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="flex flex-col gap-3 justify-center bg-white px-10 py-4 rounded-3xl w-96 h-24">
        <p className="font-bold">{props.title}</p>
        <div className="flex flex-row justify-end gap-10">
          <button
            className="px-3 rounded-full hover:bg-slate-100 active:bg-slate-300"
            onClick={props.onClose}
          >
            Close
          </button>
          <button
            className="px-3 text-white rounded-full bg-red-600 hover:bg-red-700"
            onClick={props.onConfirm}
          >
            {props.buttonTitle}
          </button>
        </div>
      </div>
    </div>,

    modalDiv
  );
}
