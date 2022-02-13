import React from "react";
import "./SortingVisualizer.css";
import { getMergeSortAnimations } from "../SortingAlgorithms/mergeSort";
import { getQuickSortAnimations } from "../SortingAlgorithms/quickSort";

const ANIMATION_SPEED_MS = 25;

const NUMBER_OF_ARRAY_BARS = 100;

const PRIMARY_COLOR = "darkblue";

const SECONDARY_COLOR = "red";

const TERTIARY_COLOR = "green";

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
      document.getElementsByClassName("array-bar")[i].style.backgroundColor =
        PRIMARY_COLOR;
    }
    this.setState({ array });
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
      } else {
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
        } else {
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.backgroundColor = SECONDARY_COLOR;
            barOneStyle.height = `${newHeight}px`;
          }, i * ANIMATION_SPEED_MS);
        }
      }

      k = i;
    }

    setTimeout(() => {
      for (let i = 0; i < this.state.array.length; i++) {
        arrayBars[i].style.backgroundColor = "darkolivegreen";
      }
    }, k * ANIMATION_SPEED_MS);
  }

  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    let k;
    console.log(animations);
    console.log(this.state.array);

    for (let i = 0; i < animations.length; i++) {
      if (animations[i][0] === "pivot") {
        setTimeout(() => {
          const pivotBar = arrayBars[animations[i][1]];
          pivotBar.style.backgroundColor = TERTIARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      } else if (animations[i][0] === "pointer") {
        setTimeout(() => {
          const pointerIndex = arrayBars[animations[i][1]];
          const pointerIndexStyle = pointerIndex.style;
          pointerIndexStyle.backgroundColor = "yellow";
        }, i * ANIMATION_SPEED_MS);
      } else {
        const pointerIndex = arrayBars[animations[i][1]];
        const barIndex = arrayBars[animations[i][2]];
        const pointerIndexStyle = pointerIndex.style;
        const barStyle = barIndex.style;

        if (animations[i][0] === "colorChange") {
          setTimeout(() => {
            pointerIndexStyle.backgroundColor = SECONDARY_COLOR;
            barStyle.backgroundColor = SECONDARY_COLOR;
          }, i * ANIMATION_SPEED_MS);
        } else if (animations[i][0] === "swap") {
          setTimeout(() => {
            const pointerHeight = animations[i][3];
            const barHeight = animations[i][4];

            pointerIndexStyle.height = `${barHeight}px`;
            barStyle.height = `${pointerHeight}px`;
          }, i * ANIMATION_SPEED_MS);
        } else {
          setTimeout(() => {
            pointerIndexStyle.backgroundColor = PRIMARY_COLOR;
            barStyle.backgroundColor = PRIMARY_COLOR;
          }, i * ANIMATION_SPEED_MS);
        }
      }

      k = i;
    }

    setTimeout(() => {
      for (let i = 0; i < this.state.array.length; i++) {
        arrayBars[i].style.backgroundColor = "darkolivegreen";
      }
    }, k * ANIMATION_SPEED_MS);
  }

  heapSort() {}

  bubbleSort() {}

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
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
