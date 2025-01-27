import { OutlinedInput, OutlinedInputProps } from "@mui/material";
import { useState } from "react";

type ValidationType = "email" | "phone" | "date" | "identificationNumber";

interface ValidatedInputProps extends Omit<OutlinedInputProps, "error"> {
  validationType: ValidationType;
}

const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s-]{9,}$/,
  date: /^\d{2}[./]\d{2}[./]\d{4}$/,
  identificationNumber: /^\d{6}\/\d{4}$/,
};

const ERROR_MESSAGES = {
  email: "Invalid email format",
  phone: "Invalid phone number format",
  date: "Invalid date format (DD.MM.YYYY or DD/MM/YYYY)",
  identificationNumber: "Invalid format (123456/7890)",
};

export default function ValidatedInput({
  validationType,
  value,
  onChange,
  ...props
}: ValidatedInputProps) {
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const pattern = VALIDATION_PATTERNS[validationType];

    // Only validate if there's a value
    if (newValue && !pattern.test(newValue)) {
      setError(true);
    } else {
      setError(false);
    }

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <OutlinedInput
      {...props}
      error={error}
      onChange={handleChange}
      value={value}
      inputProps={{
        title: error ? ERROR_MESSAGES[validationType] : undefined,
      }}
    />
  );
}
