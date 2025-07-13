export const getLabelWidth = (id: string) => {
  const labelElement = document.querySelector(`label[for="${id}"]`);
  return labelElement?.clientWidth ?? 0;
};

export const getIDFromProps = (props: { id?: string, name?: string }) => {
  if (props.id) {
    return props.id;
  }
  if (props.name) {
    const existingElement = document.getElementById(props.name);
    if (!existingElement) {
      return props.name;
    }
  }
  return `input-${Math.random().toString(36).substring(2, 15)}`;
};