# React Autosearchbar

Customizable searchbar for React. Supports from-middle-of-word searches and provides autocomplete options with matching characters in bold text.

When only one character is entered only items beginning with that character are returned. When multiple character are entered then all results containing that character combination are returned.

```javascript
import { Searchbar } from "react-autosearchbar";
```

```jsx
<Searchbar data={data} returnSuggestions={returnSuggestions} />
```

Checkout out this [example](https://codesandbox.io/embed/react-autosearchbar-46z17) to see how to use the component.

## Install

### npm

`npm install --save react-autosearchbar`

## Prerequisites

[styled components](https://www.styled-components.com/)

`npm install --save styled-components`

## Usage

Add the Searchbar component where ever you would like it to appear. Autocomplete options will populate directly underneath it as the user types.

## Props

### Required

#### `data: Array`

An array of the items you wish to search through. React Autosearchbar does not sort this array so you may need to sort your data first if you want autocomplete suggestions to appear in alphabetical order.

#### `returnSuggestions: Function(array)`

Function that is called when the user presses Enter or clicks on an autocomplete item. Takes an array of the currently displayed autocomplete suggestions as an argument. Write this function to suit your needs.

##### Example

```javascript
const returnSuggestions = suggestions => {
  this.setState({ searchResults: suggestions });
};
```

### Optional

The following Props are optional and are primarily used to style the Searchbar and AutoComplete components via styled-components.

#### `autoCompBackgroundColor: String [default: white]`

Set background-color of autocomplete items.

#### `autoCompColor: String [default: black]`

Set font color of autocomplete items.

#### `backgroundHover: String [default: #e9e9e9]`

Set background-color of autocomplete items during hover.

#### `borderColor: String [default: #d4d4d4]`

Set border-color of autocomplete items.

#### `borderRadius: String [default: 4px]`

Set border-radius of input field and autocomplete items.

#### `borderStyle: String [default: solid]`

Set border-style of autocomplete items.

#### `fontFamily: String [default: Roboto, sans-serif]`

Set font-family of input field and autocomplete items.

#### `fontSize: String [default: 1em]`

Set font-size of input field and autocomplete items.

#### `highlightBackground: String [default: DodgerBlue]`

Set background-color of autocomplete item when it is highlighted via the arrow keys.

#### `inputBackgroundColor: String [default: white]`

Set background-color of input field.

#### `inputColor: String [default: black]`

Set font color of input field.

#### `inputHeight: String [default: 35px]`

Set height and line-height properties of input field and autocomplete items. Can be any valid css height value.

#### `placeholder: String [default: Search]`

Placeholder value for input field.

#### `paddingLeft: String [default: .5em]`

Set left-padding of input field and autocomplete items.

#### `resultLimit: Number [default: null]`

Set a limit to the number of autocomplete items that are displayed at a time. By default all results will be shown.

#### `width: String [default: 100%]`

Set width of Searchbar component.
