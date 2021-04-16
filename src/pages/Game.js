import React from 'react';

function Game() {
  const script = document.createElement("script");
  script.src = 'src/script.js';
  script.async = true;

  document.body.appendChild(script);
  return (
    <div className='game'>
      <form action="#" method="get">
		<legend>Tic Tak Toe</legend>
		<fieldset>
			<input type="button" style="height: 20px; width: 20px; vertical-align: top;	margin: 10px; padding: 40px; font-size: 22px;" id="btn1" data-currentIndex="0" value="" data-isValueSet="0" />
			<input type="button" style="height: 20px; width: 20px; vertical-align: top;	margin: 10px; padding: 40px; font-size: 22px;" id="btn2" data-currentIndex="1" value="" data-isValueSet="0" />
			<input type="button" style="height: 20px; width: 20px; vertical-align: top;	margin: 10px; padding: 40px; font-size: 22px;" id="btn3" data-currentIndex="2" value="" data-isValueSet="0" /><br/>
			<input type="button" style="height: 20px; width: 20px; vertical-align: top;	margin: 10px; padding: 40px; font-size: 22px;" id="btn4" data-currentIndex="3" value="" data-isValueSet="0" />
			<input type="button" style="height: 20px; width: 20px; vertical-align: top;	margin: 10px; padding: 40px; font-size: 22px;" id="btn5" data-currentIndex="4" value="" data-isValueSet="0" />
			<input type="button" style="height: 20px; width: 20px; vertical-align: top;	margin: 10px; padding: 40px; font-size: 22px;" id="btn6" data-currentIndex="5" value="" data-isValueSet="0" /><br/>
			<input type="button" style="height: 20px; width: 20px; vertical-align: top;	margin: 10px; padding: 40px; font-size: 22px;" id="btn7" data-currentIndex="6" value="" data-isValueSet="0" />
			<input type="button" style="height: 20px; width: 20px; vertical-align: top;	margin: 10px; padding: 40px; font-size: 22px;" id="btn8" data-currentIndex="7" value="" data-isValueSet="0" />
			<input type="button" style="height: 20px; width: 20px; vertical-align: top;	margin: 10px; padding: 40px; font-size: 22px;" id="btn9" data-currentIndex="8" value="" data-isValueSet="0" /><br/>
		</fieldset>
	</form>
	<div id="result"></div>
	<button type="button" onClick="refreshPage()">Reset Game</button>
    </div>
  );
}

export default Game;
