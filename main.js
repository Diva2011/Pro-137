object = []
status = "";
function preload()
{
    video = createCapture(600,600);
}

function setup()
{
    video.hide();
    canvas = createCanvas(600,600);
    canvas.center();
    video.volume(0);
}

function start()
{
    objectDetection = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    txtvalue = document.getElementById("inp").value;
 
}

function modelLoaded()
{
    console.log("Model is initialized!");
    status = true;
}

function gotResult(error,results){
    if(error){
        console.error(error);
    } else {
        console.log(results);
        object = results;
    }
}

function draw()
{
    image(video,0,0,600,600);

    if(status != ""){
        objectDetection.detect(video , gotResult);
        
        for(i=0 ; i<object.length ; i++){          

            if(object[i].label == txtvalue){
                video.stop();
                objectDetection.detect(gotResult);
                document.getElementById('status').innerHTML = "Status: Object Detected";
                document.getElementById('found').innerHTML = txtvalue + " found";

                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(txtvalue + " found");
                synth.speak(utterThis);
                synth.stop();
               
            } 
            else {
                document.getElementById('status').innerHTML = "Detection complete";
                document.getElementById('found').innerHTML = txtvalue + " not found";
                synthh = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(txtvalue + " not found");
                synthh.speak(utterThis);
                synthh.stop();
               
            }
            

        }
       
    }   
}