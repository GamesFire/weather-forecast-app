import {
  CSSObjectWithLabel,
  ControlProps,
  DropdownIndicatorProps,
  GroupBase,
  IndicatorSeparatorProps,
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
    "@media only screen and (max-width: 768px)": {
      maxWidth: "300px",
      marginInline: "auto",
    },
  }),
  control: (
    base: CSSObjectWithLabel,
    props: ControlProps<ILoadOptions, false, GroupBase<ILoadOptions>>
  ) => ({
    ...base,
    justifyContent: "center",
    fontSize: "0.75rem",
    lineHeight: "1rem",
    color: "rgb(255 255 255)",
    border: undefined,
    borderRadius: props.menuIsOpen ? undefined : "0.75rem",
    borderTopLeftRadius: props.menuIsOpen ? "0.75rem" : undefined,
    borderTopRightRadius: props.menuIsOpen ? "0.75rem" : undefined,
    borderColor: props.isFocused ? undefined : undefined,
    borderWidth: props.isFocused ? undefined : undefined,
    boxShadow: undefined,
    backgroundColor: props.isFocused ? "rgb(30 27 75)" : "rgb(30 27 75 / 0.6)",
    "&:hover": {
      cursor: "pointer",
      border: undefined,
      backgroundColor: "rgb(30 27 75)",
    },
    "@media only screen and (min-width: 1024px)": {
      fontSize: "1rem",
      lineHeight: "1.5rem",
    },
    "@media only screen and (min-width: 2560px)": {
      fontSize: "1.25rem",
      lineHeight: "1.75rem",
    },
  }),
  valueContainer: (base: CSSObjectWithLabel) => ({
    ...base,
    padding: undefined,
  }),
  placeholder: (base: CSSObjectWithLabel) => ({
    ...base,
    marginLeft: undefined,
    marginRight: undefined,
    marginInline: "0.5rem",
  }),
  singleValue: (base: CSSObjectWithLabel) => ({
    ...base,
    color: "hsl(0, 0%, 50%)",
  }),
  indicatorSeparator: (
    base: CSSObjectWithLabel,
    props: IndicatorSeparatorProps<ILoadOptions, false, GroupBase<ILoadOptions>>
  ) => ({
    ...base,
    backgroundColor: props.isFocused ? "hsl(0, 0%, 40%)" : "hsl(0, 0%, 80%)",
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
  input: (base: CSSObjectWithLabel) => ({
    ...base,
    color: "rgb(255 255 255)",
    margin: undefined,
    padding: "0.5rem",
    paddingLeft: "1rem",
    "&:focus": {
      outline: "none",
    },
  }),
  menu: (base: CSSObjectWithLabel) => ({
    ...base,
    position: "relative",
    marginTop: undefined,
    marginBottom: undefined,
    backgroundColor: undefined,
    boxShadow: undefined,
    borderRadius: undefined,
    borderBottomLeftRadius: "0.75rem",
    borderBottomRightRadius: "0.75rem",
    "&:hover": {
      backgroundColor: undefined,
    },
    "@media only screen and (min-width: 768px)": {
      position: "absolute",
    },
  }),
  menuList: (base: CSSObjectWithLabel) => ({
    ...base,
    paddingTop: undefined,
    paddingBottom: undefined,
    borderBottomLeftRadius: "0.75rem",
    borderBottomRightRadius: "0.75rem",
    overflow: "hidden",
  }),
  option: (
    base: CSSObjectWithLabel,
    props: OptionProps<ILoadOptions, false, GroupBase<ILoadOptions>>
  ) => ({
    ...base,
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
    "@media only screen and (min-width: 1024px)": {
      fontSize: "1rem",
      lineHeight: "1.5rem",
      padding: "0.25rem",
    },
    "@media only screen and (min-width: 2560px)": {
      fontSize: "1.25rem",
      lineHeight: "1.75rem",
      padding: "0.5rem",
    },
  }),
  loadingMessage: (base: CSSObjectWithLabel) => ({
    ...base,
    fontSize: "0.75rem",
    lineHeight: "1rem",
    backgroundColor: "rgb(30 27 75 / 0.6)",
    borderRadius: undefined,
    borderBottomLeftRadius: "0.75rem",
    borderBottomRightRadius: "0.75rem",
    "@media only screen and (min-width: 1024px)": {
      fontSize: "1rem",
      lineHeight: "1.5rem",
    },
    "@media only screen and (min-width: 2560px)": {
      fontSize: "1.25rem",
      lineHeight: "1.75rem",
    },
  }),
  noOptionsMessage: (base: CSSObjectWithLabel) => ({
    ...base,
    fontSize: "0.75rem",
    lineHeight: "1rem",
    backgroundColor: "rgb(30 27 75)",
    "@media only screen and (min-width: 1024px)": {
      fontSize: "1rem",
      lineHeight: "1.5rem",
    },
    "@media only screen and (min-width: 2560px)": {
      fontSize: "1.25rem",
      lineHeight: "1.75rem",
    },
  }),
};
