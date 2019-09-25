let countSec = 0;
let countMin = 0;

function updateText() {	
  $('.minutes').val(('0' + String(countMin)).slice(-2));
  $('.seconds').val(('0' + String(countSec)).slice(-2));
}
updateText();

function countDown() {
    let tot = countSec + countMin * 60;
    const interval = setTimeout(countDown, 1000);
    if (countSec > 0) countSec--;
    else if (countMin > 0) {
        countSec = 59;
        countMin--;
    } else {
        clearInterval(interval);
        $('.countdown').hide();
        $('.stop').hide();
        $('.restart').show();
        $('.message').html("<p>Время закончилось</p>")
    }
    updateText();

    $('.stop').click(() =>{
        clearInterval(interval);
        $('.stop').hide();
        $('.start').show();
        $('.restart').hide();
      });
}

$('.plus').click(() =>{
  if(countSec < 59) countSec++;
  else{
  	countSec = 0;
  	countMin++;
  }
  updateText()
});

$('.minus').click(() =>{
	if(countMin <= 0 && countSec===0){
  	countSec = 0;
    countMin = 0;
    return;
  }
  if(countSec > 0) countSec--;
  else{
  	countSec = 59;
  	countMin--;
  }
  updateText();
})

$('.start').click(() => {
  $('.start').hide();
  $('.plus').hide();
  $('.minus').hide();
  $('.stop').show();
	countDown();  
})

$('.restart').click(() =>{
  $('.minus').show();
  $('.plus').show();
  $('.start').show();
  $('.restart').hide();
  $('.countdown').show();
  $('.message').html("");
})


$(".countdown-time").on('input', function() {
    const numString = $(this).val();
    if (numString.length > 2) {
        updateText();
        alert('Вы ввели больше чем 2 символа')
    } else if (parseInt(numString) > 59) {
        updateText();
        alert('Число не должно быть больше 59')
    } else if (!numString) {
        //pass
    } else {
        countSec = parseInt($('.seconds').val());
        countMin = parseInt($('.minutes').val());
        setTimeout(updateText, 10000)
    }
});