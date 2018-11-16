// @flow
export const createScript = (src: string): void => {
  const tag: HTMLScriptElement = document.createElement('script');
  tag.type = 'text/javascript';
  tag.async = true;
  tag.src = src;
  const s: HTMLScriptElement = document.getElementsByTagName('script')[0];
  const parent: ?Node = s.parentNode;
  if (parent) {
    parent.insertBefore(tag, s);
  }
};
