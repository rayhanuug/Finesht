"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

type Props = {
  title: string;
  description: string;
  question: string;
  icon?: string;
  bgIcon?: string;
  bgIconWidth?: number;   
  bgIconHeight?: number;  
  bgIconClassName?: string;
  value: number;
  onChange: (val: number) => void;
};

export default function CriteriaCard({
  title,
  description,
  question,
  icon,
  bgIcon,
  bgIconClassName,
  bgIconHeight,
  bgIconWidth,
  value,
  onChange,
}: Props) {
  const [inputVal, setInputVal] = useState<string>(String(value));
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const valueRef = useRef(value);
  valueRef.current = value;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setInputVal(raw);
    const num = parseInt(raw);
    if (!isNaN(num) && num >= 0 && num <= 100) {
      onChange(num);
    }
  };

  const handleInputBlur = () => {
    const num = parseInt(inputVal);
    if (isNaN(num) || inputVal === "") {
      setInputVal("0");
      onChange(0);
    } else {
      const clamped = Math.min(Math.max(num, 0), 100);
      setInputVal(String(clamped));
      onChange(clamped);
    }
  };

  const stopPress = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const startPressDecrement = useCallback(() => {
    const next = Math.max(valueRef.current - 1, 0);
    valueRef.current = next;
    setInputVal(String(next));
    onChange(next);

    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        const next = Math.max(valueRef.current - 1, 0);
        valueRef.current = next;
        setInputVal(String(next));
        onChange(next);
      }, 80);
    }, 400);
  }, [onChange]);

  const startPressIncrement = useCallback(() => {
    const next = Math.min(valueRef.current + 1, 100);
    valueRef.current = next;
    setInputVal(String(next));
    onChange(next);

    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        const next = Math.min(valueRef.current + 1, 100);
        valueRef.current = next;
        setInputVal(String(next));
        onChange(next);
      }, 80);
    }, 400);
  }, [onChange]);

  return (
    <div
      className="relative rounded-xl border border-white/20 p-4 flex flex-col gap-3 overflow-hidden min-h-[320px]"
    >
      {/* Top Row — Icon & Badge */}
      <div className="flex items-start justify-between">
        <div
          className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center mt-2"
          style={{
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          {icon ? (
            <Image src={icon} alt={title} width={24} height={24} />
          ) : (
            <div className="w-6 h-60 rounded-md" />
          )}
        </div>
        {/* <span className="text-white/40 font-outfit font-bold text-sm">F</span> */}
      </div>

      {/* Title */}
      <h3 className="text-[#82E2B3] font-poppins font-semibold text-base leading-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="text-white/60 font-poppins font-light text-xs leading-relaxed">
        {description}
      </p>

      {/* Divider */}
      <div className="border-t border-white/30 my-1" />

      {/* Question */}
      <p className="text-white/80 font-poppins text-xs leading-relaxed flex-1">
        {question}
      </p>

      {/* Percentage Input */}
      <div className="flex items-center gap-2 mr-8 mt-auto">
        {/* Decrement */}
        <button
          onMouseDown={startPressDecrement}
          onMouseUp={stopPress}
          onMouseLeave={stopPress}
          onTouchStart={startPressDecrement}
          onTouchEnd={stopPress}
          className="w-6 h-5 rounded-md border border-white/30 flex items-center justify-center text-white/70 hover:border-white hover:text-white transition-all duration-200 text-sm flex-shrink-0 select-none"
        >
          −
        </button>

        {/* Input + % */}
        <div className="flex items-center gap-1 border border-white/20 rounded-lg px-2 py-1 backdrop-blur-xs flex-1 justify-evenly z-10">
          <input
            type="number"
            value={inputVal}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="bg-transparent text-white font-poppins text-sm outline-none w-10 text-center"
          />
          <span className="text-white font-poppins text-sm">%</span>
        </div>

        {/* Increment */}
        <button
          onMouseDown={startPressIncrement}
          onMouseUp={stopPress}
          onMouseLeave={stopPress}
          onTouchStart={startPressIncrement}
          onTouchEnd={stopPress}
          className="w-6 h-5 rounded-md border border-white/30 flex items-center justify-center backdrop-blur-xs text-white/70 hover:border-white hover:text-white transition-all duration-200 text-sm flex-shrink-0 select-none z-10"
        >
          +
        </button>
      </div>

      {/* Background Icon — pojok kanan bawah */}
      <div className={bgIconClassName ?? "absolute top-53 left-27.5 w-full pointer-events-none select-none opacity-90"}>
        {bgIcon ? (
          <Image src={bgIcon} alt="" width={bgIconWidth ?? 110} height={bgIconHeight ?? 64} aria-hidden="true" />
        ) : (
          <div className="w-full h-full rounded-xl bg-white/20" />
        )}
      </div>
    </div>
  );
}