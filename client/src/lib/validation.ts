import { VALIDATION_RULES } from "./constants";

export interface ValidationError {
  field: string;
  message: string;
}

export function validateField(
  fieldName: keyof typeof VALIDATION_RULES,
  value: string
): ValidationError | null {
  const rules = VALIDATION_RULES[fieldName];

  // Check required
  if (rules.required && !value?.trim()) {
    return { field: fieldName, message: `${fieldName} is required` };
  }

  // Skip further validation if field is not required and empty
  if (!rules.required && !value?.trim()) {
    return null;
  }

  // Check min length
  if ("minLength" in rules && rules.minLength && value.length < rules.minLength) {
    return {
      field: fieldName,
      message: `${fieldName} must be at least ${rules.minLength} characters`,
    };
  }

  // Check max length
  if ("maxLength" in rules && rules.maxLength && value.length > rules.maxLength) {
    return {
      field: fieldName,
      message: `${fieldName} must not exceed ${rules.maxLength} characters`,
    };
  }

  // Check pattern
  if ("pattern" in rules && rules.pattern && !rules.pattern.test(value)) {
    return { field: fieldName, message: rules.errorMessage };
  }

  return null;
}

export function validateCheckoutForm(formData: {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  barangay?: string;
  province?: string;
}): ValidationError[] {
  const errors: ValidationError[] = [];
  const fieldsToValidate: Array<keyof typeof VALIDATION_RULES> = [
    "name",
    "email",
    "phone",
    "address",
    "city",
    "postalCode",
  ];

  fieldsToValidate.forEach((field) => {
    const error = validateField(field, formData[field] as string);
    if (error) {
      errors.push(error);
    }
  });

  return errors;
}

export function getFieldError(
  fieldName: string,
  errors: ValidationError[]
): string | null {
  const error = errors.find((e) => e.field === fieldName);
  return error?.message || null;
}

export function isFormValid(errors: ValidationError[]): boolean {
  return errors.length === 0;
}
