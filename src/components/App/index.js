import React, { Component } from 'react';
import ListImgs from 'components/ListImgs';
import ReactFileReader from 'react-file-reader';
import styled from 'styled-components';
import './App.css';

class App extends Component {
  state = {
    imgs: [],
    open: false,
    inputValue: '',
  };

  handleClickFoto = (file) => {
    var reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file[0]);

      reader.onloadend = () => {
        this.setState({ imgs: [...this.state.imgs, reader.result] });
      };
    }
  };

  handleClickVideo = () => {
    this.setState({ open: true });
  };

  handleInput = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  showVideo = (event) => {
    if (this.state.inputValue) {
      if (event.keyCode === 13) {
        let id = this.state.inputValue.split('?v=')[1];
        let imgSrc = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
        this.setState({ imgs: [...this.state.imgs, imgSrc] });
      }
    }
  };

  render () {
    const { imgs, open } = this.state;
    return (
      <div className="app">
        <WrapperButtons>
          <ReactFileReader handleFiles={this.handleClickFoto}>
            <button className="btn">добавить фото</button>
          </ReactFileReader>
          <WrapperVideo>
            <button className="btn" onClick={this.handleClickVideo}>
              добавить видео
            </button>
            {open ? (
              <input className="input" onKeyUp={this.showVideo} onChange={this.handleInput} />
            ) : (
              ''
            )}
            {this.state.url ? <img src={this.state.url} /> : ''}
          </WrapperVideo>
        </WrapperButtons>

        {imgs.length ? <ListImgs imgs={imgs} /> : ''}
      </div>
    );
  }
}

// ReactFileReader = styled.div`display: inline-block;`;

const WrapperVideo = styled.div`position: relative;`;
const WrapperButtons = styled.div`
  display: flex;
  justify-content: center;
`;

export default App;
