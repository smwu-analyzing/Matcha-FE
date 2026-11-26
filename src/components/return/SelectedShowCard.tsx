import heartIcon from "../../assets/icons/pink_heart.svg";
import type { ReturnShow } from "../../types/return";

type SelectedShowCardProps = {
  show: ReturnShow;
  onChange?: () => void;
};

export default function SelectedShowCard({
  show,
  onChange,
}: SelectedShowCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-input bg-gray-0 p-[14px]">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-pink-200">
        <img src={heartIcon} alt="" className="size-[22px]" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="truncate text-body-m-bold text-gray-900">{show.title}</p>
        <p className="truncate text-caption-r text-gray-600">
          {show.date} · {show.venue}
        </p>
      </div>
      <button
        type="button"
        onClick={onChange}
        className="shrink-0 text-caption-m text-green-600"
      >
        변경
      </button>
    </div>
  );
}
