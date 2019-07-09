import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import AutoComplete from "./AutoComplete.js";
import styled from "styled-components";

const FormWrapper = styled.div`
  width: ${props => props.width || "100%"};
`;

const Input = styled.input`
  width: 100%;
  border: none;
  border-radius: ${props => props.borderRadius || "4px"};
  height: ${props => props.inputHeight || "35px"};
  line-height: ${props => props.inputHeight || "35px"};
  padding-left: ${props => props.paddingLeft || ".5em"};
  font-size: ${props => props.fontSize || "1em"};
  background-color: ${props => props.inputBackgroundColor || "white"};
  color: ${props => props.inputColor || "black"};
  font-family: ${props => props.fontFamily || "Roboto, sans-serif"};
`;

export default class Searchbar extends React.Component {
  state = {
    suggestions: [],
    input: "",
    highlightItem: -1,
    suggestionMarkup: [],
    focused: false,
    searchbarHeight: "37px"
  };

  componentDidMount() {
    const searchbarHeight = document.getElementById("searchbar").clientHeight;
    this.setState({ searchbarHeight: searchbarHeight });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.input !== this.state.input) {
      this.getSuggestions(this.state.input, this.props.data);
    }
  }

  handleChange = e => {
    this.setState({ input: e.target.value, focused: true, highlightItem: -1 });
  };

  handleKeyDown = e => {
    const highlightItem = this.state.highlightItem;
    const suggestionCount = this.state.suggestions.length;
    //Enter Key is pressed
    if (e.keyCode === 13) {
      e.preventDefault();
      //Only accept Enter if there is input.
      if (this.state.input.length > 0) {
        //Take the highlighted option if it exists.
        if (highlightItem > -1) {
          this.props.returnSuggestions([this.state.suggestions[highlightItem]]);
          this.setState({
            input: this.state.suggestions[highlightItem],
            suggestions: this.state.suggestions,
            suggestionMarkup: this.state.suggestionMarkup,
            highlightItem: -1,
            focused: false
          });
        } else {
          this.props.returnSuggestions(this.state.suggestions);
        }
        this.setState({ suggestions: [], suggestionMarkup: [] });
      } else {
        //Send "empty search string" when user presses enter with no input.
        this.props.returnSuggestions("empty search string");
      }
      //Down Arrow is pressed
    } else if (e.keyCode === 40 && highlightItem < suggestionCount - 1) {
      const index = highlightItem + 1;
      this.setState({ highlightItem: index });
      // Up Arrow is pressed
    } else if (e.keyCode === 38 && highlightItem > -1) {
      const index = highlightItem - 1;
      this.setState({ highlightItem: index });
    }
  };

  getSuggestions = (input, array) => {
    const findAndParseMatches = (input, array) => {
      const suggestions = array.filter(
        item => item.toLowerCase().indexOf(input.toLowerCase()) > -1
      );
      const suggestionMarkup = suggestions.map(item => {
        let regExInsensitive = new RegExp(input, "gi");
        let matches = item.match(regExInsensitive);
        let itemMarkup = item;
        matches.forEach(match => {
          let regExCase = new RegExp(match, "g");
          let replaceStr = "<b>" + match + "</b>";
          itemMarkup = itemMarkup.replace(regExCase, replaceStr);
        });
        return itemMarkup;
      });
      return { suggestions, suggestionMarkup };
    };
    // For 0 characters clear suggestion list.
    if (input.length === 0) {
      this.setState({ suggestions: [], suggestionMarkup: [] });
      //For 1 character search, search only first character of each report.
    } else if (input.length === 1) {
      const suggestions = array.filter(
        item => item.toLowerCase().charAt(0) === input.toLowerCase()
      );

      const suggestionMarkup = suggestions.map(
        item => "<b>" + item.slice(0, 1) + "</b>" + item.slice(1)
      );

      this.setState({
        suggestions: suggestions,
        suggestionMarkup: suggestionMarkup
      });
      //For multiple characters find all matches.
    } else if (input.length > 1) {
      const { suggestions, suggestionMarkup } = findAndParseMatches(
        input,
        array
      );
      this.setState({
        suggestions: suggestions,
        suggestionMarkup: suggestionMarkup
      });
    }
  };

  onFocus = () => {
    this.setState({ focused: true });
  };

  onBlur = e => {
    if (
      e.relatedTarget == null ||
      !e.relatedTarget.id.includes("autoCompleteItem")
    ) {
      this.setState({ focused: false });
    }
  };

  onClick = e => {
    const suggestions = this.state.suggestions;
    const markup = this.state.suggestionMarkup;
    const item = suggestions[markup.indexOf(e.target.innerHTML)];
    this.props.returnSuggestions([item]);
    this.setState({
      suggestions: suggestions,
      suggestionMarkup: markup,
      focused: false,
      input: item
    });
  };

  render() {
    const {
      suggestions,
      suggestionMarkup,
      input,
      focused,
      searchbarHeight,
      highlightItem
    } = this.state;
    const {
      width,
      borderRadius,
      inputHeight,
      paddingLeft,
      inputBackgroundColor,
      inputColor,
      fontFamily,
      fontSize,
      placeholder,
      autoCompBackgroundColor,
      autoCompColor,
      backgroundHover,
      borderStyle,
      borderColor,
      highlightBackground,
      resultLimit
    } = this.props;

    const searchItems = suggestionMarkup.map((item, index) => {
      let top = searchbarHeight - 1;
      top += (searchbarHeight + 1) * index;
      top += "px";
      if ((resultLimit && index < resultLimit) || !resultLimit) {
        return (
          <AutoComplete
            key={index}
            onClickFunction={this.onClick}
            index={index}
            item={item}
            height={searchbarHeight}
            top={top}
            highlightItem={highlightItem}
            autoCompBackgroundColor={autoCompBackgroundColor}
            autoCompColor={autoCompColor}
            paddingLeft={paddingLeft}
            fontFamily={fontFamily}
            borderRadius={borderRadius}
            backgroundHover={backgroundHover}
            borderStyle={borderStyle}
            borderColor={borderColor}
            highlightBackground={highlightBackground}
          />
        );
      }
    });

    return (
      <FormWrapper width={width}>
        <form autoComplete="off">
          <div style={{ position: "relative" }}>
            <Input
              id="searchbar"
              type="text"
              placeholder={placeholder || "Search"}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              value={input}
              onFocus={this.onFocus}
              onBlur={e => this.onBlur(e)}
              borderRadius={borderRadius}
              inputHeight={inputHeight}
              paddingLeft={paddingLeft}
              fontSize={fontSize}
              inputBackgroundColor={inputBackgroundColor}
              inputColor={inputColor}
              fontFamily={fontFamily}
            />
            {focused && searchItems}
          </div>
        </form>
      </FormWrapper>
    );
  }
}

