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

export const createStyle = (href: string): void => {
  const tag: HTMLLinkElement = document.createElement('link');
  tag.type = 'text/css';
  tag.rel = 'stylesheet';
  tag.href = href;
  const head: HTMLHeadElement = document.getElementsByTagName('head')[0];
  if (head) {
    head.appendChild(tag);
  }
};
