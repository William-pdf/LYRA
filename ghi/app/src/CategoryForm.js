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
    const url = "http://localhost:8000/trl/api/categories/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newCategory = await response.json();
      console.log(newCategory);
      const cleared = {
        name: "",
      };
      this.setState(cleared);
    }
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a category</h1>
            <form onSubmit={this.handleSubmit} id="create-category-form">
              <div className="form-floating mb-3">
                <input
                  value={this.state.name}
                  onChange={this.handleNameChange}
                  placeholder="Category"
                  required
                  type="text"
                  name="category"
                  id="category"
                  className="form-control"
                />
                <label htmlFor="category">Category</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryForm;
