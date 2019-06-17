import React, { Component } from 'react';
import { Modal, Button, Image } from 'react-bootstrap';

import Clear from './Images/Clear.PNG';
import Clouds from './Images/Clouds.PNG';
import Rain from './Images/Rain.PNG';
import Snow from './Images/Snow.PNG';



class Weather extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      temp: null,
      tempArray: [],
      show: false,
    }

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.refreshTimer = null;
    this.runtimeTimer = null;
  }
  componentDidMount() {
    this.getWeather();
    let refresh = 1000 * 60 * 60 * 4;
    this.runtimeTimer = setInterval(() => {
      this.getWeather();
    }, refresh);
  }

  getWeather() {
    fetch('/api/getWeather')
      .then(res => res.json())
      .then(json => {
        this.setState({
          temp: json.main.temp,
          image: json.weather[0].main,
          humidity: json.main.humidity,
          description: json.weather[0].description
        })
      });

    fetch('/api/getAllWeather')
      .then(res => res.json())
      .then(json => {
        this.setState({
          tempArray: json.list
        })
      });
  }

  componentWillUnmount() {
    clearInterval(this.refreshTimer);
    clearInterval(this.runtimeTimer);
    this.refreshTimer = null;
    this.runtimeTimer = null;
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <div>
        <div onClick={this.handleShow}>
          <div>
            weather in Beer-Sheva is: {this.state.temp}
          </div>
          <span>
            {(this.state.image !== 'Clear') ? null : <Image src={Clear} />}
            {(this.state.image !== 'Clouds') ? null : <Image src={Clouds} />}
            {(this.state.image !== 'Rain') ? null : <Image src={Rain} />}
            {(this.state.image !== 'Snow') ? null : <Image src={Snow} />}
          </span>
          {/* <span>
            Description: {this.state.description + '\n'}
          </span> */}
          <span style={ styles.humidityStyle }>
            Humidity: {this.state.humidity}
          </span>
        </div>


        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>The Weather For The Next 5 Days</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <ul>
                {
                  this.state.tempArray.map(function (item, i) {
                    if (i % 8 !== 0)
                      return null;
                    return (
                    <li key={i}>
                      <div>
                        {item.dt_txt.slice(0, 10)}:
                      </div> 
                      Temperature: {item.main.temp}, 
                      Description: {item.weather[0].description}
                    </li>);//add date for each weather
                  })
                }
              </ul>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const styles = {
  humidityStyle: {
    paddingLeft: '70px',
  }
};

export default Weather;
