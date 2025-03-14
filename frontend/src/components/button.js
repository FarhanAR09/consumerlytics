export default function Button({ text, onClick, variant="primary", w, h, pl, pr }) {

    const variantStyles = {
        primary: "bg-gradient-to-r from-[#44E7F9] to-[#3AC0D8]",
        bright: "bg-white",
      };
    const textStyles = {
        primary: "text-black",
        bright: "text-black",
      };
    return (
        <button
          className={
            `${variantStyles[variant] || variantStyles.primary}
            p-2 rounded-full
            shadow-md`}
          onClick={onClick}
          style={{
            width: w ? `${w}px` : "auto",
            height: h ? `${h}px` : "auto",
          }}
        >
          <p className={`${textStyles[variant] || textStyles.primary}`}>
            {text}
          </p>
        </button>
    );
  }