import { plot} from 'nodeplotlib'


let randX1 = []
let randY1 = []
let randX2 = []
let randY2 = []
let ptX= 0 , ptY = 0
let nPoints = 20

const TWO_PI = 2 * Math.PI
const dx1 = -5
const dy1 = 4

const dx2 = 5
const dy2 = 4

/* 
for(let i=0; i < nPoints; i++){
  ptX = Math.sin((TWO_PI * i / (nPoints - 1))) 
  ptY = Math.cos((TWO_PI * i / (nPoints - 1)))
  randX1.push(ptX + dx1)
  randY1.push(ptY + dy1)
  randX2.push(ptX + dx2)
  randY2.push(ptY + dy2)
} */

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

const xAnchors = [x1, x2, x3]
const yAnchors = [y1, y2, y3]
const xPoints = []
const yPoints = []

for(let i = 0; i < R1.length; i++){
  let {x, y} = trilateration(x1, y1, R1[i], x2, y2, R2[i], x3, y3, R3[i])
  xPoints.push(x)
  yPoints.push(y)
}


const data = [
  {
    x:xAnchors,
    y:yAnchors,
    type: 'scatter'
  },
  {
    x:xPoints,
    y:yPoints,
    type: 'scatter'
  },
]

plot(data)