class Card {
    constructor(pair) {
        this.flipped = false;
        this.pair = pair;
        this.matched = false;
    }

}
var flip_cards = new Array(16);
var display_cards = Array.from(document.querySelectorAll(".flip-card"));
var first_card = null;
var attempts = 0;
var score = 0;

for (var index = 0; index < flip_cards.length; index++) {
    flip_cards[index] = new Card(Math.floor(index / 2) + 1);
}
shuffle(flip_cards);


for (var index = 0; index < flip_cards.length; index++) {
    display_cards[index].addEventListener("click", function () {
        var card = flip_cards[display_cards.indexOf(this)];
        
        if(!card.matched){  
            this.classList.toggle("flip");         
            update_status(card);

            if (first_card === null) {                
                first_card = card;
                console.log(first_card);
            }
            else {
                if(card !== first_card){
                    attempts++;
                    update_attempts();
                    
                    if (card.pair === first_card.pair) {
                        console.log("hh");                    
                        card.matched = true;
                        first_card.matched = true;
                        first_card = null;
                        score++;
                        update_score();
                        if(score===8){
                            sleep(300).then(() => {
                                document.querySelector("#score").classList.remove("text-bg-info");
                                document.querySelector("#score").classList.add("text-bg-success");
                                document.querySelector("#heading").innerText = "You won!"                                
                            });
                            
                        }

                    }
                    else { 
                        sleep(800).then(() => { 
                            first_display = display_cards[flip_cards.indexOf(first_card)];
                            update_status(first_card);
                            first_display.classList.toggle("flip");
                            update_status(card);
                            this.classList.toggle("flip");                            
                            first_card = null;
                        });
                        
                    }
                }
            }
        }
        else{
            alert("Already Matched!");
        }
    });
}

function update_score(){
    document.querySelector("#score").innerText = score;
}

function update_attempts(){
    if(attempts>10){
        document.querySelector("#attempts").classList.remove("text-bg-warning");
        document.querySelector("#attempts").classList.add("text-bg-danger");
    }
    document.querySelector("#attempts").innerText = attempts;
}

function update_status(card) {    
    card.flipped = !(card.flipped);
}

function shuffle(arr) {
    for (var index = 0; index < flip_cards.length; index++) {
        var next = Math.floor(Math.random() * arr.length);
        var temp = arr[index];
        arr[index] = arr[next];
        arr[next] = temp;
    }
    for(var index = 0; index < flip_cards.length; index++){
        display_cards[index].querySelector(".flip-card-back .card-text").innerText = flip_cards[index].pair;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
// for(card of flip_cards){
//     card.addEventListener("click", function(){

//     });
// }


