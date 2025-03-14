import { useState } from "react";

export default function InputField({ onChange, w, h, type="text", placeholder}) {

    const [value, setValue] = useState(type === "number" ? 0 : "");
    const handleChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
        onChange(newValue);
    };

    return (
        <input
            type={type}
            value={value}
            onChange={handleChange}
            placeholder={placeholder ? placeholder : "Enter..."}
            className="pt-2 pb-2 pl-4 pr-4 rounded-full bg-white text-black focus:outline-none"
            style={{
                width: w ? `${w}px` : "auto",
                height: h ? `${h}px` : "auto",
            }}
        />
    );
  }