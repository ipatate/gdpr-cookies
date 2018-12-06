// @flow
export const createScript = (src: string): HTMLScriptElement => {
  const tag: HTMLScriptElement = document.createElement('script');
  tag.type = 'text/javascript';
  tag.async = true;
  tag.src = src;
  const s: HTMLScriptElement = document.getElementsByTagName('script')[0];
  if (s) {
    const parent: ?Node = s.parentNode;
    if (parent) {
      parent.insertBefore(tag, s);
    }
  }
  return tag;
};

export const createStyle = (href: string): HTMLLinkElement => {
  const tag: HTMLLinkElement = document.createElement('link');
  tag.type = 'text/css';
  tag.rel = 'stylesheet';
  tag.href = href;
  const head: HTMLHeadElement = document.getElementsByTagName('head')[0];
  if (head) {
    head.appendChild(tag);
  }
  return tag;
};

export const createIframe = (
  target: string,
  options: {},
): HTMLIFrameElement => {
  const tag: HTMLIFrameElement = document.createElement('iframe');
  for (let key in options) {
    tag.setAttribute(key, options[key]);
  }
  const t = document.getElementById(target);
  if (t) {
    t.appendChild(tag);
  }
  return tag;
};
