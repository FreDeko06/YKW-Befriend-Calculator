# Yokai Watch 2 Psychic Specters Befriend Rate Calculator
Access: https://fredeko06.github.io/YKW-Befriend-Calculator/

## How does Befriending work?
### Base probability
The befriend rates depend entirely on the yokai's [friend rate descriptor](https://ykw-modding.github.io/yo-docs/modding-resources/param-ids/yw2-param-ids.html). Each friend rate descriptor consists of 4 bytes, while only the last 3 are used.

Take for example Pandle. Pandle has the friend rate descriptor `0x00654331`. Each number represents a, let's call it difficulty id. If you currently have no pandle befriended the difficulty id will be `1`. 
If you already have one, it will be `3`, then again `3`, then `4` and so on. Only the count of yokai you have **currently** befriended is used. If you turn all your yokai medals of that yokai into a soul, it counts has having none befriended.

Using this difficulty id you can then determine the base probability of that yokai wanting to join you party. It will be

$$ 1 : 2^{difficultyId + 2} $$

For example if the difficulty id is `1` the base probability is $1:2^{3}$ or $1:8$ or 12.5%.

### Player influenced bonuses
After calculating the base chance, the bonuses the player can influence are added:
* food bonus
* befriend poke (10%)
* superstar soul/popularity skill
* unpopularity skill
* whisp bonus (10% or 100%)
* shrine bonus (1%)

**Note**: Each bonus can only be added once. Nothing stacks.

#### Bonuses that depend on the difficulty id
| ID | Food Tier 1 | Food Tier 2 | Food Tier 3 | Food Tier 4 | popularity | unpopularity |
|----|-------------|-------------|-------------|-------------|------------|--------------|
| 1  | 10%         | 15%         | 20%         | 25%         | 10%        | -10%         |
| 2  | 5%          | 8%          | 11%         | 14%         | 5%         | -4.5%        |
| 3  | 4%          | 6%          | 8%          | 10%         | 4%         | -2%          |
| 4  | 4%          | 5%          | 6%          | 7%          | 4%         | -1%          |
| 5  | 3%          | 4%          | 5%          | 6%          | 3%         | -0.5%        |
| 6  | 2%          | 3%          | 4%          | 5%          | 2%         | -0.25%       |
| 7  | 1%          | 2%          | 3%          | 4%          | 1%         | -0.1%        |
| 8  | 1%          | 1%          | 2%          | 3%          | 1%         | -0.05%       |

If the given food was the yokai's favorite food the value gets multiplied by 1.5. If it was the yokai's hated food it gets multiplied by 0.4.
For example if you gave a tier 4 favorite food at difficulty 1 the bonus will be 37.5% instead of 25%.

#### What is the shrine bonus?
Sometimes after you have put your 1$ into the shrine in Mt. Wildwood, you get the message: "I have a feeling that I've got a lot more friends now.".
After this message every yokai has a 1% higher chance of approaching you after a battle for one day.

### The Decision
These probabilities are calculated and applied for each of your (up to 6) enemy yokai independently. If more than one yokai is selected, the last digit of the friend rate descriptor decides.
Regardless of how often you already befriended this yokai, the yokai that has the highest difficulty of the selected will become your friend.

For example: if both Pandle and Undy are selected, regardless of how often you befriended anyone of them, Undy will become your friend, because his friend rate descriptor (`0x00765444`) has a `4`Wazzat as last digit and Pandles only has a `1`.
If there is a tie, one yokai with the highest difficulty id is selected randomly with equal probability.

### Full example
You are playing against Undy and two Pandles and haven't befriended anyone of them. The base probability for befriending Undy will be 1:64 or about 1.6%, for befriending each Pandle the probability
will be 1:8 or 12.5%. If you now give Undy his favourite tier 4 food this probability gets increased: 1.6% + 1.5*7% = 1.6% + 10.5% = 12.1%. Now you also poke him: 12.1% + 10% = 22.1%. And you get a blue whisp with one heart: both Pandle's chances get increased: 12.5% + 10% = 22.5%. And Undy's chance also: 22.1% + 10% = 32.1%. 

As the fight now ends these probabilities are applied for each yokai seperately. If you want to know the chance you will get Undy, it will just be the calculated 32.1%, because he has a higher difficulty. If however you want to calculate the chance of befriending Pandle in this example, the calculation becomes a bit more complicated. You have to calculate the probability that Undy will not get selected and at least one of the Pandles will:

$$P(U) = 0.321$$
$$P(P1) = 0.225$$
$$P(P2) = 0.225$$
$$P(P) = P((P1 \cup P2) \cap \neg U) = P(\neg U) * P(P1 \cup P2)$$
$$= (1 - P(U)) * (P(P1) + P(P2) - P(P1 \cap P2))$$
$$= (1 - 0.321) * (0.225 + 0.225 - 0.225*0.225)$$
$$= 0.271 = 27.1\\%$$

So the probability for befriending Pandle in this example will be 27.1%. 

### Other important notes
* Generally befriending a specific yokai becomes harder if you've already befirended them.
* It is impossible to befriend a yokai after a battle if you already befriended 6 of them.
* Sometimes it can be better to give the yokai a tier 4 non-favorite food instead of a tier 1 favorite food.
* If you get a golden whisp with 3 hearts, the yokai with the highest difficulty as last digit will always become your friend.
* If you are facing multiple of the same yokai, giving each of them seperately a food item and poking each of them seperately increases the odds of befriending them. 

## Modding opportunities
The befriend bonuses are all stored in the chara param file:
```
CHARA_FRIEND_RATE_INFO (
		BaseChance|False
		FoodTier1|False
		FoodTier2|False
		FoodTier3|False
		FoodTier4|False
		Popularity|False
		Unpopularity|False
		BlueWhisp|False
		GoldenWhisp|False
		BefriendPoke|False
		ShrineBonus|False
)
```
The value represents the percentage that gets added, multiplied by 100, i.e. 1000 means 10%. Except BaseChance where the value is the reciprocal of the base befriend probability, i.e. 8 means 1:8 means 12.5%.

Also there are two bitflags:
* `0x0CC4EC4E`: always 0% befriend probability
* `0xABCB4EE6`: always 100% befriend probability
