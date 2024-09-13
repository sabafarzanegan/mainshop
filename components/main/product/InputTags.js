"use client";
import { useState } from "react";
import { Input } from "../../ui/input";

import { Badge } from "../../ui/badge";
import { XIcon } from "lucide-react";

function InputTags({ onChange, value }) {
  const [pendingDataPoint, setPendingDataPoint] = useState("");
  const [focused, setFocused] = useState(false);
  const addPendingDatePoint = () => {
    if (pendingDataPoint) {
      const newDatePoint = new Set([...value, pendingDataPoint]);
      onChange(Array.from(newDatePoint));
      setPendingDataPoint("");
    }
  };

  return (
    <div
      className={`w-full rounded-lg border border-input bg-background  text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
        focused
          ? "ring-offset-2 outline-none ring-ring ring-2"
          : "ring-offset-0 outline-none ring-ring ring-0"
      }`}>
      <div className="rounded-md min-h-[2.5rem]  p-2 flex gap-2 flex-wrap items-center">
        {value.length > 0 &&
          value.map((tag) => (
            <div className="">
              <Badge variant="outline">
                {tag}

                <button
                  className="w-3 ml-1"
                  onClick={() => onChange(value.filter((i) => i !== tag))}>
                  <XIcon className="w-3" />
                </button>
              </Badge>
            </div>
          ))}

        <div className="flex">
          <Input
            className="focus-visible:border-transparent border-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addPendingDatePoint();
              }
              if (
                e.key === "Backspace" &&
                !pendingDataPoint &&
                value.length > 0
              ) {
                e.preventDefault();
                const newValue = [...value];
                newValue.pop();
                onChange(newValue);
              }
            }}
            placeholder="add tags"
            value={pendingDataPoint}
            onChange={(e) => {
              setPendingDataPoint(e.target.value);
            }}
            onFocus={(e) => setFocused(true)}
            onBlurCapture={(e) => setFocused(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default InputTags;
