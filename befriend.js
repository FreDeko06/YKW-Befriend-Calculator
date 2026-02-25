let foodBonus = [
  [ 0, 10, 15, 20, 25 ],
  [ 0, 5, 8, 11, 14 ],
  [ 0, 4, 6, 8, 10 ],
  [ 0, 4, 5, 6, 7 ],
  [ 0, 3, 4, 5, 6 ],
  [ 0, 2, 3, 4, 5 ],
  [ 0, 1, 2, 3, 4 ],
  [ 0, 1, 1, 2, 3 ]
];
let popularityBonus = [ 10, 5, 4, 4, 3, 2, 1, 1 ];
let unpopularityBonus = [ 10, 4.5, 2, 1, 0.5, 0.25, 0.1, 0.05 ];
let whispBonus = [ 0, 10, 100 ]
let pokeBonus = 10;
let shrineBonus = 1;


function calcChance() {
	let whisp = getTier("whisp");
	let food = getTier("food");
	let foodFactor = getFoodFactor();
	let superstar = checkProp("pop");
	let unpop = checkProp("unpop");
	let poke = checkProp("poke");
	let shrine = checkProp("shrine");

	let befriendId = parseInt(document.getElementById("bef_id").value);
	if (isNaN(befriendId)) {
		return "-";
	}
	
	if (befriendId < 1 || befriendId > 8) {
		return 0;
	}

	let chance = (1 / (2**(befriendId+2))) * 100;

	chance += whispBonus[whisp];
	console.log(chance);
	chance += foodBonus[befriendId-1][food] * getFoodFactor();
	console.log(chance);
	chance += superstar ? popularityBonus[befriendId-1] : 0;
	console.log(chance);
	chance -= unpop ? unpopularityBonus[befriendId-1] : 0;
	console.log(chance);
	chance += poke ? pokeBonus : 0;
	console.log(chance);
	chance += shrine ? shrineBonus : 0;
	console.log(chance);


	return chance;

}

function calculate() {
	document.getElementById("result").innerHTML = `Calculated Chance: ${calcChance()}%`;
}

function getTier(prefix) {
	for (let i = 0; i <= 4; i++) {
		if (document.getElementById(`${prefix}_${i}`).checked) return i;
	}

	return 0;
}

function checkProp(id) {
	return document.getElementById(id).checked;
}

function getFoodFactor() {
	let favFood = document.getElementById("fav_food").checked;
	let hateFood = document.getElementById("hat_food").checked;

	if (favFood) return 1.5;
	if (hateFood) return 0.4;
	return 1;
}
