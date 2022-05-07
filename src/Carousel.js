/*again, this could be writte entirely in a function component, but using the class component method here to show a bit more about managing state inside a class component*/
import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  //in case there's no image to show, do this
  //all carousel instances will share this same object, hence 'static '
  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  //note that this is also a class property
  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;
    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            /*this is so eslint wont complain about us adding an onclick function to an image, of course we should be using a button for accsslity */
            // eslint-disable-next-line
            <img
              onClick={this.handleIndexClick}
              data-index={index}
              key={photo}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
