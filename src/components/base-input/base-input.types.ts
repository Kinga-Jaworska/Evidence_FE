import React from "react";

export interface BaseInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label: string;
}
