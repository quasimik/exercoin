"use strict";

//const eth = require("./eth.js");

//var e = new eth();
//e.getBalance();

const fs = require('fs')
const watch = require('node-watch')

var x = [1, 0, 1]
var y = [0, 1, 1]
var keypointNames = ["head", "neck", 
					 "rshoulder", "relbow", "rhand",
					 "lshoulder", "lelbow", "lhand", 
					 "rhip", "rknee", "rfoot",
					 "lhip", "lknee", "lfoot"]

watch('./openpose-json/', { filter: /\.json$/ }, function(evt, name) {
	if(evt == 'update') {
		// nice, new shit
		fs.readFile(name, 'utf8', function (err, data) {
			
			if (err) throw err; // lol

			// parse if valid data
			var raw = JSON.parse(data)
			if(raw.people !== null && raw.people[0].pose_keypoints !== null) {
				raw = raw.people[0].pose_keypoints
				
				var keypoints = []
				while(raw.length != 0) {
					var keypoint = []
					keypoint.push(raw.shift()) // x coord
					keypoint.push(raw.shift()) // y coord
					keypoint.push(raw.shift()) // confidence

					keypoints.push(keypoint)
				}

				var keypointMap = new Map()
				keypointNames.forEach(function(item, index, array) {
					keypointMap.set(item, keypoints[index])
				})

				var luarm = dirvec(keypointMap.get("lelbow"), keypointMap.get("lshoulder"))
				var llarm = dirvec(keypointMap.get("lhand"), keypointMap.get("lelbow"))
				var lside = dirvec(keypointMap.get("lshoulder"), keypointMap.get("lhip"))
				var ruarm = dirvec(keypointMap.get("relbow"), keypointMap.get("rshoulder"))
				var rlarm = dirvec(keypointMap.get("rhand"), keypointMap.get("relbow"))
				var rside = dirvec(keypointMap.get("rshoulder"), keypointMap.get("rhip"))

				var keyAngles = new Map()
				keyAngles.set("lelbow", angle(reversed(luarm), llarm))
				keyAngles.set("relbow", angle(reversed(ruarm), rlarm))
				keyAngles.set("lshoulder", angle(reversed(lside), luarm))
				keyAngles.set("rshoulder", angle(reversed(rside), ruarm))
				keyAngles.set("lside", angle(reversed(lside), x))
				keyAngles.set("rside", angle(reversed(rside), x))

				console.log(name, keyAngles)
			}
		});
	}
	
})

// null for not in pushup, negative value for up, positive for down
// magnitude -> confidence
function checkPushup(keyAngles) {
	var up = 0, down = 0
	
	// check for side in view
	if(keyAngles.get("lside") == 0 && keyAngles.get("rside") == 0) return null
	var lside = keyAngles.get("lside")
	var rside = keyAngles.get("rside")
	if(lside[1] < 0.3 && rside[1] < 0.3) return null // not enough confidence

	// check arm angles in view
	if(keyAngles.get("lelbow") == 0 && keyAngles.get("relbow") == 0) return null
	var lelbow = keyAngles.get("lelbow")
	var relbow = keyAngles.get("relbow")
	if(lelbow[1] < 0.3 && relbow[1] < 0.3) return null // not enough confidence

	// check shoulder angles in view
	if(keyAngles.get("lshoulder") == 0 && keyAngles.get("rshoulder") == 0) return null
	var lshoulder = keyAngles.get("lshoulder")
	var rshoulder = keyAngles.get("rshoulder")
	if(lshoulder[1] < 0.3 && rshoulder[1] < 0.3) return null // not enough confidence
	
	// check if in the horizontal position
	if(lside[0] > Math.PI*3/4 && lside[0] < Math.PI) lside[0] = Math.PI - lside[0] // move angles 
	if(rside[0] > Math.PI*3/4 && rside[0] < Math.PI) rside[0] = Math.PI - rside[0] // into first quadrant
	if(lside[0] > Math.PI/4 && rside[0] > Math.PI/4) return null

	// up confidence
	if(lside != 0 && angleInThreshold(lside[0], Math.PI/6, 0.1)) up += lside[1] // body angle close to 30 deg
	if(rside != 0 && angleInThreshold(rside[0], Math.PI/6, 0.1)) up += rside[1] // from horizontal
	if(lshoulder != 0 && angleInThreshold(lshoulder[0], Math.PI/3, 0.2)) up += lshoulder[1] // shoulder angles close 
	if(rshoulder != 0 && angleInThreshold(rshoulder[0], Math.PI/3, 0.2)) up += rshoulder[1] // to 60 deg
	if(lelbow != 0 && angleInThreshold(lelbow[0], Math.PI/3, 0.25)) up += lelbow[1] // elbow angles close 
	if(relbow != 0 && angleInThreshold(relbow[0], Math.PI/3, 0.25)) up += relbow[1] // to 60 deg

}

// processing functions

function angleInThreshold(angle, target, threshold) {
	if(Math.abs(target - angle) < threshold) return true
	else return false
}

function normalize(keypoint = null) {
	if(keypoint !== null && keypoint.length == 3 && keypoint[2] != 0) {
		var magnitude = Math.sqrt((keypoint[0] * keypoint[0]) + (keypoint[1] * keypoint[1]))
		keypoint[0] /= magnitude
		keypoint[1] /= magnitude
	}
	return keypoint
}

// returns [angle in rads, confidence]
function angle(dirvec1 = null, dirvec2 = null) {
	if(dirvec1 !== null && dirvec2 !== null) {
		var norm1 = normalize(dirvec1)
		var norm2 = normalize(dirvec2)
		var dot = (norm1[0] * norm2[0]) + (norm1[1] * norm2[1])
		return [Math.acos(dot), Math.sqrt(dirvec1[2] * dirvec2[2])]
	}
	return 0
}


function dirvec(head = null, tail = null) {
	if(head !== null && head[2] != 0 && tail !== null && tail[2] != 0) {
		return normalize([ head[0] - tail[0], head[1] - tail[1], Math.sqrt(head[2] * tail[2]) ])
	}
	return null
}

function reversed(dirvec = null) {
	if(dirvec != null && dirvec.length == 3) {
		return [ dirvec[0] * -1, dirvec[1] * -1, dirvec[2] ]
	}
}