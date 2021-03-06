let auth =
{
    username: null,
    password:null

}

let read = (data) =>
{
    data ={};
    data.auth=auth;
    let connection = new XMLHttpRequest();

    connection.open('POST', '../Backend/user/read.php');

    connection.addEventListener('loadend', event =>{ processServerResponse(event, 'read') } );
    connection.send(JSON.stringify(data));
}

let create = (data) =>
{
    data.auth = auth;
    let connection = new XMLHttpRequest();

    connection.open('POST', '../Backend/user/create.php');

    connection.addEventListener('loadend', event =>{ processServerResponse(event, 'create') } );
    connection.send( JSON.stringify(data) );
}

let edit = ( data ) =>
{
    data.auth = auth;
    let connection = new XMLHttpRequest();

    connection.open('POST', '../Backend/user/edit.php');

    connection.addEventListener('loadend', event =>{ processServerResponse(event, 'edit') } );
    connection.send( JSON.stringify(data) );
}

let remove = (data) =>
{
    data.auth = auth;
    let connection = new XMLHttpRequest();

    connection.open('POST', '../Backend/user/remove.php');

    connection.addEventListener('loadend', event =>{ processServerResponse(event, 'remove') } );
    connection.send( JSON.stringify(data) );
}

let login = (data) =>
{
    auth.username = data.username;
    auth.password = data.password;

    data.auth = auth;

    let connection = new XMLHttpRequest();

    connection.open('POST', '../Backend/auth/login.php');

    connection.addEventListener('loadend', event =>{ processServerResponse(event, 'login') } );
    connection.send( JSON.stringify(data) );
}

let HTMLUserTable = ( data ) =>
{
    let HTMLCode = `<table class="w3-table-all w3-centered" style='width:40%'>`


    HTMLCode += `<tr>
                        <td class='w3-center'>ID</td>
                        <td class='w3-center'>USERNAME</td>
                        <td class='w3-center'>PASSWORD</td>
                        <td class='w3-center'>ACTIONS</td>
                </tr>`
    for ( let row=0; row<data.length; row++)
    {
        HTMLCode += `<tr id='${data[row][0]}'>`;

        for (let column=0; column<data[row].length; column++)
        {
            HTMLCode += `<td>${data[row][column]}</td>`;
        }

            HTMLCode += `<td>
                        <button name="edit" class="w3-button w3-amber w3-round-large">Editar</button>
                        <button name="remove" class="w3-button w3-2021-mint w3-round-large">Borrar</button>
                    </td>`;

        HTMLCode += `</tr>` ;                                   
    }                       
                        
    HTMLCode += `</table>`;
    HTMLCode += `<div class="w3-container" style="width:60%">
                    <div class="w3-half">
                        <button name="create" class="w3-button w3-2020-flame-scarlet w3-round-large w3-margin-top">NEW USER</button>
                    </div>
                    <div class="w3-half">
                        <button name="logout" class="w3-button w3-2021-mint w3-round-large w3-margin-top">LOGOUT</button>
                    </div>
                 </div>`
    return HTMLCode;
}

let HTMLCreateFormUserDialog = () =>
{
    let HTMLCode =
        ` <div class="w3-container w3-card-4 w3-light-grey w3-padding-16">           
            <h2 class="w3-center" style='font-weight: bold'>NUEVO USUARIO</h2>
            <div class="w3-half">
                <label>Name*</label><br>
                <input id ='username' class="w3-input w3-border w3-round-large w3-text-grey" type="text" name="Name" value="enter new name"><br>
            </div>
            <div class="w3-half">
                <label>Password*</label><br>
                <input id ='password' class="w3-input w3-border w3-round-large w3-text-grey" type="password" name="pass" value="enter new password"><br>
            </div>
        `;

    let getFormData = () =>
    {
        let data =
        {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        }

        return data;
    }
 
    let dialog =
    {
        HTMLDialogView: HTMLCode,
        formData: getFormData
    }

    return dialog;
}

let HTMLEditFormUserDialog = (id) =>
{
    let element = document.getElementById(id);

    let HTMLCode =
    `<div class="w3-container w3-card-4 w3-light-grey w3-padding-16">
        <h2 class="w3-center" style='font-weight: bold'>Edit User ID=${element.childNodes[0].innerText }</h2>
        <div class="w3-half">
            <label>Name*</label><br>
            <input id ='username' class="w3-input w3-border w3-round-large w3-text-grey" type="text" name="Name" value="${element.childNodes[1].innerText }"><br>
        </div>
        <div class="w3-half">
            <label>Password*</label><br>
            <input id ='password' class="w3-input w3-border w3-round-large w3-text-grey" type="password" name="pass" value="${element.childNodes[2].innerText }"><br>
        </div>
    `;

    let getFormData = () =>
    {
        let data =
        {
            id: element.childNodes[0].innerText,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        }

        return data;
    }
 
    let dialog =
    {
        HTMLDialogView: HTMLCode,
        formData: getFormData
    }

    return dialog;
}

