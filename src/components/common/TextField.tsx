import type { InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export default function TextField({
  label,
  className,
  ...rest
}: TextFieldProps) {
  return (
    <label className="flex w-full min-w-0 flex-col gap-1.5">
      <span className="text-caption-m text-gray-600">{label}</span>
      <input
        className={cn(
          "w-full min-w-0 rounded-tile border-[1.5px] border-pink-300 bg-gray-0 px-4 py-[14px] text-body-l text-gray-900 outline-none transition-colors",
          "placeholder:text-gray-500 focus:border-green-500 focus:ring-[0.5px] focus:ring-green-500",
          className,
        )}
        {...rest}
      />
    </label>
  );
}
