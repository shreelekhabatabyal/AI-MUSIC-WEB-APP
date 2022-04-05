song1 = "";
song2 = "";
leftwrist_score = 0;
rightwrist_score = 0;
leftwristx = 0;
rightwristx = 0;
leftwristy = 0;
rightwristy = 0;

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music.mp3");
}



function setup() {
    canvas = createCanvas(600, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("Model Loaded");
}

function gotPoses(results) {
    if (results.length > 0) {
        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;
        rightwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y;
        console.log(results);
        leftwrist_score = results[0].pose.keypoints[9].score;
        rightwrist_score = results[0].pose.keypoints[10].score;
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    fill("#FF0000");
    stroke("#FF0000");
    if (rightwrist_score > 0.2) {
        circle(rightwristx, rightwristy, 20);
        song2.stop();
        if (song1_status == false) {
            song1.play();
            document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song"
        }
    }
    if (leftwrist_score > 0.2) {
        circle(leftwristx, leftwristy, 20);
        song1.stop();
        if (song2_status == false) {
            song2.play();
            document.getElementById("song").innerHTML = "Playing - Peter Pan Song"
        }
    }
}