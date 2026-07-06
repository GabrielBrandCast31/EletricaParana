type Props = {
  variant: "escuro" | "claro" | "dinamico-claro-dark" | "dinamico-dark-light";
  className?: string;
  size?: number;
};

export function WhatsappIcon({ variant, className, size = 20 }: Props) {
  if (variant === "dinamico-claro-dark") {
    return (
      <span className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
        <img
          src="/icones/whatsapp-escuro.svg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
          style={{ width: "100%", height: "100%" }}
        />
        <img
          src="/icones/whatsapp-claro.svg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ width: "100%", height: "100%" }}
        />
      </span>
    );
  }

  if (variant === "dinamico-dark-light") {
    return (
      <span className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
        <img
          src="/icones/whatsapp-claro.svg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
          style={{ width: "100%", height: "100%" }}
        />
        <img
          src="/icones/whatsapp-escuro.svg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ width: "100%", height: "100%" }}
        />
      </span>
    );
  }

  const src =
    variant === "escuro"
      ? "/icones/whatsapp-escuro.svg"
      : "/icones/whatsapp-claro.svg";
  return (
    <img
      src={src}
      alt="WhatsApp"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    />
  );
}
