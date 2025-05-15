import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";

// Type option
interface FilterOption<T extends string> {
  label: string;
  value: T;
}

// Type filter
interface FilterSelectProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: FilterOption<T>[];
  placeholder?: string;
  classNames?: {
    content?: string;
    trigger?: string;
    item?: string;
  };
  isThemeDark?: boolean;
}

/**
 *
 * FilterSelect component
 *
 * @returns {JSX.Element}
 */
const FilterSelect = <T extends string>({
  value,
  onChange,
  options,
  placeholder = "Seleccionar filtro",
  classNames,
  isThemeDark = false,
}: FilterSelectProps<T>) => {
  return (
    <Select value={value} onValueChange={(val) => onChange(val as T)}>
      <SelectTrigger className={clsx("w-[180px]", classNames?.trigger)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        className={clsx("text-white", classNames?.content, {
          "bg-pry-500": !isThemeDark,
          "dark bg-pry-700": isThemeDark,
        })}
      >
        {options.map((opt) => (
          <SelectItem
            key={opt.value}
            value={opt.value}
            className={clsx("hover:cursor-pointer", classNames?.item, {
              "hover:bg-pry-600": !isThemeDark,
              "dark hover:bg-pry-600": isThemeDark,
            })}
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FilterSelect;
