import React from "react";
import styled from "styled-components";

const AutoCompleteItem = styled.div`
  position: absolute;
  z-index: 99;
  left: 0;
  right: 0;
  width: 100%;
  border-width: 1px;
  top: ${props => props.top};
  height: ${props => (props.height ? props.height + "px" : "35px")};
  line-height: ${props => (props.height ? props.height + "px" : "35px")};
  font-family: ${props => props.fontFamily || "Roboto, sans-serif"};
  padding-left: ${props => props.paddingLeft || ".5em"};
  border-color: ${props => props.borderColor || "#d4d4d4"};
  border-style: ${props => props.borderStyle || "solid"}
  color: ${props => props.autoCompColor || "black"};
  background-color: ${props =>
    props.index === props.highlightItem
      ? props.highlightBackground
        ? props.highlightBackground + " !important"
        : "DodgerBlue !important"
      : props.autoCompBackgroundColor || "white"}

  border-radius: ${props => props.borderRadius || "4px"}
  &:hover {
    cursor: pointer;
    background-color: ${props => props.backgroundHover || "#e9e9e9"};
  }
`;

const AutoComplete = ({
  onClickFunction,
  index,
  item,
  autoCompBackgroundColor,
  autoCompColor,
  paddingLeft,
  fontFamily,
  height,
  top,
  borderRadius,
  backgroundHover,
  borderStyle,
  borderColor,
  highlightItem,
  highlightBackground
}) => {
  return (
    <AutoCompleteItem
      autoCompBackgroundColor={autoCompBackgroundColor}
      autoCompColor={autoCompColor}
      paddingLeft={paddingLeft}
      fontFamily={fontFamily}
      height={height}
      top={top}
      highlightItem={highlightItem}
      borderRadius={borderRadius}
      backgroundHover={backgroundHover}
      borderStyle={borderStyle}
      borderColor={borderColor}
      highlightBackground={highlightBackground}
      Auto
      index={index}
      tabIndex={0}
      id={"autoCompleteItem" + index}
    >
      <div
        dangerouslySetInnerHTML={{ __html: item }}
        onClick={e => onClickFunction(e)}
      />
    </AutoCompleteItem>
  );
};

export default AutoComplete;
