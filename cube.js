/******************************************************************************
* cube.js                                                                     *
*                                                                             *
* Written by Simon Pratt                                                      *
* See LICENSE file for software license.                                      *
*                                                                             *
******************************************************************************/

(function(global) {
    var Cubie = function(str, img) {
	this.str = str;
	this.img = img;
	return this;
    };

    Cubie.prototype.toString = function() { return this.str; };
    Cubie.prototype.toImage = function() { return this.img; };

    var cubies = new Array();
    // front corner cubies
    cubies[0] = new Cubie("lfu",null);
    cubies[1] = new Cubie("rfu",null);
    cubies[2] = new Cubie("rfd",null);
    cubies[3] = new Cubie("lfd",null);
    // back corner cubies
    cubies[4] = new Cubie("rbu",null);
    cubies[5] = new Cubie("lbu",null);
    cubies[6] = new Cubie("lbd",null);
    cubies[7] = new Cubie("rbd",null);

    // front edge cubies
    cubies[8] = new Cubie("fu",null);
    cubies[9] = new Cubie("fr",null);
    cubies[10] = new Cubie("fd",null);
    cubies[11] = new Cubie("fl",null);
    // back edge cubies
    cubies[12] = new Cubie("bu",null);
    cubies[13] = new Cubie("bl",null);
    cubies[14] = new Cubie("bd",null);
    cubies[15] = new Cubie("br",null);
    // left edge cubies
    cubies[16] = new Cubie("ul",null);
    cubies[17] = new Cubie("dl",null);
    // right edge cubies
    cubies[18] = new Cubie("ur",null);
    cubies[19] = new Cubie("dr",null);
    
    var Cube = function() {
	this.cubicles = new Array();
	for(var i in cubies) {
	    this.cubicles[i] = cubies[i];
	}

	return this;
    };

    Cube.prototype.toString = function() {
	var str = "( ";
	for(var i in this.cubicles) {
	    str += this.cubicles[i] + " ";
	}
	return str + ")";
    };

    Cube.prototype.solved = function() {
	var cubeState = true;
	for(var i in this.cubicles) {
	    cubeState = cubeState &&
		cubies[i] == this.cubicles[i];
	}
	return cubeState;
    };

    Cube.prototype.F = function() {
	var temp;
	// corner cubies
	temp = this.cubicles[0]; // save LFU
	this.cubicles[0] = this.cubicles[3]; // LFD -> LFU
	this.cubicles[3] = this.cubicles[2]; // RFD -> LFD
	this.cubicles[2] = this.cubicles[1]; // RFU -> RFD
	this.cubicles[1] = temp;             // LFU -> RFU

	// edge cubies
	temp = this.cubicles[8]; // save FU
	this.cubicles[8] = this.cubicles[11];  // FL -> FU
	this.cubicles[11] = this.cubicles[10]; // FD -> FL
	this.cubicles[10] = this.cubicles[9];  // FR -> FD
	this.cubicles[9] = temp;               // FU -> FR
	
	return this;
    };

    Cube.prototype.F2 = Cube.prototype.F2inv = function() {
	return this.F().F();
    };

    Cube.prototype.Finv = function() {
	return this.F2().F();
    };

    global.Cube = Cube;
})(this);