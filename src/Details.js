//this could be written as a function component, here it's written as a class component only to show how it was done in the past - but for other reasons can still be useful nowadays
import { Component } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react/cjs/react.production.min";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";

//component classes have inheent state properties, that are managed via useState through lifecycle functions as componentDidMount, as we cannot use hooks directly within them
class Details extends Component {
  // constructor(props) {
  //   super(props); //passes props to Component class
  //   this.state = { loading: true };
  // }
  // replace constructor above with new js feature: class properties
  state = { loading: true };

  //works like useEffect(() => {}, [])
  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
    );
    const json = await res.json();
    //this.setState(Object.assign({ loading: false }, json.pets[0]));
    //do the same as line above
    this.setState({ loading: false, ...json.pets[0] });
  }

  render() {
    if (this.state.loading) {
      return <h2>loading … </h2>;
    }

    // throw new Error("the app fucked up");

    const { animal, breed, city, state, description, name, images } =
      this.state;

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button style={{ backgroundColor: theme }}>Adopt {name}</button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

const WrappedDetails = () => {
  const params = useParams();
  /*another way to implement usecontext instead of using its consumer type component would be:
  const [theme] = useContext(ThemeContext); then below..
  <Details theme={theme} params={params} />
  then it's just this.props.theme*/
  return (
    <ErrorBoundary>
      <Details params={params} />
    </ErrorBoundary>
  );
};

export default WrappedDetails;
