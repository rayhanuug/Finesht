"use client";

import { useState, useEffect, useRef } from "react";

type Props = {
  question: string;
  type: "input" | "radio" | "chip" | "chip-input" | "scale";
  options?: string[];
  value?: string;                          // ← tambah ini
  onValueChange?: (val: string) => void;
};

function convertToAngka(opt: string): string {
  const map: Record<string, string> = {
    "Tidak ada": "0",
    "100 Rb": "100000",
    "300 Rb": "300000",
    "500 Rb": "500000",
    "1 Jt": "1000000",
    "2 Jt": "2000000",
    "3 Jt": "3000000",
    "5 Jt": "5000000",
    "7 Jt": "7000000",
    "10 Jt": "10000000",
    "12 Jt": "12000000",
    "15 Jt": "15000000",
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
    <div className="flex flex-wrap gap-2 mb-3">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onSelect(opt)}
          className={`px-3 py-2 sm:px-4 sm:py-1.5 rounded-xl border text-xs font-poppins transition-all duration-200 ${
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

function RadioOptions({
  options,
  value,
  onValueChange,
}: {
  options: string[];
  value?: string;
  onValueChange?: (val: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(value ?? null);

  useEffect(() => {
    setSelected(value ?? null);
  }, [value]);

  return (
    <div className="flex flex-col gap-3 mt-1">
      {options.map((opt) => (
        <label
          key={opt}
          onClick={() => {
            setSelected(opt);
            onValueChange?.(opt);
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div
            className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-200
              ${selected === opt
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

  function formatDisplay(val: string): string {
    if (!val) return "";
    const num = val.replace(/\D/g, "");
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\./g, "");
    if (/^\d*$/.test(raw)) {
      onChange(raw);
    }
  }

  return (
    <div className={`border rounded-xl px-4 py-3 flex items-center gap-2 bg-black/10 transition-all duration-200 ${isFocused ? "border-white" : "border-white/20"}`}>
      <span className={`font-poppins text-sm transition-all duration-200 ${isFocused ? "text-white" : "text-white/40"}`}>
        Rp
      </span>
      <input
        type="text"
        inputMode="numeric"
        value={formatDisplay(value)}
        onChange={handleInput}
        className="bg-transparent text-white font-poppins text-sm outline-none w-full placeholder:text-white/30"
        placeholder="0"
      />
    </div>
  );
}

function ScaleOptions({
  options,
  value,
  onValueChange,
}: {
  options: string[];
  value?: string;
  onValueChange?: (val: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(value ?? null);

  useEffect(() => {
    setSelected(value ?? null);
  }, [value]);

  return (
    <div className="flex gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => {
            setSelected(opt);
            onValueChange?.(opt);
          }}
          className={`flex-1 py-2 rounded-xl border text-xs font-poppins transition-all duration-200
            ${selected === opt
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

function ChipWithInput({
  options,
  value,
  onValueChange,
}: {
  options: string[];
  value?: string;
  onValueChange?: (val: string) => void;
}) {
  const matchedChip = options.find((opt) => convertToAngka(opt) === value) ?? null;
  const [selected, setSelected] = useState<string | null>(matchedChip);
  const [inputValue, setInputValue] = useState(value ?? "");

  // Hanya sync dari luar kalau value berubah dari parent (restore localStorage)
  // bukan dari user ngetik
  const prevValue = useRef(value);
  useEffect(() => {
    if (prevValue.current !== value) {
      prevValue.current = value;
      const matched = options.find((opt) => convertToAngka(opt) === value) ?? null;
      setSelected(matched);
      setInputValue(value ?? "");
    }
  }, [value, options]);

  function handleChipSelect(opt: string) {
    setSelected(opt);
    const angka = convertToAngka(opt);
    setInputValue(angka);
    onValueChange?.(angka);
  }

  function handleInputChange(val: string) {
    setInputValue(val);
    const matched = options.find((opt) => convertToAngka(opt) === val) ?? null;
    setSelected(matched);
    onValueChange?.(val);
  }

  return (
    <div className="flex flex-col gap-3">
      <ChipOptions options={options} selected={selected} onSelect={handleChipSelect} />
      <InputRp value={inputValue} onChange={handleInputChange} />
    </div>
  );
}

function StandaloneInput({
  value,
  onValueChange,
}: {
  value?: string;
  onValueChange?: (val: string) => void;
}) {
  const [inputValue, setInputValue] = useState(value ?? "");

  useEffect(() => {
    setInputValue(value ?? "");
  }, [value]);

  function handleChange(val: string) {
    setInputValue(val);
    onValueChange?.(val);
  }

  return <InputRp value={inputValue} onChange={handleChange} />;
}

export default function QuestionCard({ question, type, options = [], value = "", onValueChange }: Props) {
  return (
    <div
      className="rounded-2xl border border-white/20 p-5 flex flex-col gap-4 w-full"
      style={{
        background: "rgba(4, 4, 4, 0.20)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <p className="text-white font-poppins font-medium text-sm leading-relaxed">
        {question}
      </p>

      {type === "chip" && (
        <ChipOptions options={options} selected={value || null} onSelect={(val) => onValueChange?.(val)} />
      )}
      {type === "chip-input" && <ChipWithInput options={options} value={value} onValueChange={onValueChange} />}
      {type === "radio" && <RadioOptions options={options} value={value} onValueChange={onValueChange} />}
      {type === "input" && <StandaloneInput value={value} onValueChange={onValueChange} />}
      {type === "scale" && <ScaleOptions options={options} value={value} onValueChange={onValueChange} />}
    </div>
  );
}