
// Creates a new canvas element and appends it as a child
// to the parent element, and returns the reference to
// the newly created canvas element

function App(container, width, height, fillColor){

    this.canvas = this.createCanvas(container, width, height);
    this.ctx = this.canvas.context;

    // define a custom fillCircle method
    this.ctx.fillCircle = function(x, y, radius, fillColor) {
        this.fillStyle = "rgba(102, 102 ,102, 0.1)";
        this.beginPath();
        this.moveTo(x, y);
        this.arc(x, y, radius, 0, Math.PI * 2, false);
        this.fill();
    };
    this.ctx.clearTo = function(fillColor) {
        this.fillStyle = fillColor;
        this.fillRect(0, 0, width, height);
    };
    this.ctx.clearTo(fillColor || "#ddd");
}

App.prototype.createCanvas = function(parent, width, height) {
    var canvas = {};
    canvas.node = document.createElement('canvas');
    canvas.context = canvas.node.getContext('2d');
    canvas.node.className = "board";
    canvas.node.width = width || 100;
    canvas.node.height = height || 100;
    parent.appendChild(canvas.node);
    return canvas;
}

App.prototype.draw_horiz = function(data, yPos) {
    var x = data;
    var y = yPos || 100;
    var radius = 3; // or whatever
    var fillColor = '#ff0000';
    this.ctx.fillCircle(x, y, radius);
};

App.prototype.draw_vert = function(data, xPos) {
    var x = xPos || 100;
    var y = data;
    var radius = 3; // or whatever
    var fillColor = '#ff0000';
    this.ctx.fillCircle(x, y, radius);
};

App.prototype.clear_screen = function(){
    this.ctx.clearTo = function(fillColor) {
        this.fillStyle = '#ddd';
        this.fillRect(0, 0, 1024, 1024);
    };
    this.ctx.clearTo("#ddd");
}
