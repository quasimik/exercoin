import React from 'react'
import Anime from 'react-anime'

export default class Background extends React.Component {
  constructor(props) {
    super(props)
    // var canvasEl = document.querySelector('.fireworks');
    // this.ctx = canvas.getContext('2d');
    this.numberOfParticules = 30;
    // this.tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';
    this.colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];
    this.state = { pointerX: 0, pointerY: 0 }
  }
  // function setCanvasSize() {
  //   canvasEl.width = window.innerWidth * 2;
  //   canvasEl.height = window.innerHeight * 2;
  //   canvasEl.style.width = window.innerWidth + 'px';
  //   canvasEl.style.height = window.innerHeight + 'px';
  //   canvasEl.getContext('2d').scale(2, 2);
  // }

  // updateCoords(e) {
  //   this.pointerX = e.clientX || e.touches[0].clientX;
  //   this.pointerY = e.clientY || e.touches[0].clientY;
  // }

  // setParticuleDirection(p) {
  //   var angle = Anime.random(0, 360) * Math.PI / 180;
  //   var value = Anime.random(50, 180);
  //   var radius = [-1, 1][Anime.random(0, 1)] * value;
  //   return {
  //     x: p.x + radius * Math.cos(angle),
  //     y: p.y + radius * Math.sin(angle)
  //   }
  // }

  // createParticule(x,y) {
  //   var p = {};
  //   p.x = x;
  //   p.y = y;
  //   p.color = this.colors[Anime.random(0, this.colors.length - 1)];
  //   p.radius = Anime.random(16, 32);
  //   p.endPos = this.setParticuleDirection(p);
  //   p.draw = function() {
  //     this.ctx.beginPath();
  //     this.ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
  //     this.ctx.fillStyle = p.color;
  //     this.ctx.fill();
  //   }
  //   return p;
  // }

  // createCircle(x,y) {
  //   var p = {};
  //   p.x = x;
  //   p.y = y;
  //   p.color = '#FFF';
  //   p.radius = 0.1;
  //   p.alpha = .5;
  //   p.lineWidth = 6;
  //   p.draw = function() {
  //     this.ctx.globalAlpha = p.alpha;
  //     this.ctx.beginPath();
  //     this.ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
  //     this.ctx.lineWidth = p.lineWidth;
  //     this.ctx.strokeStyle = p.color;
  //     this.ctx.stroke();
  //     this.ctx.globalAlpha = 1;
  //   }
  //   return p;
  // }

  // renderParticule(anim) {
  //   for (var i = 0; i < anim.animatables.length; i++) {
  //     anim.animatables[i].target.draw();
  //   }
  // }

  // animateParticules(x, y) {
  //   var circle = this.createCircle(x, y);
  //   var particules = [];
  //   for (var i = 0; i < this.numberOfParticules; i++) {
  //     particules.push(this.createParticule(x, y));
  //   }
  //   Anime.timeline().add({
  //     targets: particules,
  //     x: function(p) { return p.endPos.x; },
  //     y: function(p) { return p.endPos.y; },
  //     radius: 0.1,
  //     duration: Anime.random(1200, 1800),
  //     easing: 'easeOutExpo',
  //     update: this.renderParticule
  //   })
  //     .add({
  //     targets: circle,
  //     radius: Anime.random(80, 160),
  //     lineWidth: 0,
  //     alpha: {
  //       value: 0,
  //       easing: 'linear',
  //       duration: Anime.random(600, 800),  
  //     },
  //     duration: Anime.random(1200, 1800),
  //     easing: 'easeOutExpo',
  //     update: this.renderParticule,
  //     offset: 0
  //   });
  // }

  // render = Anime({
  //   duration: Infinity,
  //   update: function() {
  //     this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
  //   }
  // });
  render() {
    return (<Anime easing="easeOutElastic"
           opacity={this.state.pointerX > 50 ? [0, 1] : [1: 0]}>
      </Anime>)
  }
}
