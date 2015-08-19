# Etchaduino
Etch-a-Sketch arduino style

This project uses basic components from the arduino starter kit to create an etch-a-sketch in your browser!

## Requirements
 - johnny-five compatible arduino board
 - (2) potentiometers
 - (1) 10 kilohm resistor
 - (1) tilt switch

## Circuit Configuration
![alt tag](https://raw.github.com/SVehrenkamp/etchaduino/master/sketch.jpg)

## Installation
Make sure firmata has been loaded onto your arduino board.
Run ```npm install``` to install dependencies

Run ```node app``` to start the express server and upload your johnny five sketch to your arduino board.

## Usage
Toggle the potentiometers in either direction to draw to the canvas.
Tilt the board/circuit at least 90 degrees to clear the screen!