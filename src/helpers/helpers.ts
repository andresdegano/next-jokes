export const obfustacteEmail = (value: string) => {
    const splitted = value?.split("@") || [""];
    const domain = splitted[1]?.split(".") || [];
    return `${splitted[0] || ""}@***.${
      !!domain.length ? domain[domain.length - 1] : "com"
    }`;
  };