import React, { Component } from 'react';

import { Table } from 'react-bootstrap';
import Weather from './Weather';
import News from './News';
import Finance from './Finance';
import Subscribe from './Subscribe';
import Sports from './Sports';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      financeArray: null,
        // isLoaded: false,
        fullData: null

    }
}

componentDidMount() {
  this.createFakeData();
  let refresh = 1000*60*5;
    this.runtimeTimer = setInterval(() => {
      this.createFakeData();
  }, refresh);

  
}

componentWillUnmount() {
  clearInterval(this.refreshTimer);
  clearInterval(this.runtimeTimer);
  this.refreshTimer = null;
  this.runtimeTimer = null;
}



createFakeData(){
  // This function creates data that doesn't look entirely random
  const data = []
  for (let x = 0; x <= 30; x++) {
    const random = Math.random();
    const temp = data.length > 0 ? data[data.length-1].y : 50;
    const y = random >= .45 ? temp + Math.floor(random * 20) : temp - Math.floor(random * 20);
    data.push({x,y})
  }

  this.setState({
    fullData: data
    })}


  render() {
    return (
      <div style = {styles.centerStyle}>
        <Table style = { styles.tableStyle } bordered  >
          <thead>
            <tr>
              <th style={ styles.newsStyle }>
                <div >
                  News update
                </div>
                <News/>
              </th>

              <th colSpan={2} style={ styles.topStyle }>
              <div>
                Weather
              </div>
                <Weather/>
              </th> 

            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={ styles.financeStyle }>
              <div >
                  Finance
              </div>
              {!this.state.fullData ? null : <Finance data={this.state.fullData} color={'#F44336'}  />}
              </td>
              <td style={ styles.buttomStyle }>
              <div >
              Sports
                </div>
                {/* <Sports/> */}
              </td>
              <td style={ styles.buttomStyle }>
              <div >
                Subscribe for updates
                <Subscribe/>
              </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

const styles = {
  centerStyle: {
    paddingLeft: '250px',
    paddingTop: '100px'
  },
  tableStyle: {
    border: '1px solid black',
    width: '80%'
  },
  topStyle: {
    width: '50%',
    justifyContent: 'left',
    textAlignVertical: 'top'
  },
  newsStyle: {
    paddingBottom: '96px',
    width: '50%',
    // justifyContent: 'left',
    // textAlignVertical: 'top'
  },
  financeStyle: {
    width: '40%',
    justifyContent: 'left',
    textAlignVertical: 'top'
  },
  buttomStyle: {
    width: '25%',
    justifyContent: 'left',
    textAlignVertical: 'top'
  }
};


export default App;