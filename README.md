[![Build Status](https://travis-ci.org/ipatate/gdpr-cookies.svg?branch=develop)](https://travis-ci.org/ipatate/gdpr-cookies)

# Beta version.

### 🍪 System GDPR cookie for website. Informs the visitor of the use of cookies and gives the possibility to refuse cookies

### ℹ️ On the first visit, the banner is show. If visitor click on link or button for navigate, the cookie is accepted by default.

### Use files in dist directory

gdpr-cookie.css 5ko (1ko gzip)
gdpr-cookie.js 42ko (10ko gzip)

## Add script in page

```html
<script src="path/gdpr-cookie.js" async></script>
```

## Add style in page

```html
<link href="path/gdpr-cookie.css" rel="stylesheet">
```

## Init Grpd Cookie

Set this code in the head of your html

```js
<script>var _gdpr = _gdpr || [];</script>
```

## Add this tag just before end tag </body>

```html
<div id="gdpr-cookie"></div>
```

## Declare external script

Push array in _grpd array.

```js
_gdpr.push([
  {
    name: '',
    type: '',
    description: ''
  },
  callback
])
```

First element is object:
- name : string (unique and required)
- type : string (type of service) default: Stats | Ads | Others
- description : string (text for describe service)

Second element is Function

The callback function called if service is allowed

You can use argument helpers in function.
- ```createScript(src)``` for create script tag in head
- ```createStyle(href)``` for create style tag in head

#### Exemple for google tag

```js
<script type="text/javascript">
_gdpr.push([
  {
    type: 'stats',
    name: 'Google Tag',
    description: 'Service pour statistique des visites'},
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
  ]);
</script>
```

# Options

## language

You can define lang with (default is fr):

```js
var _gdpr_lang = 'fr';
```

## options Gpdr Service

```js
  var _gdpr_options = {
      name: 'gdpr_cookie', // name of cookie gdpr
      keepCookies: ['TEST'], // cookie not to delete
      types: ['ads', 'stats', 'others'], // type of services
      expires: 395, // cookie duration (in days)
  };
```

## i18n messages

The message by default exists for fr, en and es.
If you want to add or define your messages, you can create a messages in your html, ex :

```js
var _gdpr_messages = {
    fr: { // lang key
      alert_text:
        "En poursuivant votre navigation, vous acceptez l'utilisation de services tiers pouvant installer des cookies",
      banner_ok_bt: 'Ok, tout accepter',
      banner_custom_bt: 'Personnaliser',
      modal_header_txt: 'Préférence pour tous les services',
      service_accept: 'Autoriser',
      service_bloc: 'Interdire',
      modal_valid: 'Sauvegarder',
    },
  }
```

## Add link for open modal (sorry for the onclick 😅)

```html
<a href="#" onclick="window.showModal();return false;">Show modal</a>
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
