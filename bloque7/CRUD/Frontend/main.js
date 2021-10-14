let NewUserFormDataJSON= '';
let DelUserFormDataJSON= '';


let showUserTable = ( userTable ) =>
{
    let HTMLCode = `<table>`

    for ( let i=0; i<userTable.length; i++)
    {
        HTMLCode += `<tr>`;

        for (let j=0; j<userTable[i].length; j++)
        {
            HTMLCode += `<td>${userTable[i][j]}</td>`;
        }

        if ( i == 0 )
        {
            HTMLCode += `<td class='w3-center'>ACTIONS</td>`;
        }
        else
        {
            HTMLCode += `<td>
                        <button id="EditUserButton-${i}" class="w3-button w3-dark-grey">
                            EDIT
                        </button>
                        <button id="DelUserButton-${i}" class="w3-button w3-light-grey">
                            DELETE
                        </button>
                    </td>`;
        }

        HTMLCode += `</tr>` ;                                   
    }                       
                        
    HTMLCode += `</table>`;
    HTMLCode += `<button id="NewUserButton" class="w3-button w3-dark-grey">
                    NEW
                </button>`;
    return HTMLCode;
}

let onEditUserButtonClick = (event) =>
{
    alert('Iniciando ediciÃ³n del usuario...');
}

let DeleteUserRequest = (event) =>
{
    let connection = new XMLHttpRequest();

    connection.open('POST', '../Backend/user/delete.php');    
    connection.addEventListener('loadend', processUsersResponse );
    connection.send(DelUserFormDataJSON);

}

let onDeleteUserButtonClick = (event) =>
{
    id=[];
    console.log('Borrando usuario...' + event.currentTarget.id);
    id = event.currentTarget.id.split("-");
    
    //id [1]=Math.floor(id[1]); En caso de tener que pasarlo como number
    //console.log (typeof(id[1]));

    document.getElementById('DeleteUserModal').style.display='block';
    let CloseDelUserModal = (event) =>
    {
        document.getElementById('DeleteUserModal').style.display='none';
    }
    let SendDelUser = (event) =>
    {    
        let DelUserFormData ={};
        DelUserFormData.id = id[1];
        DelUserFormData.username = document.getElementById('userdel').value;
        DelUserFormData.password = document.getElementById('passdel').value;
     
        DelUserFormDataJSON = JSON.stringify(DelUserFormData);
        console.log(DelUserFormDataJSON);
        DeleteUserRequest();
        CloseDelUserModal();
    }
    document.getElementById('DeleteUserModalExit').addEventListener('click', CloseDelUserModal );
    document.getElementById('DelUserSend').addEventListener('click', SendDelUser);
}

let CreateUserRequest = (event) =>
{
    let connection = new XMLHttpRequest();

    connection.open('POST', '../Backend/user/new.php');    
    connection.addEventListener('loadend', processUsersResponse );
    connection.send(NewUserFormDataJSON);

}

let onNewUserButtonClick = (event) =>
{
    document.getElementById('NewUserModal').style.display='block';
    let CloseNewUserModal = (event) =>
    {
        document.getElementById('NewUserModal').style.display='none';
    }
    let SendNewUser = (event) =>
    {
        let NewUserFormData ={};
        NewUserFormData.username = document.getElementById('username').value;
        NewUserFormData.password = document.getElementById('pass').value;
        console.log(NewUserFormData);
        NewUserFormDataJSON = JSON.stringify(NewUserFormData);
        console.log(NewUserFormDataJSON);
        CreateUserRequest();
        CloseNewUserModal();
    }
    document.getElementById('NewUserModalExit').addEventListener('click', CloseNewUserModal );
    document.getElementById('NewUserSend').addEventListener('click', SendNewUser);
}

let processUsersResponse = ( event ) =>
{

    if ( event.currentTarget.status == 200 )
    {
        //1
        let serverResponse = event.currentTarget.responseText; //event.currentTarget trae el elemento que generó el evento, en este caso el objeto de la conexion.
                                                               //event.currentTarget.responseText trae la respuesta del servidor en formato texto (JSON en este caso).
        data = JSON.parse(serverResponse);//Desserealiza la respuesta del servidor(JSON-->Array en este caso) y la asigna a la vble data.

        //2
        let userTable = document.getElementById("userTable");
        userTable.innerHTML = showUserTable( data );

        //3
        document.getElementById('NewUserButton').addEventListener('click', onNewUserButtonClick);
        for( let i=1; i<data.length; i++)
        {
            document.getElementById('EditUserButton-'+data[i][0] ).addEventListener('click', onEditUserButtonClick );
            document.getElementById('DelUserButton-'+data[i][0] ).addEventListener('click', onDeleteUserButtonClick );
        }
    }
    else
    {
        alert("Hubo errores al procesar la solicitud.");
    }
}

let requestUsers = ( event ) =>
{
    let connection = new XMLHttpRequest();

    connection.open('GET', '../Backend/user/read.php');    
    connection.addEventListener('loadend', processUsersResponse );
    connection.send();
}

let initializeView = () =>
{
    /*1. Realizar las consultas y/o peticiones al servidor que sean necesarias
    Para poder presentar la informaciÃ²n inicial en la vista.*/
    requestUsers();
   
    //2. Invocar las funciones que dibujan la interfaz grÃ¡fica correspondiente a cada regiÃ³n/
   
    //3. Preparar toda la asociaciÃ³n de eventos de interacciÃ³n entre el usuario y la interfaz/

}
window.addEventListener('DOMContentLoaded', initializeView );

/*
El Siguiente comando permite visualizar la ventana modal según id:
    document.getElementById('NewUserModal').style.display='block';
    document.getElementById('EditUserModal').style.display='block';
    document.getElementById('DeleteUserModal').style.display='block';
    
El Siguiente comando permite ocultar la ventana modal según id:
    document.getElementById('NewUserModal').style.display='none';
    document.getElementById('EditUserModal').style.display='none';
    document.getElementById('DeleteUserModal').style.display='none';

El Siguiente comando permite ocultar la ventana modal con el x según id:
    document.getElementById('NewUserModalExit').style.display='none';
    document.getElementById('EditUserModalExit').style.display='none';
    document.getElementById('DeleteUserModalExit').style.display='none';
*/
