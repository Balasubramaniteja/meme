import React, { Component } from "react";

class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      firstText: "",
      secandText: "",
      imgArr: [],
      randomPic:
        "https://randomwordgenerator.com/img/picture-generator/54e9d5414c5aaa14f1dc8460962e33791c3ad6e04e507440742a7ed0954ac1_640.jpg",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        this.setState({ imgArr: memes });
      });
  }

  handleChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const chooseimg = Math.floor(Math.random() * this.state.imgArr.length);
    const imgMatch = this.state.imgArr[chooseimg].url;
    this.setState({
      randomPic: imgMatch,
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="firstText"
            value={this.state.firstText}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="secandText"
            value={this.state.secandText}
            onChange={this.handleChange}
          />
          <button>Clcik to Generate</button>
        </form>
        <div className="imagememe">
          <img className="image" src={this.state.randomPic} alt="" />
          <h2 className="top">{this.state.firstText}</h2>
          <h2 className="bottom">{this.state.secandText}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
