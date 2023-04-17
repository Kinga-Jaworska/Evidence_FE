import React from "react";

export interface BaseInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  shrinkState?: boolean;
  label: string;
}
