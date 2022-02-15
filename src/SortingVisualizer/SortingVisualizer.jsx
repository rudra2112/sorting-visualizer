import React from "react";
import "./SortingVisualizer.css";
import { getMergeSortAnimations } from "../SortingAlgorithms/mergeSort";
import { getQuickSortAnimations } from "../SortingAlgorithms/quickSort";
import { getBubbleSortAnimations } from "../SortingAlgorithms/bubbleSort";
import { getHeapSortAnimations } from "../SortingAlgorithms/heapSort";

const PRIMARY_COLOR = "darkblue";

const SECONDARY_COLOR = "red";

const TERTIARY_COLOR = "darkgreen"

const HIGHLIGHTER1 = "limegreen";

const HIGHLIGHTER2 = "yellow";

var ANIMATION_SPEED_MS = 1;

var NUMBER_OF_ARRAY_BARS = 100;

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(20, 550));
    }
    for (let i = 0; i < this.state.array.length; i++) {
      document.getElementsByClassName("array-bar")[i].style.backgroundColor = PRIMARY_COLOR;
    }
    this.setState({ array });
  }

  changingNumberOfBars() {
    var slider = document.getElementById("No-Of-Bars");
    NUMBER_OF_ARRAY_BARS = slider.value;

    this.resetArray();
  }

  changingSpeed(){
    var slider = document.getElementById("Speed");
    ANIMATION_SPEED_MS = 101 - slider.value;
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    let k;

    for (let i = 0; i < animations.length; i++) {
      if (i % 4 === 3) {
        setTimeout(() => {
          const barOneIdx = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.backgroundColor = PRIMARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      } 
      
      else {
        const isColorChange = i % 4 !== 2;
        if (isColorChange) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
        } 
        
        else {
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.backgroundColor = HIGHLIGHTER2;
            barOneStyle.height = `${newHeight}px`;
          }, i * ANIMATION_SPEED_MS);
        }
      }

      k = i;
    }

    this.SortingComplete(k);
  }

  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    let k;

    for (let i = 0; i < animations.length; i++) {
      if (animations[i][0] === "pivot") {
        setTimeout(() => {
          const pivotBar = arrayBars[animations[i][1]];
          pivotBar.style.backgroundColor = HIGHLIGHTER1;
        }, i * ANIMATION_SPEED_MS);
      }

      else if (animations[i][0] === "pointer") {
        setTimeout(() => {
          const pointerIndex = arrayBars[animations[i][1]];
          const pointerIndexStyle = pointerIndex.style;
          pointerIndexStyle.backgroundColor = HIGHLIGHTER2;
        }, i * ANIMATION_SPEED_MS);
      } 
      
      else {
        const pointerIndex = arrayBars[animations[i][1]];
        const barIndex = arrayBars[animations[i][2]];
        const pointerIndexStyle = pointerIndex.style;
        const barStyle = barIndex.style;

        if (animations[i][0] === "colorChange") {
          setTimeout(() => {
            pointerIndexStyle.backgroundColor = SECONDARY_COLOR;
            barStyle.backgroundColor = SECONDARY_COLOR;
          }, i * ANIMATION_SPEED_MS);
        } 
        
        else if (animations[i][0] === "swap") {
          setTimeout(() => {
            const pointerHeight = animations[i][3];
            const barHeight = animations[i][4];

            pointerIndexStyle.height = `${barHeight}px`;
            barStyle.height = `${pointerHeight}px`;
          }, i * ANIMATION_SPEED_MS);
        } 
        
        else {
          setTimeout(() => {
            pointerIndexStyle.backgroundColor = PRIMARY_COLOR;
            barStyle.backgroundColor = PRIMARY_COLOR;
          }, i * ANIMATION_SPEED_MS);
        }
      }

      k = i;
    }

    this.SortingComplete(k);
  }

  heapSort() {
    const animations = getHeapSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    const n = this.state.array.length;
    let k;

    for (let i = 0; i < animations.length; i++) {
      const [command, barOneIdx, barTwoIdx] = animations[i];
      let barOneStyle;
      if(barOneIdx<n){
        barOneStyle = arrayBars[barOneIdx].style;
      }

      let barTwoStyle;
      if(barTwoIdx<n){
        barTwoStyle = arrayBars[barTwoIdx].style
      }
  
      if(command === "compare"){
        setTimeout(() => {
          const parent = animations[i][3];
          const parentStyle = arrayBars[parent].style;
          parentStyle.backgroundColor = HIGHLIGHTER1;

          if(barOneIdx<n){
            barOneStyle.backgroundColor = SECONDARY_COLOR;
          }
          
          if(barTwoIdx<n){
            barTwoStyle.backgroundColor = SECONDARY_COLOR;
          }
        }, i*ANIMATION_SPEED_MS);
      }
  
      else if (command === "changeBack") {
        setTimeout(() => {
          const parent = animations[i][3];
          const parentStyle = arrayBars[parent].style;
          parentStyle.backgroundColor = PRIMARY_COLOR;
          
          if(barOneIdx<n){
            barOneStyle.backgroundColor = PRIMARY_COLOR;
          }
          
          if(barTwoIdx<n){
            barTwoStyle.backgroundColor = PRIMARY_COLOR;
          }
        }, i * ANIMATION_SPEED_MS);
      } 
  
      else if(command === "swap"){
        setTimeout(() => {
          const barOneHeight = animations[i][3];
          const barTwoHeight = animations[i][4];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barOneStyle.height = `${barTwoHeight}px`;
          barTwoStyle.height = `${barOneHeight}px`;
        }, i*ANIMATION_SPEED_MS);
      }
  
      else{
        const color = command === "revertColor" ? PRIMARY_COLOR : HIGHLIGHTER2;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      }
  
      k = i;
    }
  
    this.SortingComplete(k);
    
  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    let k;

    for (let i = 0; i < animations.length; i++) {
      const [command, barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;

      if (command === "revertColor") {
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      } 

      else if(command === "swap"){
        setTimeout(() => {
          const barOneHeight = animations[i][3];
          const barTwoHeight = animations[i][4];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barOneStyle.height = `${barTwoHeight}px`;
          barTwoStyle.height = `${barOneHeight}px`;
        }, i*ANIMATION_SPEED_MS);
      }
        
      else{
        const color = command === "colorChange" ? SECONDARY_COLOR : HIGHLIGHTER2;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      }

      k = i;
    }

    this.SortingComplete(k)
  }

  SortingComplete(time){
    const arrayBars = document.getElementsByClassName("array-bar");
    setTimeout(() => {
      for (let i = 0; i < this.state.array.length; i++) {
        arrayBars[i].style.backgroundColor = TERTIARY_COLOR;
      }
    }, time * ANIMATION_SPEED_MS);
  }

  render() {
    const { array } = this.state;

    return (
      <div id="Layout-Elements">
        <nav>
          Sorting Visualizer
          <ul className="navbar-buttons">
            <li>
              <button
                className="button reset"
                onClick={() => this.resetArray()}
              >
                Reset
              </button>
            </li>
            <li>
              <button className="button" onClick={() => this.mergeSort()}>
                Merge Sort
              </button>
            </li>
            <li>
              <button className="button" onClick={() => this.quickSort()}>
                Quick Sort
              </button>
            </li>
            <li>
              <button className="button" onClick={() => this.heapSort()}>
                Heap Sort
              </button>
            </li>
            <li>
              <button className="button" onClick={() => this.bubbleSort()}>
                Bubble Sort
              </button>
            </li>
          </ul>
        </nav>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
                width: `${8 - 0.016 * NUMBER_OF_ARRAY_BARS}px`,
                margin: `0 ${2 - 0.005 * NUMBER_OF_ARRAY_BARS}px`,
              }}
            ></div>
          ))}
        </div>
        <div className="slidecontainer">
          <div style={{display: "inline-block", margin: "0 10%"}}>
            <input type="range" min={10} max={200} className="slider" id="No-Of-Bars" onChange={() => this.changingNumberOfBars()}></input>
            <div>Number of Bars</div>
          </div>
          <div style={{display: "inline-block", margin: "0 10%"}}>
            <input type="range" min={-899} max={100} className="slider" id="Speed" onChange={() => this.changingSpeed()}></input>
            <div>Speed</div>
          </div>
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
