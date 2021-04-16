var isFinishGame = false;
		var isFirstPlayerTurn = true;
		const winningConditions = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];

		let play = function () {
			let dataIsValueSet = parseInt(this.getAttribute("data-isValueSet"));
			if (dataIsValueSet == 0) {
				this.setAttribute("data-isValueSet", "1");
				let currentPlayer = "O";
				if (isFirstPlayerTurn) {
					currentPlayer = "X";
				}
				this.setAttribute("value", currentPlayer);
				isFirstPlayerTurn = !(isFirstPlayerTurn);
				let currentIndex = parseInt(this.getAttribute("data-currentIndex"));
				let isPlayerWin = checkGameStatus(currentPlayer);
				if (isPlayerWin) {
					document.getElementById('result').innerHTML = currentPlayer + " win the match";
					var xhttp = new XMLHttpRequest();
					xhttp.open("POST", "matchStatus", true);
					xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xhttp.send("player=" + currentPlayer);
					console.log("player=>", currentPlayer);
					let classes = document.querySelectorAll('.btn');
					classes.forEach(btn => {
						btn.removeEventListener("click", play);
					})
				} else {
					let classes = document.querySelectorAll('.btn');
					let matchDrawn = true;
					for (let i = 0; i < classes.length; i++) {
						let checkButtonClicked = parseInt(classes[i].getAttribute("data-isValueSet"));
						if (checkButtonClicked == 0) {
							matchDrawn = false;
							break;
						}
					}
					if (matchDrawn) {
						document.getElementById('result').innerHTML = "Match has been drawn, Please try again with click on reset game";
						classes.forEach(btn => {
							btn.removeEventListener("click", play);
						})
					}

				}
			}
		}

		let checkGameStatus = function (currentPlayer) {
			let matchStatus = false;
			for (let i = 0; i < winningConditions.length; i++) {
				let val = winningConditions[i];
				let lastVal = document.getElementById('btn' + (val[0] + 1)).value;
				let valueMatch = true;
				for (let j = 1; j < val.length; j++) {
					let innerVal = val[j];
					let currentVal = document.getElementById('btn' + (innerVal + 1)).value;
					console.log(currentVal, "!=", lastVal);
					if (currentVal == "" || currentVal != lastVal) {
						valueMatch = false;
						break;
					}
				}
				if (valueMatch) {
					matchStatus = true;
					break;
				}
			}
			return matchStatus;
		}
		let classes = document.querySelectorAll('.btn');
		classes.forEach(btn => {
			btn.addEventListener("click", play);
		})
		function refreshPage() {
			window.location.replace("/form.html");
		} 