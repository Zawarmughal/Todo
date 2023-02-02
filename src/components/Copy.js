import React, { Component } from "react";
import Model from "./Model";

export default class Copy extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      user: null,
      show: false,
    };
  }
  componentDidMount() {
    this.getData();
  }

  getData() {
    fetch("http://localhost:3000/user").then((response) => {
      response.json().then((result) => {
        this.setState({ user: result });
        console.log(result);
      });
    });
  }

  create = (e) => {
    e.preventDefault();
    const obj = {
      id: Math.random(),
      value: this.state.input,
    };
    this.setState({ user: [obj] });
    fetch("http://localhost:3000/user", {
      method: "Post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(obj),
    }).then((result) => {
      result.json().then((resp) => {

        this.getData();
      });
    });
    this.setState({input: ""});
  };

  delete(id) {
    fetch("http://localhost:3000/user/" + id, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        this.getData();
      });
    });
  }

  update=(object)=> {
    let obj = {
      value: object.editData,
    };
    fetch("http://localhost:3000/user/" + object.id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(obj),
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
        <form id="to-do-form" className="text-center" onSubmit={this.create}>
          <input
            type="text"
            placeholder="Enter Text"
            value={this.state.input}
            onChange={(e) => {
              this.setState({ input: e.target.value });
            }}
          />
          <button className="white" type="submit">
            <b>Add</b>
          </button>
        </form>
        {this.state.user ? (
          <div>
            {this.state.user.map((item) => (
              <div className="list" key={item.id}>
                <p className="d-flex">
                  {item.value} <br />
                  <span>
                    <Model
                      key={item.id}
                      value={this.state.input}
                      id={item.id}
                      updateitem={this.update}
                    />
                  </span>
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
