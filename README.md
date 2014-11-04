<center>![](http://i.imgur.com/SmLtxEo.png)</center>

# Parrot

[![Build Status](http://img.shields.io/travis/sailorjs/parrotjs/master.svg?style=flat)](https://travis-ci.org/sailorjs/parrotjs)
[![Dependency status](http://img.shields.io/david/sailorjs/parrotjs.svg?style=flat)](https://david-dm.org/sailorjs/parrotjs)
[![Dev Dependencies Status](http://img.shields.io/david/dev/sailorjs/parrotjs.svg?style=flat)](https://david-dm.org/sailorjs/parrotjs#info=devDependencies)
[![NPM Status](http://img.shields.io/npm/dm/parrotjs.svg?style=flat)](https://www.npmjs.org/package/parrotjs)
[![Gittip](http://img.shields.io/gittip/Kikobeats.svg?style=flat)](https://www.gittip.com/Kikobeats/)

> Client library to connect your frontend application with whatever sails backend.

Parrot helps you connect your frontend with you API backend. Only need to say to parrot what do, and parrot will do the hard work!
a
At this moment Parrot supports:

- Register different environments (development, production, testing,...).
- Register different URLs with different protocols (http, sockets) and make easy AJAX requests.
- Manage uniformly sessionStorage and localStorage.
- Multilanguage support.
- Chainable methods.

## Install


```bash
bower install parrotjs
```

## Usage

You need to link the library in your frontend. You can use Gulp/Grunt to build and concatenate it with other dependencies o simply link it as a html script tag:

```html
<script src="bower_components/parrotjs/dist/parrot.js"></script>
```

At this moment, Parrot has two dependencies:

- [jsurl](https://github.com/Mikhus/jsurl) for url query string parser.
- [jQuery](https://github.com/jquery/jquery) for AJAX requests.

So, there are two version of the library:

- `standard` version has all the code with dependencies.
- `standalone` version has code without dependencies.

We are working to offer a library without dependencies, writing our own query params parser and ajax handler. For more information check [Roadmap](https://github.com/sailorjs/parrotjs/blob/master/ROADMAP.md) section.

## API

The library is divided in different namespaces:

### Basic

This method is available in `parrot` namespace. This is the basic method that you need yo set up the library and know the current version.

#### .version

Returns the version of the library.

```coffee
parrot.version
# => '0.10.25'
```

#### .environment

Returns the environment that you are using at this moment.

```coffee
parrot.environment
# => 'development'
```

Default environment is `development`.

#### .language

Returns the language that you want to use in the requests with your API's endpoints.

```coffee
parrot.language
# => 'en'
```

Default language is obtained from `navigator.language`, that is the language of the browser of the user.

#### .ajax(\<Object> or \<String>)

Returns the result of AJAX request.

It exists different ways to provide the URL of the AJAX request, but the most common pattern is to give a `parrot.url` object:

```coffee
parrot.url.ajax parrot.url.login(), (err, result) ->
```

If you want to write less code:

```coffee
parrot.url.ajax 'login', (err, result) ->
```

Also you can provide a URL that you are not registerin but that follows a `parrot.url` similar interface (extra field for the `url` because it is not calculated based on the `parrot.environment`).

```coffee
object = url: 'http://echo.jsontest.com/key/value/one/two', method: 'GET'
parrot.url.ajax object, (err, result) ->
```

Default options are supported here also:

```coffee
object = url: 'http://echo.jsontest.com/key/value/one/two'
parrot.url.ajax object, (err, result) ->
```

and more simply, you can provide only the URL if it is a `GET` method:

```coffee
parrot.url.ajax 'http://echo.jsontest.com/key/value/one/two', (err, result) ->
```


### Endpoint

This method is available in `parrot.endpoint` namespace:

#### .add(\<object>)

registers a new endpoint. Object must have:

```
{
	name:'development',
	url:'http://localhost:1337'
}
```

When you register an endpoint it is accesible in the `parrot.endpoint` namespace:

```coffee
parrot.endpoint.development()
# => http://localhost:1337
```

#### .set(\<value>)

Sets the default environment of `parrot.environment`. It's important because the URL's depend on the URL path register in the environment.

```coffee
parrot.environment.set('production')
```

#### .remove(\<name>)

Deletes a environment from the namespace

```coffee
parrot.environment.remove('testing')
```

### URL Management

URL Management makes easy to do ajax or sockets requests with your backend. In order to do it, you need first to register the URL's. Each URL has a different schema as `protocol`, `path` and/or `query`.

This method is available in `parrot.url` namespace:

#### .add(\<object>)

Registers a new URL. The minimum information you need to check is:

```
name: 'login'
```

but you can be more specific. All options available are:

```coffee
options =
  name     : 'login'
  headers  : Authorization: 'Bearer 1234'
  method   : 'post'
  protocol : 'http'
  path     : 'user/login'
  query    : ['sort','id asc']
  send     : userObject
```

by default `method` is `GET`, protocol is HTTP and other attributes you don't provide are `undefined`.

Now, the URL is available in the `parrot.url` namespace:

```coffee
parrot.url.login()
# => { method: 'GET', protocol: 'http', path: 'user/login', query: null }
```

If you want update some value, you can provide an argument when you call the method. For example, for login you need to send the user information to the server:

```coffee
user = username: 'kiko', password: 'nerd'
parrot.url.login(send: user)
```

#### .remove(\<name>)

Delete a URL from the namespace.

```coffee
parrot.url.remove('logout')
```

### Storage

This module is a little interface for using the same pattern in `localStorage` and `sessionStorage`. Both are different namespaces: `parrot.store.local` and `parrot.store.session`. But both methods are the same.

Remember that the only difference between `localStorage` and `sessionStorage` is the time of life of the information in the browser. `localStorage` is persisten and only is deleted if you clean it. `sessionStorage` is only for the session (for example, if you close and open the tab, disappear).

#### .set(\<key>, \<value>)

Stores something in `session` or `local` storage, depending on the namespace that you uses.

```coffee
parrot.store.local.set('foo', 'bar')
```

and the key is available in the namespace:

```coffee
parrot.store.local.foo()
# => 'bar'
```

You can also store objects:

```coffee
object = foo:'bar'
parrot.store.local.set('myObject', object)
# => 'bar'
```

And the object is directly available in the namespace:

```coffee
parrot.store.local.myObject()
# => {foo: 'bar'}
```

#### .clear(\<key>)

Deletes the key and the value from the `local` or `session` storage:

```coffee
parrot.store.local.clear('one')
parrot.store.local.one()
# => undefined
```

#### .clearAll()

Clears all the elements from tal` or `session` storage:

```coffee
parrot.store.local.removeAll()
parrot.store.session.removeAll()
```

#### .size()

Returns the length of the `local` or `session` storage:

```coffee
parrot.store.local.size()
# => 0
parrot.store.session.size()
# => 8
```

#### .isAvailable(\[key])

Returns if a certain value if available in the `local` or `session` storage:

```coffee
parrot.store.local.isAvailable('foo')
# => false
parrot.store.local.isAvailable('bar')
# => true
```

### sessionStorage Helpers

`parrot.store.session` has a special helpers to make easy save and retrieve the session. It's similar to the standard actions, but you have to write less code for do the same.

If you want to save a user session only write:

```coffee
parrot.store.session.set(user)
```

Automatically is associated with the key `session`. If you need to `get`, `clear` or check if `isAvailable` write the command without parameter and is resolved with `session` key:

```coffee
parrot.store.session.get(user)
parrot.store.session.clear()
parrot.store.session.isAvailable()
# => false
```

## License

MIT © sailorjs
