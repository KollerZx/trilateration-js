import Plotly from 'plotly.js-dist-min'

function trilateration(x1,y1,r1,x2,y2,r2,x3,y3,r3){
  let A, B, C, D, E, F, x, y

  A = 2*x2 - 2*x1
  B = 2*y2 - 2*y1
  C = r1**2 - r2**2 - x1**2 + x2**2 - y1**2 + y2**2
  D = 2*x3 - 2*x2
  E = 2*y3 - 2*y2
  F = r2**2 - r3**2 - x2**2 + x3**2 - y2**2 + y3**2
  x = (C*E - F*B) / (E*A - B*D)
  y = (C*D - A*F) / (B*D - A*E)
  return {x,y}
}

function randomPoints(){
  let x1 = Math.floor( Math.random() * (-80 - -150) + -150)
  let y1 = Math.floor( Math.random() * (150 - -150) + -150)
  let x2 = Math.floor( Math.random() * (150 - 80) + 80)
  let y2 = Math.floor( Math.random() * (150 - 20) + 20)
  let x3 = Math.floor( Math.random() * (150 - 80) + 80)
  let y3 = Math.floor( Math.random() * (-20 - -150) + -150)

  let dX = Math.floor( Math.random() * (60 - -60) + -60)
  let dY = Math.floor( Math.random() * (60 - -60) + -60)
  
  let r1 = ((dX-x1)**2 + (dY-y1)**2)**0.5
  let r2 = ((dX-x2)**2 + (dY-y2)**2)**0.5
  let r3 = ((dX-x3)**2 + (dY-y3)**2)**0.5
  
  return {x1, y1, r1, x2, y2, r2, x3, y3, r3, dX, dY}
}

//Distance
const x1 = 2
const y1 = 9
const x2 = 12.2
const y2 = 10.5
const x3 = 12.2
const y3 = 4

const R1 = [
  6.966,
  6.966,
  6.965,
  6.964,
  6.963,
  6.962,
  6.961,
  6.960,
  6.960,
  6.960,
  6.960,
  6.960,
  6.960,
  6.960,
  6.961,
  6.962,
  6.963,
  6.964,
  6.964,
  6.964,
  6.964,
]

const R2 = [
  4.196,
  4.196,
  4.198,
  4.200,
  4.204,
  4.208,
  4.204,
  4.200,
  4.196,
  4.192,
  4.194,
  4.196,
  4.194,
  4.192,
  4.188,
  4.184,
  4.184,
  4.184,
  4.184,
  4.184,
  4.186,
]

const R3 = [
  3.060,
  3.060,
  3.058,
  3.062,
  3.066,
  3.066,
  3.066,
  3.060,
  3.054,
  3.054,
  3.054,
  3.062,
  3.070,
  3.072,
  3.074,
  3.070,
  3.066,
  3.068,
  3.070,
  3.082,
  3.094,
]

const xAnchors = [x1, x2, x3]
const yAnchors = [y1, y2, y3]
const xPoints = []
const yPoints = []

for(let i = 0; i < R1.length; i++){
  let {x, y} = trilateration(x1, y1, R1[i], x2, y2, R2[i], x3, y3, R3[i])
  xPoints.push(x)
  yPoints.push(y)
}

console.log(xPoints);

function plot(){
  const anchor = {
    x:xAnchors,
    y:yAnchors,
    mode: 'markers',
    type: 'scatter',
    name: 'Anchor 1',
    text: ['A-1', 'A-2', 'A-3'],
    marker: { 
      size: 12,
      color: 'blue',
      sizemode: 'diameter'
      
    } 
  }

  const pointTrilat = {
    x: xPoints,
    y: yPoints,
    mode: 'markers',
    type: 'scatter',
    name: 'Location Object',
    marker: { 
      size: 5,
      color: 'black' 
    }
  }
  

  var data = [ anchor, pointTrilat];
  
  var layout = {
    xaxis: {
      range: [ -10,10 ]
    },
    yaxis: {
      range: [-10, 10]
    },
    title:'Trilateration'
  };
  
  Plotly.newPlot('plot', data, layout);
}



plot()



