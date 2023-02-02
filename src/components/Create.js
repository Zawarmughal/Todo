import React, { Component } from "react";

export default class Create extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
    };
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users").then((response) => {
      response.json().then((result) => {
        this.setState({ list: result });
      });
    });
  }
  create() {
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "Post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(this.state),
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp);
      });
    });
  }
  render() {
    console.log(this.state.name);
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
            // value={this.state.currentItem.text}
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
              //   <div key={item.id}>
              //     <ul>
              //       <li>{item.name}</li>
              //     </ul>
              //   </div>

              //     <form id="to-do-form" className="text-center" onSubmit={this.addItem}>
              //   <input
              //     type="text"
              //     placeholder="Enter Text"
              //     value={this.state.currentItem.text}
              //     onChange={this.handleInput}
              //   />
              //     <button className="white" type="submit"><b>Add</b></button>
              //   </form>

              <div className="list" key={item.id}>
                <p>
                  {item.name} <br />
                  {/* {item.email} */}
                  {/* <span>
            <button onClick={() => this.props.deleteItem(item.key)}>X</button>
           
            </span> */}
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
