# react-browser-pathname

A window location wrapper for reading the current pathname.

## Installation

Using [npm](https://www.npmjs.com/):

    $ npm install --save react-browser-pathname

## Usage

Towards the top of your app, add the `BrowserPathname` Provider.

```javascript
import BrowserPathname from `react-browser-pathname`;

const AppProviders = () => (
    <BrowserPathname>
        <App />
    </BrowserPathname>
);
```

Within your any ancestor component use the hooks, e.g.:

```javascript
import { useBrowserPathname, usePushPath, useReplacePath } from 'react-browser-pathname';

const MyComponent = () => {
    const pathname = useBrowserPathname();
    const pushPath = usePushPath();
    const replacePath = useReplacePath();

    return (
        <div>
            <pre>{ pathname }</pre>
            <button onClick={() => pushPath('/awesome')}>Push path to navigate</button>
            <button onClick={() => replacePath('/awesomer')}>Replace path to navigate</button>
        </div>
    );
};
```
