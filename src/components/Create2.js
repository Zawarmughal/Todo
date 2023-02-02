import React, { Component } from "react";

export default class Create extends Component {
  constructor() {
    super();
    this.state = {
      list: null,
      name: null,
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    fetch("http://localhost:3000/user").then((response) => {
      response.json().then((result) => {
        this.setState({ list: result });
      });
    });
  }
  create() {
    fetch("http://localhost:3000/user", {
      method: "Post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(this.state),
    }).then((result) => {
      result.json().then((response) => {
        alert("Added")
        this.setState({list:[]})
        // this.getData();
      })
    })
  }
  delete(id) {
    fetch("http://localhost:3000/user/" + id, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        this.getData();
      });
    });
  }
  render() {
    return (
      <div>
        <h1>List</h1>
        <form
          id="to-do-form"
          className="text-center"
          // onSubmit={this.addItem}
        >
          <input
            type="text"
            placeholder="Enter Text"
            onChange={(e) => {
              this.setState({ name: e.target.value });
            }}
          />
          <button
            className="white"
            type="submit"
            onClick={() => {
              this.create();
            }}
          >
            <b>Add</b>
          </button>
        </form>
        {this.state.list ? (
          <div>
            {this.state.list.map((item) => (
              <div className="list" key={item.id}>
                <p className="d-flex">
                    {console.log(item.list)}
                  {item.name} <br />
                  <span>
                    <button
                      className="del-btn white"
                      onClick={() => this.delete(item.id)}
                    >
                      <b>X</b>
                    </button>
                  </span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p>Please wait...</p>
          </div>
        )}
      </div>
    );
  }
}
