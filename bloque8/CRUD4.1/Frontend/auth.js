
let auth = 
{
			//Peticiones al servidor
				login: ( user, password ) =>
				{
					let data =
					{
						hash: auth.hashCode(user+password)
					};
					console.log('en el login se envía: ' + data.hash);

					let connection = new XMLHttpRequest();
					let status = false;	
			        connection.open('POST', '../Backend/auth/login.php');

			        connection.addEventListener('loadend', () => {
			        	status= JSON.parse(connection.responseText);
			        	on_login(status)} );
			        
			        connection.send( JSON.stringify(data) );
				},

				logout: ( data ) =>
				{
					let connection = new XMLHttpRequest();

			        connection.open('POST', '../Backend/auth/logout.php');

			        connection.addEventListener('loadend', () => {
			        	status= JSON.parse(connection.responseText);
			        	on_logout(status)} );

			        connection.send( JSON.stringify(data) );
				},

				getAuthData: () =>
				{
					let session= sessionStorage.getItem('crud-session-key');
					return session;
				},
				hashCode : (s) =>
				{
					return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);
					return a&a},0);      					
				} 			

}


let authView =
{
	login: (id) =>
	{
		let HTMLcode = `
			    <div class="w3-modal-content w3-card-4 w3-animate-zoom" style="width:30%">
			      <div class="w3-center"><br>
			        <img src="./img/img_avatar4.png" alt="Avatar" style="width:40%" class="w3-circle w3-margin-top">
			      </div>
			      	<div class='w3-padding'>
				        <div class="w3-section">
				          <label><b>Username</b></label>
				          <input id ='loginUserName' class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Enter Username" name="usrname" required>
				          <label><b>Password</b></label>
				          <input id ='loginPassword'class="w3-input w3-border" type="text" placeholder="Enter Password" name="psw" required>
				          <button id ='loginBtn' class="w3-button w3-block w3-theme w3-section w3-padding">Login</button>          
			    </div>`

		document.getElementById(id).innerHTML = HTMLcode;
		document.getElementById('loginBtn').addEventListener('click' , () =>
		{
			let username = document.getElementById('loginUserName').value;
			let password = document.getElementById('loginPassword').value;

			auth.login(username,password);

		});
		let input = document.getElementById("loginPassword");
		input.addEventListener("keyup", (event) =>
		{
			if (event.keyCode === 13) 
			{
		   		event.preventDefault();
		   		document.getElementById("loginBtn").click();
			}
		});	

	}

}