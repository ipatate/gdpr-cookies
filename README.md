[![Build Status](https://travis-ci.org/ipatate/gdpr-cookies.svg?branch=develop)](https://travis-ci.org/ipatate/gdpr-cookies)

# Beta version.

### 🍪 System GDPR cookie for website. Informs the visitor of the use of cookies and gives the possibility to refuse cookies

### ℹ️ On the first visit, the banner is show. If visitor click on link or button for navigate, the cookie is accepted by default.

### Use files in dist directory

gdpr-cookie.css 5ko (~1ko gzip)

gdpr-cookie.js 45ko (~11ko gzip)

## Add script in page

```html
<script src="path/gdpr-cookie.js" async></script>
```

## Add style in page

```html
<link href="path/gdpr-cookie.css" rel="stylesheet">
```

## Init Gdpr Cookie

Set this code in the head of your html

```js
<script>var _gdpr = _gdpr || [];</script>
```

## Add this tag just before end tag </body>

```html
<div id="gdpr-cookie"></div>
```

## Declare external script

Push array in _gdpr array.

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
- ```createScript(src)``` for create script tag in head
- ```createStyle(href)``` for create style tag in head
- ```createIframe('id', {href: '', width: '200px'});``` for create iframe tag in target element. Add attribute for iframe with second argument options object

#### Exemple for google tag

```js
<script type="text/javascript">
_gdpr.push([
  {
    type: 'stats',
    name: 'Google Tag',
    description: 'Service pour statistique des visites'},
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
    description: 'Service pour statistique des visites'},
    myCB
  }
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
      ads: 'Publicités',
      stats: 'Statistiques',
      others: 'Autres services',
      mask_text_start: 'The service',
      mask_text_end: 'is disabled',
    },
  }
```

## Add link for open modal (sorry for the onclick 😅)

```html
<a href="#" onclick="window.showModal();return false;">Show modal</a>
```

## Add Mask with buttons for service disabled

Add just class (gdpr-mask) and name of service with data-grpd. Ex:

```html
 <div id="map" class="gdpr-mask" data-gdpr="Google Map" style="width: 100%; height: 400px;"></div>
 ```

class="gdpr-mask" data-gdpr="Facebook Video" style="width: 500px; height: 280px;"

# Exemple

[https://gdpr-cookies.goodmotion.fr/](https://gdpr-cookies.goodmotion.fr/)

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

## Browsers tested with [https://www.browserstack.com](https://www.browserstack.com)

[![browserstack](https://raw.githubusercontent.com/ipatate/gdpr-cookies/master/Browserstack-logo@2x.png)](https://www.browserstack.com)
