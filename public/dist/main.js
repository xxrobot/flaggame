'use strict';

var MODELS = [{
    name: 'Ariel Vanean',
    imgURL: 'http://small1.myjub.com/eyecandy_img/19829/bel_ami_online-ariel_vanean_5_19829_12.jpg',
    answerImg: 'http://68.media.tumblr.com/85a5e98fe5dfc6e148cad48eb9b26140/tumblr_mzuumwQNL41sv1j6fo1_500.jpg',
    affiliateURL: ''
}, {
    name: 'Brent Everett',
    imgURL: 'https://68.media.tumblr.com/4c2a1d1a2655d46a6dbac37caf751c61/tumblr_oaefkqchky1utqi8vo1_500.jpg',
    answerImg: 'images/brenteverett.png',
    affiliateURL: ''
}, {
    name: 'Pierre Fitch',
    imgURL: 'https://68.media.tumblr.com/750e4f9dc55b2ffe5c86df7902cffa59/tumblr_o2iv9dvT4B1v88h8ro1_500.jpg',
    answerImg: 'images/pierrefitch.png',
    affiliateURL: ''
}, {
    name: 'Topher DiMaggio',
    imgURL: 'http://www.thesword.com/wp-content/uploads/2015/03/topher-top-porn.jpg',
    answerImg: 'images/topher.png',
    affiliateURL: ''
}, {
    name: 'Austin Wilde',
    imgURL: 'http://www.thesword.com/wp-content/uploads/2015/03/Austin_Wilde-Guysinsweatpants.jpg',
    answerImg: 'images/austinwilde.png',
    affiliateURL: ''
}, {
    name: 'Rafael Alencar',
    imgURL: 'http://68.media.tumblr.com/5aac0ecad81a84fd0205ea4dfb3818f1/tumblr_nfhcx2CWqS1ti7539o1_1280.jpg',
    answerImg: 'images/rafaelalencar.png',
    affiliateURL: ''
}];

var points = 0;

function getRandInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function newFlag() {
    var randInt = getRandInt(0, MODELS.length);
    document.getElementById('flag').src = MODELS[randInt].imgURL;

    $(".answer_option").bind('click', function () {
        $(".answer_option").unbind('click');
        $(this).toggleClass(checkAnswer($(this).children('.answer_text').html()));
        console.log($(this).children('.answer_text').html());
    });

    //make answers
    var answers = MODELS.slice(); //copy the models array
    answers.splice(randInt, 1); //take out the answer
    shuffleArray(answers); //shuffle answers
    answers.length = 3; //return 3 answers
    answers.push(MODELS[randInt]); //add back in real answer
    window.realAnswer = MODELS[randInt];
    window.answers = answers;
    shuffleArray(answers); //shuffle answers again

    //make answers;
    for (var i = 0; i < answers.length; i++) {
        document.getElementById('answer_' + i).innerHTML = '<span class="answer_img"><img src="' + answers[i].answerImg + '"></span> \
    													<span class="answer_text">' + answers[i].name + '</span>';
        console.log(document.getElementById('answer_' + i));
    }
}

function checkAnswer(guess) {
    countDown(3);

    if (guess == realAnswer.name) {
        $('#result').html('Correct!');
        points++;
        $("#points").html("Points: " + points);
        return "correct";
    } else {
        $('#result').html('wrong');
        $(".answer_option:contains(" + realAnswer.name + ")").toggleClass('correct');
        //tell the right answer to turn green
        return "wrong";
    }
}

function countDown(i) {
    var int = setInterval(function () {
        document.getElementById("countdown").innerHTML = "Next Question in: " + i;
        i--;
        if (i === 0) {
            clearInterval(int);
            newFlag();
            //Reset
            document.getElementById("countdown").innerHTML = "&nbsp;";
            document.getElementById("result").innerHTML = "&nbsp;";

            $(".answer_option").removeClass('correct').removeClass('wrong');
            $(".answer_option").bind('click', function () {});
        }
    }, 1000);
}

$(document).ready(function () {
    'use strict';

    newFlag();
});