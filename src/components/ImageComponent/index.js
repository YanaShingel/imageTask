import React, { Component } from 'react';
import styled from 'styled-components';
import './ImageComponent.css';

class ImageComponent extends Component {
  element = React.createRef();

  constructor () {
    super();
    this.resize = this.resize.bind(this);
    this.stopResize = this.stopResize.bind(this);
    this.move = this.move.bind(this);
    this.stop = this.stop.bind(this);
    this.drag = this.drag.bind(this);
    this.state = {
      src: '',
      width: '200px',
      height: '200px',
      left: '',
      top: '300px',
      initX: 0,
      initY: 0,
      topPos: 0,
    };
  }

  initResize = (e) => {
    window.addEventListener('mousemove', this.resize, false);
    window.addEventListener('mouseup', this.stopResize, false);
  };

  resize = (e) => {
    if (e.target.classList.contains('resize')) {
      e.stopPropagation();
    }
    let side = '',
      width,
      height,
      top,
      left;
    if (
      e.clientX > this.element.current.offsetLeft + 10 &&
      e.clientY > this.element.current.offsetTop + 10
    ) {
      side = 'rightBottom';
    } else if (
      e.clientX > this.element.current.offsetLeft + 10 &&
      e.clientY < this.element.current.offsetTop + 10
    ) {
      side = 'rightTop';
    } else if (
      e.clientX < this.element.current.offsetLeft + 10 &&
      e.clientY < this.element.current.offsetTop + 10
    ) {
      side = 'leftTop';
    } else if (
      e.clientX < this.element.current.offsetLeft + 10 &&
      e.clientY > this.element.current.offsetTop + 10
    ) {
      side = 'leftBottom';
    }
    side = 'rightBottom';
    if (this.element.current) {
      switch (side) {
        case 'rightBottom':
          width = e.clientX - this.element.current.offsetLeft + 'px';
          height = e.clientY - this.element.current.offsetTop + 'px';
          break;
        case 'rightTop':
          // debugger;
          top = e.clientY;
          width = e.clientX - this.element.current.offsetLeft + 'px';
          height =
            this.state.height.split('px')[0] + this.element.current.offsetTop - e.clientY + 'px';
          left = this.state.left;
          break;
        case 'leftBottom':
          // debugger;
          // left = e.clientX;
          // let qwe = +this.state.width.split('px')[0];
          // width =
          //   +this.state.width.split('px')[0] + this.element.current.offsetLeft - e.clientY + 'px';
          // height = e.clientY - this.element.current.offsetTop + 'px';
          break;
        default:
          break;
      }
      this.setState({ width, height, top, left });
    }
  };

  stopResize = (e) => {
    window.removeEventListener('mousemove', this.resize, false);
    window.removeEventListener('mouseup', this.stopResize, false);
  };

  drag = (e) => {
    if (e.target.classList.contains('resize')) {
      e.stopPropagation();
    }
    let initX, initY;
    initX = e.clientX;
    initY = e.clientY;
    this.setState({ initX, initY });
    window.addEventListener('mousemove', this.move);
    window.addEventListener('mouseup', this.stop);
  };

  move = (e) => {
    let newX, newY;
    if (this.state.left) {
      newX = +this.state.left.split('px')[0] + (e.clientX - this.state.initX) + 'px';
      newY = +this.state.top.split('px')[0] + (e.clientY - this.state.initY) + 'px';
      this.setState({ left: newX, topPos: newY });
    }
  };

  stop = (e) => {
    window.removeEventListener('mousemove', this.move);
    window.removeEventListener('mouseup', this.stop);
  };

  render () {
    let { src, top } = this.props;
    let { width, height, topPos, left } = this.state;
    let id = 1;
    top = topPos ? topPos : top;
    return (
      <div
        style={{ width, height, top, left }}
        ref={this.element}
        className="grey-block"
        onMouseDown={this.drag}
      >
        {[1, 2, 3, 4].map((el, i) => (
          <ResizeElement
            key={id++}
            className={`resize resize-${i}`}
            onMouseDown={this.initResize}
          />
        ))}

        <Img src={src} className="drag-resize" />
      </div>
    );
  }
}

const Img = styled.img`
  object-fit: cover;
  width: inherit;
  height: inherit;
  position: relative;
  padding: 10px;
`;

const GreyBlock = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  background: grey;
  margin: 5px 0;
  left: 620px;
`;

const ResizeElement = styled.div`
  width: 10px;
  height: 10px;
  background: black;
  position: absolute;
  z-index: 2;
`;

export default ImageComponent;
