import React from 'react';
import './random-planet.css';
import SwapiService from "../../services/swapi-services";
import Spinner from "../spinner/spinner";
import ErrorIndicator from "../error-indicator/error-indicator";
class RandomPlanet extends React.Component{
    swapiService = new SwapiService();
    state = {
        planet: {},
        loading: true,
        error: false
    };

    componentDidMount() {
        this.updatePlanet();
        this.intervala = setInterval(this.updatePlanet, 5000);
        clearInterval(this.intervala);
    }


    onPlanetLoaded = (planet)=>{
          this.setState({
              planet,
              loading: false
          });
    };

    onError = (err)=>{
        this.setState({
            error: true,
            loading: false
        });
    };

    updatePlanet(){
        const id = Math.floor(Math.random() * 17) + 2;
        this.swapiService
            .getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError);

    }

    render(){
        const errorMessage = this.state.error ? <ErrorIndicator/> : null;
        const spinner = this.state.loading ? <Spinner/> : null;
        const content = !(this.state.loading || this.state.error) ? <PlanetView planet={this.state.planet}/> : null;
        return (
            <div className="random-planet jumbotron rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

const PlanetView = (props)=>{
    return(
      <React.Fragment>
          <img className="planet-image"
               src={`https://starwars-visualguide.com/assets/img/planets/${props.planet.id}.jpg`} />
          <div>
              <h4>{props.planet.name}</h4>
              <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                      <span className="term">Population: </span>
                      <span>{props.planet.population}</span>
                  </li>
                  <li className="list-group-item">
                      <span className="term">Rotation Period: </span>
                      <span>{props.planet.rotationPeriod}</span>
                  </li>
                  <li className="list-group-item">
                      <span className="term">Diameter: </span>
                      <span>{props.planet.diameter}</span>
                  </li>
              </ul>
          </div>
      </React.Fragment>
    );
};

export default RandomPlanet;