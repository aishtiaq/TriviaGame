var answers= ['c','c','a','b','c','b','b','b','a','a'];
var correct=0;
var wrong= 0;
var questions = [
    'In the year 1900 in the U.S. what were the most popular first names given to boy and girl babies?',
    'When did the Liberty Bell get its name?',
    'In the Roy Rogers -Dale Evans Museum, you will find Roy and Dales stuffed horses. Roy\'s horse was named Trigger, which was Dales horse?',
    'Which of the following items was owned by the fewest U.S. homes in 1990?',
    'What year was it that the Census Bureau first reported that a majority of new mothers  were remaining in the new job market?',
    'Florence Nightingale became known as "the Lady With the Lamp" during which war?',
    'In J. Edgar Hoover, what did the J stand for?',
    'When Mt. St. Helens erupted on May 18, 1980, how many people were killed?',
    'Which is the largest ocean of the world?',
    'How many bones are in the human body?'
];
var choices = [
    ['William and Elizabeth','Joseph and Catherine','John and Mary'],
    ['when it was made, in 1701','in the 19th century, when it became a symbol of the abolition of slavery','when it rang on July 4, 1776'],
    ['Buttermilk','Daisy','Scout'],
    ['Home Computer','Compact Disk','Dishwasher'],
    ['1968','1978','1988'],
    ['American Civil War','Crimean War','WW1'],
    ['James','John','Joseph'],
    ['1','57','571'],
    ['Pacific','Atlantic','Arctic'],
    ['206','199','212']
];
var intervalId;
var minutes;
var seconds;
var time=90;

$(document).ready(function() {

    $("#start").on("click", function(){
        initiate();
    });  
    
    
  
});

$(document).on("click","#submit", function(event){
    event.preventDefault();
    
    checkAnswers();
});  

function initiate() {
    $("#display").html("01:30");
    $("#formrow").empty();
    var data= '<form id="form" action="">';
    for (var i=0; i<questions.length; i++){
        
        data = data+('<p class="mt-5 pt-3">'+questions[i]+'</p>\
        <div class="form-check form-check-inline">\
        <input class="form-check-input" type="radio" name="q'+i+'" id="inlineRadio1" value="a">\
        <label class="form-check-label" for="inlineRadio1">'+choices[i][0]+'</label>\
    </div>\
    <div class="form-check form-check-inline">\
        <input class="form-check-input" type="radio" name="q'+i+'" id="inlineRadio2" value="b">\
        <label class="form-check-label" for="inlineRadio2">'+choices[i][1]+'</label>\
    </div>\
    <div class="form-check form-check-inline">\
        <input class="form-check-input" type="radio" name="q'+i+'" id="inlineRadio3" value="c">\
        <label class="form-check-label" for="inlineRadio3">'+choices[i][2]+'</label>\
    </div>');
    }
    //data=data+'</form>';
    
    data =data +'<br/>\
    <button id="submit" value="Submit" class="my-2">Submit</button>\
    </form>';
    $("#formrow").html(data);

    intervalId = setInterval(timer,1000);

}

function timer (){
    time--;

    var minutes = Math.floor(time / 60);
    var seconds = time - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }

    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    $("#display").html( minutes + ":" + seconds);
    if(time === 0) {
        checkAnswers();
    }
        
}

function checkAnswers() {
    clearInterval(intervalId);
    var queryString = $("form").serialize();
    if(queryString==="") {
        console.log("nothing selected");
        
    } else {
        var params = queryString.split("&"); // ["query=true", "query2=false"]
        
        for (var i=0; i < params.length; i++) {
            //console.log(params[i].split("=")[0], params[i].split("=")[1]);   
            var val=params[i].split("=")[1] ;
            if (val === answers[i]) {
                correct++;
            }  else {
                wrong++;    
            }
        }
    }
    var unanswered = questions.length - (correct+wrong);
    $("#formrow").empty();
    $("#display").empty();
    var data= '<div class="results" >\
    Correct Answers: '+correct+'\
    </div>\
    <div class="results">\
    Incorrect Answers: '+wrong+'\
    </div>\
    <div class="results">\
    Unanswered: '+unanswered+'\
    </div>\
    ';
    $("#formrow").html(data);
}