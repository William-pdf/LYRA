import React from "react";

class CategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    const value = event.target.value;
    this.setState({ name: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    console.log(data);
    const url = "http://localhost:8000/trl/api/categories";
  }
}
