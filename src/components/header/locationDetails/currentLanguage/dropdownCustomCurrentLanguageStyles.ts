import {
  CSSObjectWithLabel,
  DropdownIndicatorProps,
  GroupBase,
  OptionProps,
  StylesConfig,
} from "react-select";

export interface ILoadOptions {
  value: string;
  label: string;
}

export const dropdownCustomCurrentLocationStyles: StylesConfig<
  ILoadOptions,
  false,
  GroupBase<ILoadOptions>
> = {
  container: (base: CSSObjectWithLabel) => ({
    ...base,
    position: "static",
    "@media only screen and (min-width: 768px)": {
      position: "relative",
    },
  }),
  singleValue: (base: CSSObjectWithLabel) => ({
    ...base,
    color: "hsl(0, 0%, 50%)",
  }),
  dropdownIndicator: (
    base: CSSObjectWithLabel,
    props: DropdownIndicatorProps<ILoadOptions, false, GroupBase<ILoadOptions>>
  ) => ({
    ...base,
    "&:hover": {
      color: props.isFocused ? "hsl(0, 0%, 40%)" : "hsl(0, 0%, 60%)",
    },
  }),
  menu: (base: CSSObjectWithLabel) => ({
    ...base,
    position: "absolute",
    right: "0",
    maxWidth: "300px",
    marginTop: undefined,
    marginBottom: undefined,
    backgroundColor: undefined,
    boxShadow: undefined,
    borderRadius: "0.75rem",
    "&:hover": {
      backgroundColor: undefined,
    },
  }),
  menuList: (base: CSSObjectWithLabel) => ({
    ...base,
    position: "static",
    display: "flex",
    flexGrow: "1",
    paddingTop: undefined,
    paddingBottom: undefined,
    borderRadius: "0.75rem",
    overflow: "hidden",
    "@media only screen and (min-width: 768px)": {
      position: "absolute",
      display: "block",
    },
  }),
  option: (
    base: CSSObjectWithLabel,
    props: OptionProps<ILoadOptions, false, GroupBase<ILoadOptions>>
  ) => ({
    ...base,
    display: "inline",
    fontSize: "0.75rem",
    lineHeight: "1rem",
    backgroundColor:
      props.isFocused && props.isSelected
        ? "rgb(30 27 75)"
        : "rgb(30 27 75 / 0.6)",
    padding: "0.5rem",
    "&:hover": {
      backgroundColor: "rgb(30 27 75)",
      cursor: "pointer",
    },
    "&:active": {
      backgroundColor: "rgb(30 27 75)",
    },
    "@media only screen and (min-width: 768px)": {
      display: "block",
    },
    "@media only screen and (min-width: 1024px)": {
      fontSize: "1.125rem",
      lineHeight: "1.75rem",
    },
    "@media only screen and (min-width: 2560px)": {
      fontSize: "1.25rem",
      lineHeight: "1.75rem",
    },
  }),
};
