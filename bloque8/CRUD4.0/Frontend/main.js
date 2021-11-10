let HTMLapplicationView = () =>
{
	let HTMLcode = `
		<nav class="w3-sidebar w3-bar-block w3-collapse w3-animate-left w3-card" style="z-index:3;width:250px;" id="mySidebar">
			<a class="w3-bar-item w3-button w3-border-bottom w3-large w3-center" href="#"><img src="./img/Img1.jpg" style="width:60%;"></a>
			<a id="closeSidebarButton" class="w3-bar-item w3-button w3-hide-large w3-large" >Close <i class="fa fa-remove"></i></a>
			<a class="w3-bar-item w3-button w3-teal" href="#">Home</a>
			<a id="userModuleButton" class="w3-bar-item w3-button" href="#">Gestión de Usuarios</a>	
			<button id ='logoutBtn' class="w3-button w3-block w3-green w3-section w3-padding">Cerrar Secion</button>					 
		</nav>
		<div id="myOverlay" class="w3-overlay w3-hide-large w3-animate-opacity" style="cursor:pointer"></div>
			<div class="w3-main" style="margin-left:250px;">
				<div id="myTop" class="w3-container w3-top w3-theme w3-large">
			  <p><i id="openSidebarButton" class="fa fa-bars w3-button w3-teal w3-hide-large w3-xlarge"></i>
					<span id="myIntro" class="w3-hide">W3.CSS: Introduction</span></p>
			</div>
		</div>
		<header class="w3-container w3-theme w3-center" style="padding:64px 32px">
				<h1 class="w3-xxxlarge">Super App</h1>
		</header>` 
	return HTMLcode;
}

let HTMLloginModalView =() =>
{
	
}

let loginModalView = () =>
{
	closeView('aplicationMain');
	openView('modalDialogView');
	authView.login('modalDialogView');	
}

let on_login =(status)=>
{
	console.log(status);
	if (status == 'true')
	{
		alert ('acceso ok');
		closeView('modalDialogView');
		applicationView();
	}
	else
	{
		alert('usuario y/o contraseña inválida')
	}
}

let applicationView = () =>
{
	closeView('modalDialogView');
	openView('aplicationMain');
	let dato = [[1,'root',1234],[2,'nico',1234], [3,'juan',567]];
	document.getElementById('aplicationMain').innerHTML = HTMLapplicationView();
	document.getElementById('myTop').addEventListener('click' , () => {openView('mySidebar')});
	document.getElementById('closeSidebarButton').addEventListener('click' , ()=>{closeView('mySidebar')});
	document.getElementById('myOverlay').addEventListener('click' , ()=>{closeView('mySidebar')});
	document.getElementById('userModuleButton').addEventListener('click' , ()=>{ userModule.UpdateView(dato) } );
	document.getElementById('logoutBtn').addEventListener('click' , () =>{loginModalView()});
}

let openView = (id) =>
{
  document.getElementById(id).style.display = "block";
}

let closeView = (id) =>
{
  document.getElementById(id).style.display = "none";
}
let nobackbutton = () =>
{
    window.location.hash="no-back-button";
    window.location.hash="Again-No-back-button"
    window.onhashchange=function(){window.location.hash="no-back-button";}
}

let start =() =>
{
    //applicationView();
    loginModalView();
    nobackbutton();
}

window.addEventListener('DOMContentLoaded', start );