Searchbar.propTypes = {
  /* Required Props */
  data: PropTypes.array.isRequired, // Data to search and populate autocomplete list.
  returnSuggestions: PropTypes.func.isRequired, // Callback to return items matching search term.
  /* Optional Props */
  autoCompBackgroundColor: PropTypes.string, // Set background-color of autocomplete items.
  autoCompColor: PropTypes.string, // Set font color of autocomplete items.
  backgroundHover: PropTypes.string, // Set background-color of autocomplete items when hovered.
  borderColor: PropTypes.string, // Set border-color of autocomplete items.
  borderRadius: PropTypes.string, //Set border-radius of input field and autocomplete items
  borderStyle: PropTypes.string, // Set border-style of autocomplete items.
  fontFamily: PropTypes.string, // Set font-family of input field and autocomplete items.
  fontSize: PropTypes.string, // Set font-size of input field and autocomplete items.
  highlightBackground: PropTypes.string, // Set background-color of autocomplete items when item is highlighted using arrow keys.
  inputBackgroundColor: PropTypes.string, // Set background-color of input field.
  inputColor: PropTypes.string, // Set font color of input field
  inputHeight: PropTypes.string, // Set height of input field. This will also determin height and top properties of autocomplete items. Accepts any valid css height unit (px, em, rem, ect).
  placeholder: PropTypes.string, // Set placeholder atribute for input field.
  paddingLeft: PropTypes.string, // Set padding-left for input field and autocomplete items.
  resultLimit: PropTypes.number, // Set max number of autocomplete results.
  width: PropTypes.string // Set width of Searchbar component.
};
