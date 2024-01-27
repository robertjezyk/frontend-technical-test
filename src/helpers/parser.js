export const parser = (templateObject) => {
  if (
    typeof templateObject === "object"
    && templateObject
    && "template" in templateObject
  ) {
    const { template, ...values } = templateObject;

    let parsedTemplate = template;

    Object.keys(values).forEach((key) => {
      const regex = new RegExp(`\\$${key}`, "g");
      parsedTemplate = parsedTemplate.replace(regex, values[key]);
    });

    return parsedTemplate;
  }
  return undefined;
};
