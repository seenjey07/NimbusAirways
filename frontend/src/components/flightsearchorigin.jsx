"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";

// eslint-disable-next-line react/prop-types
export function FlightSearchOrigin({ originOptions, onSelect }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <>
      <Popover open={open} onOpenChange={setOpen} className="bg-accent">
        <PopoverTrigger asChild>
          <Button
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between text-white font-bold"
          >
            {value ? originOptions.find((data) => data === value) : "Select..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="bg-primary text-white font-bold">
          <Command>
            <CommandInput className="placeholder-white font-bold" placeholder="Search..." />
            <CommandEmpty>No place found.</CommandEmpty>
            <CommandGroup>
              {originOptions.map((data) => (
                <CommandItem
                  key={data}
                  value={data}
                  onSelect={() => {
                    setValue((currentValue) =>
                      currentValue === data ? "" : data
                    );
                    setOpen(false);
                    onSelect(data);
                  }}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      value === data ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {data}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default FlightSearchOrigin;
