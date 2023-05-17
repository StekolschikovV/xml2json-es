# xml2json-es
 xml2json-es is a JavaScript library that allows you to convert XML data to JSON format. It can be used in both browser environments and Node.js.

### Features
- Convert XML to JSON
- Handle XML data with nested elements and attributes
- Support for browser and Node.js environments
- Lightweight and easy to use
### Installation
You can install xml2jsonES using npm:
```js
npm install xml2jsones
```
### Usage
#### Browser
```js
import xml2jsonES from 'xml2json-es';
import axios from 'axios';

const RSS_URL = ``;

const fetchData = async () => {
  const response = await axios.get(RSS_URL);
  const xmlString = response.data;
  const parser = new window.DOMParser();
  const xml = parser.parseFromString(xmlString, "text/html");
  const json = xml2jsonES(xml, true);
};

fetchData();
```
#### Node.js
```js
const xml2jsonES = require('xml2json-es');
const axios = require('axios');

const RSS_URL = ``;

const fetchData = async () => {
  const response = await axios.get(RSS_URL);
  const xmlString = response.data;
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlString, "text/html");
  const json = xml2jsonES(xml, true);
};

fetchData();
```
###  API
xml2jsonES(element: Element | string | Object, json?: boolean): string | object
Converts XML data to JSON format.
- element (required): The XML element or string to convert to JSON.
- json (optional): If set to true, the function returns the JSON as a string. Default is - false, which returns the JSON as an object.

###  License
MIT
