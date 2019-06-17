import React, { Component } from 'react';

// import './PortalStyle.css';

class Sports extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      scores: null,
      games: [],
      show: false,
    }
    this.refreshTimer = null;
    this.runtimeTimer = null;
  }

  componentDidMount() {
    this.getScores();
    let refresh = 6000;
    this.runtimeTimer = setInterval(() => {
      this.getScores();
    }, refresh);
  }

  componentWillUnmount() {
    clearInterval(this.refreshTimer);
    clearInterval(this.runtimeTimer);
    this.refreshTimer = null;
    this.runtimeTimer = null;
  }

  getScores() {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');
    fetch('https://cors-anywhere.herokuapp.com/http://livescore-api.com/api-client/scores/live.json?key=0PYOGKM3vLhbtMiN&secret=pGUCbW5JtzZmsLCtAAhgl3kRPB2jnk6N')
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({
          scores: json.data.match,
          games: json.data.match.length
        })
      });

  }

  randomGame() {
    let rand = null;
    let liveGame = 0;
    for (let i = 0; i < this.state.games; i++) {
      if (this.state.scores[i].status !== "FINISHED" && this.state.scores[i].status !== "NOT STARTED")
        liveGame++;
    }


    if (liveGame > 0) {
      do {
        rand = Math.floor(Math.random() * (this.state.games - 1));
      } while (this.state.scores[rand].status === "FINISHED" || this.state.scores[rand].status === "NOT STARTED")
      return (
        <div>
          <div style={ styles.resultStyle }>
            {this.state.scores[rand].time}
          </div>
          <div>
            {this.state.scores[rand].home_name}
          </div>
          <div style={ styles.resultStyle }>
            {this.state.scores[rand].score}
          </div>
          <div style={ styles.awayTeamStyle }>
            {this.state.scores[rand].away_name}
          </div>
        </div>
      );
    }
    else {
      return (
        <div>
          no live games
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.randomGame()}
      </div>
    );
  }
}

const styles = {
  resultStyle: {
    'font-size': '25px',
    'text-align': 'center'
  },
  awayTeamStyle: {
    'text-align': 'right'
  }
};

export default Sports;
