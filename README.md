[![Build Status](https://travis-ci.org/ipatate/gdpr-cookies.svg?branch=develop)](https://travis-ci.org/ipatate/gdpr-cookies)

### 🍪 System GDPR cookie for website. A11y

### Informs the visitor on the services used in your website and gives the possibility of disabling services

ℹ️ On the first visit, the banner is show. If the visitor click a link or a button in page, the cookies are accepted by default.

#### Use the files in dist directory for include on your site

gdpr-cookies.css 7ko (~2ko gzip)

gdpr-cookies.js 69ko (~19ko gzip)

## Add script in page

```html
<script src="path/gdpr-cookies.js" async></script>
```

## Add style in page

```html
<link href="path/gdpr-cookies.css" rel="stylesheet" />
```

## Init Gdpr Cookie

Set this code in the head of your page

```js
<script>var _gdpr = _gdpr || [];</script>
```

Add your script service (see example google tag bellow )

```js
_gdpr.push([.....]);
```

And use global function for init GdprCookie (footer)

```js
document.addEventListener('DOMContentLoaded', function () {
  window.initGdprCookie.default('fr');
});
```

## For npm user

install package

```bash
npm install gdpr-cookies
```

import in your javascript file

```js
import initGdprCookie from 'gdpr-cookies';
```

And use function for init GdprCookie

```js
initGdprCookie('fr');
```

import sass files

```scss
@import 'path-to-your-node_modules/gdpr-cookies/dist/gdpr-cookies.css';
```

## Declare external script

Push array in \_gdpr array.

```js
_gdpr.push([
  {
    name: '',
    type: '',
    description: ''
  },
  [callback, callback,..]
])
```

First element is object:

- name : string (unique and required)
- type : string (type of service) required, default: Stats | Ads | Others
- description : string (text for describe service) optional

Second element is Array of Functions

All the callback function called if service is allowed

You can use argument helpers in function.

- `createScript(src)` for create script tag in head
- `createStyle(href)` for create style tag in head
- `createIframe('id', {href: '', width: '200px'});` for create iframe tag in target element. Add attribute for iframe with second argument options object

#### Example for google tag

```js
<script type="text/javascript">
_gdpr.push([
  {
    type: 'stats',
    name: 'Google Tag',
    description: 'Service pour statistiques des visites'
  },
    [
      function(helpers) {
        // use helpers
        helpers.createScript('https://www.googletagmanager.com/gtag/js?id=' + keys_api.gtag);

        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments)
        }
        gtag('js', new Date());
        gtag('config', '########');
      }
    ]
  ]);
</script>
```

### If you want add multiple callback, create var for push callback after.

```js
var myCB = [];
// declare service
_gdpr.push([
  {
    type: 'stats',
    name: 'Google Tag',
    description: 'Service pour statistiques des visites'
  },
    myCB
]);

// ...
// on the page
<script type="text/javascript">
myCB.push(function(helpers){ return true;});
</script>
```

# Options for init Gdpr Cookie

## language

You can define lang with (default is fr):

```js
var _gdpr_lang = 'fr';
```

## options Gdpr Service

```js
var _gdpr_options = {
  name: 'gdpr_cookie', // name of cookie gdpr
  keepCookies: ['TEST'], // cookie not to delete
  types: ['ads', 'stats', 'others'], // type of services
  expires: 395, // cookie duration (in days)
  optout: true, // default undefined. If true, the services is optout.
};
```

## i18n messages

The message by default exists for fr, en and es.
If you want to add or define your messages, you can create a messages in your html, ex :

```js
var _gdpr_messages = {
  fr: {
    banner_title: "Information sur l'utilisation de cookies sur le site",
    alert_text:
      "En poursuivant votre navigation, vous acceptez l'utilisation de services tiers pouvant installer des cookies",
    banner_ok_bt: 'Ok, tout accepter',
    banner_custom_bt: 'Personnaliser les cookies',
    modal_header_txt: 'Préférence pour tous les services',
    close_modale_label: 'Fermer la fenêtre',
    service_accept: 'Activer',
    service_accept_all: 'Activer tous les services',
    service_bloc_all: 'Bloquer tous les services',
    service_activated: 'Service activé',
    service_blocked: 'Service bloqué',
    modal_valid: 'Appliquer les reglages',
    ads: 'Publicités',
    stats: 'Statistiques',
    others: 'Autres services',
    mask_text_start: 'Le service',
    mask_text_end: 'est désactivé',
    activate: 'activer',
    deactivate: 'désactiver',
  },
};
```

## Add link for open modal (sorry for the onclick 😅)

```js
window._gdpr_showModal();
```

ex:

```html
<a href="#" onclick="window._gdpr_showModal();return false;">Show modal</a>
```

## Add Mask with buttons for service disabled

Add just class (gdpr-mask) and name of service with data-gdpr. Ex:

```html
<div
  id="map"
  class="gdpr-mask"
  data-gdpr="Google Map"
  style="width: 100%; height: 400px;"
></div>
```

# 🤓 Dev

The code use :

- ES2018
- Webpack
- Flow
- Babel

For UI :

- Preact
- Redux Zero
- Sass
- Jest

# Browsers Compatibility

- Desktop:

  - Chrome 🆗
  - Firefox 🆗
  - Edge 🆗
  - Opera 🆗
  - IE11 🆗

- Mobile
  - Iphone Safari (ios7 ⛔ , ios8 🆗 , ios9 🆗, ios10 🆗)
  - Iphone Chrome (ios7 ⛔ , ios8 🆗 , ios9 🆗, ios10 🆗)
  - Iphone webview (ios7 ⛔ , ios8 🆗 , ios9 🆗, ios10 🆗)
  - Android Chrome (Android 4.4 🆗, Android 5 🆗)
  - Android UC Browser (Android 4.4 ⛔)

## Browsers tested with [https://www.browserstack.com](https://www.browserstack.com)

[![browserstack](https://raw.githubusercontent.com/ipatate/gdpr-cookies/master/Browserstack-logo@2x.png)](https://www.browserstack.com)
