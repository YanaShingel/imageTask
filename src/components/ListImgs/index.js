import React, { Component } from 'react';
import styled from 'styled-components';
import ImageComponent from '../ImageComponent';
import './ListImgs.css';

class ListImgs extends Component {
  state = {
    imgs: [],
  };

  render () {
    let id = 1;
    const { imgs } = this.props;
    let top = 100;
    return imgs.length ? (
      <div className="img-list">
        <div className="image">
          {imgs.map((el, i) => (
            <ImageComponent top={id === 1 ? 100 : id * 250 - 150} key={id++} src={el} />
          ))}
        </div>
      </div>
    ) : (
      ''
    );
  }
}

export default ListImgs;
