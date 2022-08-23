import React, { Component, KeyboardEventHandler } from "react";

import CreatableSelect from "react-select/creatable";
import { ActionMeta, OnChangeValue } from "react-select";


interface Option {
  readonly label: string;
  readonly value: string;
}

const createOption = (label: string) => ({
  label,
  value: label,
});

interface State {
  readonly inputValue: string;
  readonly value: readonly Option[];
}

export default class MultiSelectTextInput extends Component<{}, State> {
  state: State = {
    inputValue: "",
    value: [],
  };
  handleChange = (
    value: OnChangeValue<Option, true>,
    actionMeta: ActionMeta<Option>
  ) => {
    console.group("Value Changed");
    console.log(value);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    this.setState({ value });
  };
  handleInputChange = (inputValue: string) => {
    this.setState({ inputValue });
  };
  handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    const { inputValue, value } = this.state;
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        console.group("Value Added");
        console.log(value);
        console.groupEnd();
        this.setState({
          inputValue: "",
          value: [...value, createOption(inputValue)],
        });
        event.preventDefault();
    }
  };
  render() {
    const { inputValue, value } = this.state;
    const customStyles = {
      control: () => ({
        border: "none",
        borderBottom: "1px solid gray",
        fontSize: "16px",
        align:'start',
        // none of react-select's styles are passed to <Control />
      }),
    };
    return (
      <CreatableSelect
        components={{
          DropdownIndicator: null,
        }}
        styles={customStyles}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        onKeyDown={this.handleKeyDown}
        placeholder="Add a keyword and press Enter"
        value={value}
      />
    );
  }
}
