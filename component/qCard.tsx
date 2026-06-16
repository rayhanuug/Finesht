"use client";

import { useState } from "react";

type Props = {
  question: string;
  type: "input" | "radio" | "chip" | "chip-input" | "scale";
  options?: string[];
};

function convertToAngka(opt: string): string {
  const map: Record<string, string> = {
    "5 Jt": "5000000",
    "7 Jt": "7000000",
    "10 Jt": "10000000",
    "12 Jt": "12000000",
    "20 Jt": "20000000",
  };
  return map[opt] ?? "";
}

function ChipOptions({
  options,
  selected,
  onSelect,
}: {
  options: string[];
  selected: string | null;
  onSelect: (opt: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-5">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className={`px-4 py-1.5 rounded-xl border text-xs font-poppins transition-all duration-200
            ${
              selected === opt
                ? "bg-white text-black border-white"
                : "bg-transparent text-white/70 border-white/30 hover:border-white/70 hover:text-white"
            }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function RadioOptions({ options }: { options: string[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-3 mt-1">
      {options.map((opt) => (
        <label
          key={opt}
          onClick={() => setSelected(opt)}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div
            className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-200
              ${
                selected === opt
                  ? "border-white"
                  : "border-white/40 group-hover:border-white/70"
              }`}
          >
            {selected === opt && (
              <div className="w-2 h-2 rounded-full bg-white" />
            )}
          </div>
          <span className="text-white/80 font-poppins text-sm">{opt}</span>
        </label>
      ))}
    </div>
  );
}

function InputRp({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const isFocused = value !== "";
  return (
    <div className={`border rounded-xl px-4 py-3 flex items-center gap-2 bg-black/10 transition-all duration-200 ${isFocused ? "border-white" : "border-white/20"}`}>
      <span className={`font-poppins text-sm transition-all duration-200 ${isFocused ? "text-white" : "text-white/40"}`}>
        Rp
      </span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-white font-poppins text-sm outline-none w-full placeholder:text-white/30"
        placeholder="0"
      />
    </div>
  );
}

function ScaleOptions({ options }: { options: string[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div className="flex gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => setSelected(opt)}
          className={`flex-1 py-2 rounded-xl border text-xs font-poppins transition-all duration-200
            ${
              selected === opt
                ? "bg-white text-black border-white"
                : "bg-transparent text-white/70 border-white/30 hover:border-white/70 hover:text-white"
            }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function ChipWithInput({ options }: { options: string[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");

  function handleChipSelect(opt: string) {
    setSelected(opt);
    const angka = convertToAngka(opt);
    setInputValue(angka);
  }

  return (
    <div className="flex flex-col gap-3">
      <ChipOptions options={options} selected={selected} onSelect={handleChipSelect} />
      <InputRp value={inputValue} onChange={setInputValue} />
    </div>
  );
}

function StandaloneInput() {
  const [inputValue, setInputValue] = useState("");
  return <InputRp value={inputValue} onChange={setInputValue} />;
}

export default function QuestionCard({ question, type, options = [] }: Props) {
  return (
    <div
      className="rounded-2xl border border-white/20 p-5 flex flex-col gap-4 w-full"
      style={{
        background: "rgba(4, 4, 4, 0.20)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Question */}
      <p className="text-white font-poppins font-medium text-sm leading-relaxed">
        {question}
      </p>

      {/* Content */}
      {type === "chip" && (
        <ChipOptions options={options} selected={null} onSelect={() => {}} />
      )}
      {type === "chip-input" && <ChipWithInput options={options} />}
      {type === "radio" && <RadioOptions options={options} />}
      {type === "input" && <StandaloneInput />}
      {type === "scale" && <ScaleOptions options={options} />}
    </div>
  );
}