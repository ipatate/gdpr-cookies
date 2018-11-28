// @flow
export const validGdprArray = (
  serviceDescription: ServiceGlobal,
  typesAllowed: Array<string>,
): boolean => {
  if (
    typeof serviceDescription[0] === 'object' &&
    typeof serviceDescription[1] === 'function'
  ) {
    const desc = serviceDescription[0];
    const {name, type} = desc;
    // type is allowed
    return (
      type !== undefined &&
      name !== undefined &&
      typesAllowed.indexOf(type) > -1
    );
  }
  return false;
};
