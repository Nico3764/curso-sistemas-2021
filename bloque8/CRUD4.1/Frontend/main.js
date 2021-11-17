let HTMLapplicationView = () =>
{
	let HTMLcode = `
		<nav class="w3-sidebar w3-bar-block w3-collapse w3-animate-left w3-card" style="z-index:3;width:190px;" id="mySidebar">
			<a class="w3-bar-item w3-button w3-border-bottom w3-large w3-center"><img src="./img/Img1.jpg" style="width:60%;"></a>
			<a id="closeSidebarButton" class="w3-bar-item w3-button w3-hide-large w3-large" >Close <i class="fa fa-remove"></i></a>
			<div class="w3-panel w3-theme w3-center w3-round-xlarge">
			  <p>HOME</p>
			</div>
			<a id="userModuleButton" class="w3-bar-item w3-button">Gestión de Usuarios</a>	
			<a id ='logoutBtn' class="w3-bar-item w3-button">Cerrar Secion</a>					 
		</nav>
		<div id="myOverlay" class="w3-overlay w3-hide-large w3-animate-opacity" style="cursor:pointer"></div>
			<div class="w3-main" style="margin-left:250px;">
				<div id="myTop" class="w3-container w3-top w3-theme w3-large">
			  <p><i id="openSidebarButton" class="fa fa-bars w3-button w3-teal w3-hide-large w3-xlarge"></i>
					<span id="myIntro" class="w3-hide">W3.CSS: Introduction</span></p>
			</div>
		</div>
		<header class="w3-container w3-theme w3-center w3-safety-green" style="padding:32px 32px">
				<h1 class="w3-xxxlarge ">Super App</h1>
		</header>` 
	return HTMLcode;
}

let loginModalView = () =>
{
	closeView('aplicationMain');
	openView('modalDialogView');
	authView.login('modalDialogView');	
}

let on_login =(data)=>
{
	console.log(data);
	let status = data[0];
	session_key = data[1];
	if (status == true && session_key != null)
	{
		sessionStorage.setItem('crud-session-key', session_key);
		alert ('acceso ok');
		closeView('modalDialogView');
		applicationView();
	}
	else
	{
		alert('Usuario y/o contraseña inválida')
	}
}

let on_logout = (data) =>
{	
		sessionStorage.removeItem('crud-session-key');
		alert ('desconexion ok');
		loginModalView();
}

let on_user_read = (data) =>
{


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
	document.getElementById('userModuleButton').addEventListener('click' , ()=>{ userModule.read(), openView('modalDialogView') } );
	document.getElementById('logoutBtn').addEventListener('click' ,  ()=>{ auth.logout(auth.getAuthData()) } );
}

showModalDialog = ( HTMLDialogFormElement, confirmAction, cancelAction ) =>
{
    let modalElement = document.getElementById('usermodalDialogView');
   
    modalElement.innerHTML =
    `<div class="w3-modal-content w3-animate-zoom">
        <header class="w3-container w3-teal"> 
        <span id="cancel" class="w3-button w3-display-topright">&times;</span>
    </header>
    ${ HTMLDialogFormElement.HTMLDialogView } 
        <button id="confirm">Accept</button> 
        </div>
    </div>`; 
                                                //HTMLDialogFormElement.HTMLDialogView es el código html generado en la function HTMLCreateFormUserDialog.
    let confirmButtonClick = (event) =>
    {
        if ( confirmAction != undefined || confirmAction != null )
        {
            console.log(HTMLDialogFormElement.formData())
            confirmAction(HTMLDialogFormElement.formData());
        }
        
        modalElement.style.display = 'none';
        modalElement.removeEventListener('click',confirmButtonClick);
        modalElement.removeEventListener('click',cancelButtonClick);
    }

    let cancelButtonClick = (event) =>
    {
        if ( cancelAction != undefined || cancelAction != null )
        {
            cancelAction(HTMLDialogFormElement.formData());
        }
                
        modalElement.style.display = 'none';
        modalElement.removeEventListener('click',confirmButtonClick);
        modalElement.removeEventListener('click',cancelButtonClick);
    }

    document.getElementById('confirm').addEventListener('click', confirmButtonClick );
    document.getElementById('cancel').addEventListener('click', cancelButtonClick );

    modalElement.style.display = 'block';
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
	 if ( auth.getAuthData() != null || auth.getAuthData() != undefined)
    {
        applicationView();;
    }
    else
    {
        loginModalView();
    }    
}

window.addEventListener('DOMContentLoaded', start );