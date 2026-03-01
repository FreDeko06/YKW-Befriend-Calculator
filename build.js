
let tableData = `
			<td>
				<table cellpadding="10px">
					<tr>
						<th>
							Yokai Name
						</th>
						<th>
							Difficulty Id
						</th>
					</tr>
					<tr>
						<td align="center">
							<input id="yk_name_%I" placeholder="Yokai Name" list="yks" oninput="calculate(true, true)"  />
							<br />
							<input id="yk_count_%I" type="number" placeholder="Befriend Count" oninput="calculate(true)" />
						</td>
						<td>
							<input id="bef_id_%I" type="number" placeholder="Difficulty" oninput="calculate()" />
							<br />
							<input id="calc_bef_id_%I" type="button" value="Calculate Difficulty" onclick="calcDiff(%I)" />
						</td>
					</tr>
				</table>
							<input id="food_%I_0" type="radio" name="food_%I" onclick="calculate()" checked />
							<label for="food_%I_0">No food</label>
							<br />
							<input id="food_%I_1" type="radio" name="food_%I" onclick="calculate()" />
							<label for="food_%I_1">Food Tier 1</label>
							<br />
							<input id="food_%I_2" type="radio" name="food_%I" onclick="calculate()" />
							<label for="food_%I_2">Food Tier 2</label>
							<br />
							<input id="food_%I_3" type="radio" name="food_%I" onclick="calculate()" />
							<label for="food_%I_3">Food Tier 3</label>
							<br />
							<input id="food_%I_4" type="radio" name="food_%I" onclick="calculate()" />
							<label for="food_%I_4">Food Tier 4</label>
							<br />
							<br />
							<input type="radio" id="fav_food_%I" name="food_type_%I" onclick="calculate()" />
							<label for="fav_food_%I">Favorite food</label>
							<br />
							<input type="radio" id="normal_food_%I" name="food_type_%I" onclick="calculate()" checked />
							<label for="normal_food_%I">Normal food</label>
							<br />
							<input type="radio" id="hat_food_%I" name="food_type_%I" onclick="calculate()" />
							<label for="hat_food_%I">Hated food</label>
							<br />
							<input type="checkbox" id="poke_%I" onclick="calculate()" />
							<label for="poke_%I">Befriend poke</label>
			</td>
`;


let fullHTML = `
	<table>
		<tr>
			<th>Yokai 1</th>
			<th>Yokai 2</th>
			<th>Yokai 3</th>
		</tr>
		<tr>
`;
for (let i = 1; i <= 3; i++) {
	fullHTML += tableData.replaceAll("%I", i);
}
fullHTML += `</tr>
	<tr>
		<td>
			<h3 id="result_1">Partial Probability: 0.00%</h3>
		</td>
		<td>
			<h3 id="result_2">Partial Probability: 0.00%<h3>
		</td>
		<td>
			<h3 id="result_3">Partial Probability: 0.00%</h3>
		</td>
	</tr>
	</table>`;

document.getElementById("data").innerHTML = fullHTML;