let HTMLRemoveFormUserDialog = (id) =>
{
    let element = document.getElementById(id);

    let HTMLCode =
    `<div class="w3-container w3-card-4 w3-light-grey w3-padding-16">
        <p class="w3-wide w3-center w3-xlarge w3-red w3-padding-32 w3-round-xlarge ">BORRAR USER: ${element.childNodes[1].innerText }, ID: ${element.childNodes[0].innerText } </p>`;

    let getFormData = () =>
    {
        let data =
        {
            id: element.childNodes[0].innerText,
            username: element.childNodes[1].innerText,
            password: element.childNodes[2].innerText
        }

        return data;
    }
 
    let dialog =
    {
        HTMLDialogView: HTMLCode,
        formData: getFormData
    }

    return dialog;
}
let HTMLLoginFormUserDialog = () =>
{
    let HTMLCode =
        ` <div class="w3-container w3-card-4 w3-light-grey w3-padding-16">
            <h2 class="w3-center" style='font-weight: bold'>LOGIN FOR USER & PASSWORD</h2>
            <label>Name*</label><br>
            <input id ='username' class="w3-input w3-border w3-round-large w3-text-grey" type="text" name="Name" value=""><br>
            <label>Password*</label><br>
            <input id ='password' class="w3-input w3-border w3-round-large w3-text-grey" type="password" name="pass" value=""><br>
        `;

    let getFormData = () =>
    {
        let data =
        {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        }

        return data;
    }
 
    let dialog =
    {
        HTMLDialogView: HTMLCode,
        formData: getFormData
    }

    return dialog;
}

let showModalDialog = ( HTMLDialogFormElement, confirmAction, cancelAction ) =>
{
    let modalElement = document.getElementById('modalDialogView');
    console.log('el html del modal es: '+HTMLDialogFormElement.HTMLDialogView)
   
    modalElement.innerHTML =
    `<div class="w3-modal-content w3-animate-zoom">
        <header class="w3-container w3-teal"> 
        <span id="cancel" class="w3-button w3-display-topright">&times;</span>
    </header>
    ${ HTMLDialogFormElement.HTMLDialogView } 
        <button id="confirm">Accept</button> 
        </div>
    </div>`; 
                                                //HTMLDialogFormElement.HTMLDialogView es el c??digo html generado en la function HTMLCreateFormUserDialog.
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


let processActionButtonClickEvents=(event) =>
{
    let element = event.target; //me trae el elemento que gener?? el evento.
    let actionName = element.name;//me trae el atributo 'name' del elemento que gener?? el evento.
    let elementId = element.parentElement.parentElement.id;//me trae el id de la fila.

    switch (actionName)
    {
        case 'create':
            let createDialog = HTMLCreateFormUserDialog(); //la funci??n HTMLCreateFormUserDialog() devuelve un objet con el html de la ventana modal y los valores de user y pass.
            console.log('create request action for new server id');
            showModalDialog(createDialog, create, null ); //llama a la funci??n que muestra/oculta la ventana modal y le env??a por parametros la vble createDialog y la funci??n create.
        break;

        case 'edit':
            let editDialog = HTMLEditFormUserDialog(elementId);
            console.log('edit request action for data id='+elementId);
            showModalDialog(editDialog, edit, null ); //llama a la funci??n que muestra/oculta la ventana modal y le env??a por parametros la vble createDialog y la funci??n edit.
        break;

        case 'remove':
            let removeDialog = HTMLRemoveFormUserDialog(elementId);
            console.log('remove request action for data id='+elementId);
            showModalDialog(removeDialog, remove, null ); //llama a la funci??n que muestra/oculta la ventana modal y le env??a por parametros la vble createDialog y la funci??n remove.
        break;

        case 'logout':
            alert('Logout request action'); 
            auth = {username: null, password:null};
            let viewElement = document.getElementById('userTable');
            viewElement.innerHTML = '';
            start();                                          
        break;

        default:
    }
}


let UpdateView=(data) =>
{
    
    let viewElement = document.getElementById('userTable');
    viewElement.removeEventListener('click', processActionButtonClickEvents);

    viewElement.innerHTML = HTMLUserTable( data ); //Inserta el codigo HTML genegado por la funci??n HTMLUserTable a la que le paso por par??metro la tabla (data). 

    viewElement.addEventListener('click', processActionButtonClickEvents ); //asocia el detector de eventos (addEventListener al evento'click') sobre el objeto viewElement
                                                                            //que esta sociado (document.getElementById("userTable")) al elemento con id ="userTable      
}                                                                           //disparando la funci??n processActionButtonClickEvents. 

                                                                                
let processServerResponse = (event, name) =>
{
    if ( event.currentTarget.status == 200 )
    {
    
        switch (name)
        {
            case 'read':

                let serverResponse = event.currentTarget.responseText; //event.currentTarget trae el elemento que gener?? el evento, en este caso el objeto de la conexion.
                                                               //event.currentTarget.responseText trae la respuesta del servidor en formato texto (JSON en este caso).
                data = JSON.parse(serverResponse);//Desserealiza la respuesta del servidor(JSON-->Array en este caso) y la asigna a la vble data.
                UpdateView(data);
            break;
            case 'create':
                UpdateView(data);
                read();
            break;
            case 'edit':
                UpdateView(data);
                read();
            break;
            case 'remove':
                UpdateView(data);
                read();
            break;
            case 'login':
            {
                let serverResponse = event.currentTarget.responseText;
                data = JSON.parse(serverResponse)       
                
                if ( data == true )
                    welcome();
                else
                {
                    alert('Usuario y/o contrase??a inv??lida');
                    let loginDialog = HTMLLoginFormUserDialog();
                    showModalDialog( loginDialog, login, null );
                }
            };

            default:
        }
    }
    else
    {
        alert("Hubo errores al procesar la solicitud.");
    }
}
let nobackbutton = () =>
{
   window.location.hash="no-back-button";
   window.location.hash="Again-No-back-button"
   window.onhashchange=function(){window.location.hash="no-back-button";}
}

let welcome = () =>
{
    read();
    nobackbutton();
    //Bloquear el bot??n atras (C??digo del DOM)
}


let start =() =>
{
    let loginDialog = HTMLLoginFormUserDialog();
    showModalDialog( loginDialog, login, null );
}

window.addEventListener('DOMContentLoaded', start );
