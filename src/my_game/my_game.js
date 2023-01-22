/*
 * File: MyGame.js
 * This is the logic of our game. For now, this is very simple.
 */
"use strict"; // Operate in Strict mode such that variables must be declared before used!

// Accessing engine internal is not ideal,
//      this must be resolved! (later)
import * as loop from "../engine/core/loop.js";

// Engine stuff
import engine from "../engine/index.js";

class MyGame {
  constructor() {
    // variables for the squares
    this.mWhiteSq = null; // these are the Renderable objects

    //red square
    this.mRedSq = null;

    // The camera to view the scene
    this.mCamera = null;

    this.spacebarPressed = false;
  }

  init() {
    // Step A: set up the cameras
    this.mCamera = new engine.Camera(
      vec2.fromValues(50,37.5), // position of the camera
      100, // width of camera
      [0, 0, 640, 480] // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    // sets the background to gray

    // Step  B: Create the Renderable objects:
    this.mWhiteSq = new engine.Renderable();
    this.mWhiteSq.setColor([1, 1, 1, 1]);

    this.mRedSq = new engine.Renderable();
    this.mRedSq.setColor([1, 0, 0, 1]);
    // this.mWhiteSq.getXform().setPosition(20, 60);

    // Step  C: Initialize the white Renderable object: centered, 5x5, rotated
    this.mWhiteSq.getXform().setPosition(20, 60);
    // this.mWhiteSq.getXform().setRotationInRad(0.2); // In Radians
    this.mWhiteSq.getXform().setSize(5,5);

    // Step  D: Initialize the red Renderable object: centered 2x2
    this.mRedSq.getXform().setPosition(50, 37.5);
    this.mRedSq.getXform().setSize(1, 1);
  }

  // This is the draw function, make sure to setup proper drawing environment, and more
  // importantly, make sure to _NOT_ change any state.
  draw() {
    // Step A: clear the canvas
    engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setViewAndCameraMatrix();

    // Step  C: Activate the white shader to draw

    // if (engine.input.isKeyPressed(engine.input.keys.Space)) {
    // engine.input.keys.Space = true;
    // engine.isKeyPressed
     /*if (this.spacebarPressed) {
      this.mWhiteSq.draw(this.mCamera);

     } */
    // this.mWhiteSq.draw(this.mCamera);
    // engine.input.keys.Space = 0;
    // this.mWhiteSq.draw(this.mCamera);
    // }
    // this.mWhiteSq.draw(this.mCamera);s

    if (this.spacebarPressed) {
      for(let i =0; i < this.squares.length; i++) {
        let pos = this.squarePositions[i];
        this.squares[i].getXform().setPosition(pos.x,pos.y);
        // this.squarePosition.setPosition(this.xPos[i], this.yPos[i]);

      this.squares[i].draw(this.mCamera);
      }
      
    }
 
    // Step  D: Activate the red shader to draw
    this.mRedSq.draw(this.mCamera);

    requestAnimationFrame(this.draw.bind(this));
  // setInterval(draw.bind(this), 10);

  }
  //You can also use setInterval function in javascript
  // to call the draw function in certain time interval as well.
  // setInterval(draw.bind(this),10);

  // The update function, updates the application state. Make sure to _NOT_ draw
  // anything from this function!
  update() {
    // for the red cursor
    let redXform = this.mRedSq.getXform();

    let deltaX = 5;
    let deltaX2 = -5;
    let deltaY = 5;
    let deltaY2 = -5;

    // Step A: test for red square movement
    if (engine.input.isKeyClicked(engine.input.keys.Right)) {
      console.log(redXform.getXPos());

      if (redXform.getXPos() > 100) {

        // this is the right-bound of the window
        redXform.setPosition(50, 37.5);
      }
      redXform.incXPosBy(deltaX);
    }

    // test for red square movement
    if (engine.input.isKeyClicked(engine.input.keys.Left)) {
      console.log(redXform.getXPos());

      if (redXform.getXPos() < 0) {
        // this is the right-bound of the window
        redXform.setPosition(50, 37.5);
      }
      redXform.incXPosBy(deltaX2);
    }

    // Step  B: test for Up key for red square
    if (engine.input.isKeyClicked(engine.input.keys.Up)) {
      console.log(redXform.getYPos());
      if (redXform.getYPos() > 75) {
        // this is the right-bound of the window
        redXform.setPosition(50, 37.5);
      }
      redXform.incYPosBy(deltaY);
    }

    // Step  C: test for left down the red square
    if (engine.input.isKeyClicked(engine.input.keys.Down)) {
      console.log(redXform.getYPos());
      if (redXform.getYPos() <0) {
        // this is the right-bound of the window
        redXform.setPosition(50, 37.5);
      }
      redXform.incYPosBy(deltaY2);
    }

    //for the random squares
    // Step  D: test for space bar the red square
    if (engine.input.isKeyClicked(engine.input.keys.Space)) {
      //generate a random number between 10 and 20
      let n = Math.floor(Math.random() * 11 + 10);

      //Array to store the squares
      this.squares = [];

      //Array to store xPosition and yPosition of the squares
      // this.xPos = [];
      // this.yPos = [];

      this.squarePositions = [];

      //Loop to create n squares
      for (let i = 0; i < n; i++) {
        //Create a new square object
        let square = new engine.Renderable();

        // this.squarePositions.push({
        //   x:
        // })

        //Set the center of the square to be within 5 units of the red cursor

        let x = this.mRedSq.getXform().getXPos() + (Math.random() * 10 - 5);

        let y = this.mRedSq.getXform().getYPos() + (Math.random() * 10 - 5);

        this.squarePositions.push({ x: x, y: y });

        // this.xPos.push(x);
        // this.yPos.push(y);
        // this.squarePosition = square.getXform;

        // square.getXform().setPosition(x,y);

        //Set the size of the sqaure to be a random number 1 and 6
        let size = Math.random() * 5 + 1;
        square.getXform().setSize(size, size);

        //Set the square to be randomly rotated
        square.getXform().setRotationInRad(Math.random() * 2 * Math.PI);

        //Set the square to have a random color
        square.setColor([Math.random(), Math.random(), Math.random(), 1]);
        this.squares.push(square);
      }

    

      this.spacebarPressed = true;
    }
  }
}

window.onload = function () {
  engine.init("GLCanvas");

  let myGame = new MyGame();

  // new begins the game
  loop.start(myGame);
};
