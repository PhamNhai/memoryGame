
var card_array = ["c01","c02","c03","c04","c05","c06","c07","c08","c09"];
var images = [];
var picked_cards = [];
var picked_card_ids = [];
var cards_flipped = 0;

for(var i = 0; i < card_array.length; i+=1){
      var img = "images/"+card_array[i]+".png";
      images.push(img);
      images.push(img);
    }

Array.prototype.memory_card_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

function newBoard(){
	cards_flipped = 0;
	var output = '';
    images.memory_card_shuffle();
	for(var i = 0; i < images.length; i++){
	  output += '<div id="card_'+i+'" onclick="flipCard(this,\''+images[i]+'\')">';
      output += "</div>";
	}
	document.getElementById('container').innerHTML = output;
}

function flipCard(card,link){
	if(card.innerHTML == "" && picked_cards.length < 2){
		card.style.background = 'url('+link+')';
		card.style.backgroundSize="100% 100%";
		if(picked_cards.length == 0){
			picked_cards.push(link);
			picked_card_ids.push(card.id);
		} else if(picked_cards.length == 1){
			picked_cards.push(link);
			picked_card_ids.push(card.id);
			if(picked_cards[0] == picked_cards[1]){
				cards_flipped += 2;
				picked_cards = [];
            	picked_card_ids = [];
				if(cards_flipped == card_array.length){
					document.getElementById('container').innerHTML = "";
					newBoard();
				}
			} else {
				function flip2Back(){
				    var card_1 = document.getElementById(picked_card_ids[0]);
				    var card_2 = document.getElementById(picked_card_ids[1]);

				    card_1.style.background = 'url("images/z02.png") no-repeat';
					card_1.style.backgroundSize="100% 100%";

            	    card_1.innerHTML = "";
				    card_2.style.background = 'url(images/z02.png) no-repeat';
					card_2.style.backgroundSize="100% 100%";

            	    card_2.innerHTML = "";
				    picked_cards = [];
            	    picked_card_ids = [];
				}
				setTimeout(flip2Back, 700);
			}
		}
	}
}