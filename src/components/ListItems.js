import React, { Component } from "react";

export default class ListItems extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    const listItems = this.props.items.map((item) => {
      return (
        // <div className="list" key={item.key}>
        //   <p>{item.text}
        //   <span>
        //     <button onClick={() => this.props.deleteItem(item.key)}>X</button>
        //     </span>
        //     </p>
        // </div>

        <div className="list" key={item.key}>
          <p>
            {/* <form> */}

            <input
              type="text"
              id={item.key}
              value={item.text}
              onChange={(e) => {
                this.props.setUpdate(e.target.value, item.key);
              }}
            />
            {/* </form> */}

            <span>
              <button className="del-btn white" onClick={() => this.props.deleteItem(item.key)}><b>X</b></button>
            </span>
          </p>
        </div>
      );
    });
    return <div>{listItems} </div>;
  }
}
