import type {
  UseFormSetError,
  UseFormClearErrors,
} from "react-hook-form";

type ValidateDimensionFieldsParams = {
  index: number;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  isImperial: boolean;
  weightUnit: string;
  lengthUnit: string;
  setError: UseFormSetError<any>;
  clearErrors: UseFormClearErrors<any>;
};

export const validateDimensionFields = ({
  index,
  weight,
  length,
  width,
  height,
  isImperial,
  weightUnit,
  lengthUnit,
  setError,
  clearErrors,
}: ValidateDimensionFieldsParams) => {
  const fields = {
    weight: `lineItem.units.${index}.weight`,
    length: `lineItem.units.${index}.length`,
    width: `lineItem.units.${index}.width`,
    height: `lineItem.units.${index}.height`,
  };

  const limits = {
    weight: isImperial ? 5000 : 2268,
    length: isImperial ? 120 : 305,
    width: isImperial ? 96 : 244,
    height: isImperial ? 96 : 244,
  };

  const validate = (
    value: number | undefined,
    max: number,
    field: string,
    label: string,
    unit: string
  ) => {
    if (!value || Number(value) <= max) {
      clearErrors(field);
      return;
    }

    setError(field, {
      type: "manual",
      message: `${label} exceeds maximum allowed (${max} ${unit})`,
    });
  };

  validate(weight, limits.weight, fields.weight, "Weight", weightUnit);
  validate(length, limits.length, fields.length, "Length", lengthUnit);
  validate(width, limits.width, fields.width, "Width", lengthUnit);
  validate(height, limits.height, fields.height, "Height", lengthUnit);
};