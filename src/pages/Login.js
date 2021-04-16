import React from 'react';

function Login() {
  return (
    <div className='login'>
       <form action="/game.html" method="post">
        <legend>Player X</legend>
        <fieldset>
            <div class="container">
                <label for="p1_uname"><b>Username</b></label>
                <input type="text" id="p1_uname" placeholder="Enter Player X Name" name="p1_uname" required />

                <label for="p1_email"><b>Email</b></label>
                <input type="email" id="p1_email" placeholder="Enter Player X Email" name="p1_email" required />
            </div>
        </fieldset>
        <legend>Player O</legend>
        <fieldset>
            <div class="container">
                <label for="p2_uname"><b>Username</b></label>
                <input type="text" id="p2_uname" placeholder="Enter Player O Name" name="p2_uname" required />

                <label for="p2_email"><b>Email</b></label>
                <input type="email" id="p2_email" placeholder="Enter Player O Email" name="p2_email" required />
            </div>
        </fieldset>
        <button type="submit">Play Game</button>
    </form>
    </div>
  );
}

export default Login;
