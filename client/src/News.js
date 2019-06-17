import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class News extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      mainTitle: null,
      title: null,
      news: [],
      publishedAt: null,
      mainDescription: null,
      description: null,
      show: false,
      index: 0,
    }
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.setIndex = this.setIndex.bind(this);
    this.refreshTimer = null;
    this.runtimeTimer = null;
  }

  componentDidMount() {
    this.getNews();
    let refresh = 1000 * 60 * 10;
    this.runtimeTimer = setInterval(() => {
      this.getNews();
    }, refresh);
  }

  getNews() {
    fetch('/api/getNews')
      .then(res => res.json())
      .then(json => 
        {
          let day = json.articles[0].publishedAt.substring(0, 10);
          let date = json.articles[0].publishedAt.substring(11, 19);
          this.setState({
            mainTitle: json.articles[0].title,
            title: json.articles[0].title,
            mainDescription: json.articles[0].description,
            description: json.articles[0].description,
            publishedAt: date + ' ' + day,
          })
          for( let i=0; i<10 ; i++){
            let article = [];
            article['title'] = json.articles[i].title;
            article['description'] = json.articles[i].description
            this.setState({
              news: [...this.state.news, article],
            })
          }

      });
  }

  componentWillUnmount() {
    clearInterval(this.refreshTimer);
    clearInterval(this.runtimeTimer);
    this.refreshTimer = null;
    this.runtimeTimer = null;
  }

  handleClose() {
    this.setState({         
      index: 0 ,
      show: false 
    });
  }

  handleShow() {
    this.setState({ show: true });
  }

  setIndex() {
    if (this.state.index === 9) {
      this.setState({
        index: 0 ,
        title: this.state.news[this.state.index].title,
        description: this.state.news[this.state.index].description
        });
    }
    else {
      this.setState({
      index: this.state.index + 1,
      title: this.state.news[this.state.index].title,
      description: this.state.news[this.state.index].description
      });
    }
  }

  render() {
    return (
      <div>
        <div style={styles.textStyle}>
          <div style={styles.titleStyle} onClick={this.handleShow}>
            {this.state.mainTitle + "\n"}
          </div >
          {this.state.mainDescription}

        </div>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={styles.textStyle}>{this.state.publishedAt}</Modal.Title>
          </Modal.Header>
          <Modal.Body  style={styles.textStyle}>{this.state.title + "\n"}</Modal.Body>
          <Modal.Body  style={styles.textStyle}>{this.state.description}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.setIndex}>
              Next
            </Button>
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

  titleStyle: {
    color: 'red',
  },
  textStyle: {
    textAlign: 'end'
  },
};

export default News;