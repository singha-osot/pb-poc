var video;
var snapshots = [];
var counter = 0;
var fps = 30;
let constraints = {
    video: {
      optional: [{ maxFrameRate: fps}]
    },
    audio: false
  };

function setup () {
  createCanvas(620/2, 1110/2);
  background(255);
  
  video = createCapture(constraints);
  video.size(620, 370);
  video.hide();
  frameRate(fps);
}

function draw () {
  let w = width;
  let h = height / 3;
  let x = 0;
  let y = 0;
  let delayScreen = fps * 3;

  let numRow = floor(width / w);
  let numCol = floor(height / h)
  let numScreen = numRow * numCol;
  let total = numScreen * delayScreen;

  snapshots[counter] = video.get();
  counter++;
  if (counter == total) {
    counter = 0;
  }

  for (let i = 0; i < snapshots.length; i++) {
    let frameNo = i * delayScreen + frameCount
    let index = frameNo % snapshots.length;
    if(frameNo > total * 1.5) image(snapshots[index], x, y, w, h);
    else text("LOADING...", x, y, w, h);
    x = x + w;
    if (x >= width) {
      x = 0;
      y = y + h;
    }
  }
}