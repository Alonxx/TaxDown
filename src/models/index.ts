export type TTax = {
  id: string;
  name: string;
  year: string;
  active: boolean;
};

export type TInputsField = {
  id: string;
  label: string;
  placeholder?: string;
  type: string;
  maxLength?: number;
};

export type TSubmission = {
  [key: string]: string;
};

export type TFilterModel = {
  id: string;
  label: string;
  currentElement: string | null;
  elements: string[];
};
