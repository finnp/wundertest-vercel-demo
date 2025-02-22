"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [operation, setOperation] = useState<string | null>(null);
  const [prevValue, setPrevValue] = useState<number | null>(null);

  const handleNumberClick = (num: string) => {
    setDisplay((prev) => (prev === "0" ? num : prev + num));
  };

  const handleOperationClick = (op: string) => {
    setOperation(op);
    setPrevValue(Number.parseFloat(display));
    setDisplay("0");
  };

  const handleEqualsClick = () => {
    if (operation && prevValue !== null) {
      const currentValue = Number.parseFloat(display);
      let result: number;

      switch (operation) {
        case "+":
          result = prevValue = currentValue;
          break;
        case "-":
          result = prevValue - currentValue;
          break;
        case "*":
          result = prevValue * currentValue;
          break;
        case "/":
          result = prevValue / currentValue;
          break;
        default:
          return;
      }

      setDisplay(result.toString());
      setOperation(null);
      setPrevValue(null);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setOperation(null);
    setPrevValue(null);
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <div className="bg-white p-4 text-right text-2xl mb-4 rounded">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[7, 8, 9, "+", 4, 5, 6, "-", 1, 2, 3, "*", "C", 0, "=", "/"].map(
          (item, index) => (
            <Button
              key={index}
              onClick={() => {
                if (typeof item === "number")
                  handleNumberClick(item.toString());
                else if (item === "C") handleClear();
                else if (item === "=") handleEqualsClick();
                else handleOperationClick(item);
              }}
              className={`text-lg ${item === "=" ? "col-span-2" : ""}`}
              variant={typeof item === "number" ? "outline" : "default"}
            >
              {item}
            </Button>
          )
        )}
      </div>
    </div>
  );
}
