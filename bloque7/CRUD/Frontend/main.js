let showUserTable = ( userTable ) =>
{
    let HTMLCode = `<table>`

    for ( let row=0; row<userTable.length; row++)
    {
        HTMLCode += `<tr>`;

        for (let column=0; column<userTable[row].length; column++)
        {
            HTMLCode += `<td>${userTable[row][column]}</td>`;
        }

        if ( row == 0 )
        {
            HTMLCode += `<td>actions</td>`;
        }
        else
        {
            HTMLCode += `<td>
                        <button onclick="document.getElementById('editUser-${userTable[row][0]}').style.display='block'" class="w3-button w3-dark-grey">
                            Editar
                        </button>
                        <button onclick="document.getElementById('deleteUser-${userTable[row][0]}').style.display='block'" class="w3-button w3-light-grey">
                            Borrar
                        </button>
                    </td>`;
        }

        HTMLCode += `</tr>` ;                                   
    }                       
                        
    HTMLCode += `</table>`;
    HTMLCode += `<button>new</button>`;
    for ( let row=0; row<userTable.length; row++)
    {
    HTMLCode +=`<div id='editUser-${userTable[row][0]}' class="w3-modal">
                    <div class="w3-modal-content w3-padding-32 w3-dark-grey">
                        <div class="w3-container">
                            <span onclick="document.getElementById('editUser-${userTable[row][0]}').style.display='none'"class="w3-button w3-dark-grey w3-padding-small w3-display-topright">&times;
                            </span>                            
                                <form class="w3-container w3-card-4 w3-light-grey" action="/action_page.php" method="GET">
                                <h2 class="w3-center" style='font-weight: bold'>EDITAR USUARIO</h2>
                                <label>Name*</label><br>
                                <input class="w3-input w3-border w3-round-large w3-text-grey" type="text" name="Name" value="enter new name"><br>
                                <label>Password*</label><br>
                                <input class="w3-input w3-border w3-round-large w3-text-grey" type="password" name="pass" value="enter new password"><br>
                                <input class='w3-margin-bottom' type="submit" value="Edit">	
                               </form>                           
                            </div>
                     </div>
                </div>`
    }
    for ( let row=0; row<userTable.length; row++)
    {
    HTMLCode +=` <div id='deleteUser-${userTable[row][0]}' class="w3-modal">
                    <div class="w3-modal-content w3-padding-32 w3-dark-grey">
                        <div class="w3-container">
                            <span onclick="document.getElementById('deleteUser-${userTable[row][0]}').style.display='none'"class="w3-button w3-dark-grey w3-padding-small w3-display-topright">&times;
                            </span>                            
                                <form class="w3-container w3-card-4 w3-light-grey" action="/action_page.php" method="GET">
                                <h2 class="w3-center" style='font-weight: bold'>BORRAR USER</h2>
                                <label>Nombre o id de Usuario</label><br>
                                <input class="w3-input w3-border w3-round-large w3-text-grey" type="text" name="Name" value="enter name or id"><br>
                                <label>Password*</label><br>
                                <input class="w3-input w3-border w3-round-large w3-text-grey" type="password" name="pass" value="enter new password"><br>
                                <input class='w3-margin-bottom' type="submit" value="DELETE"> 
                               </form>                           
                            </div>
                     </div>
                </div>`
    }
    return HTMLCode;
}

let onEditUserButtonClick = (event) =>
{
    alert('Iniciando ediciÃ³n del usuario...');
}

let onDeleteUserButtonClick = (event) =>
{
    alert('Borrando usuario...');
}

let processUsersResponse = ( event ) =>
{
    if ( event.currentTarget.status == 200 )
    {
        //1
        let serverResponse = event.currentTarget.responseText;
        data = JSON.parse(serverResponse);

        //2
        let userTable = document.getElementById("userTable");
        userTable.innerHTML = showUserTable( data );

        //3
        for( let row=1; row<data.length; row++)
        {
            document.getElementById('editUser-'+data[row][0] ).addEventListener('click', onEditUserButtonClick );
            document.getElementById('deleteUser-'+data[row][0] ).addEventListener('click', onDeleteUserButtonClick );
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

    connection.open('GET', './backend/server.php');

    connection.addEventListener('loadend', processUsersResponse );
    connection.send();
}
/*
let ShowModal = (event) =>
{
    console.log("Ingresa a la función");
    let modal = document.getElementById("ModalCont");
    modal.innerHTML += `<h1>Prueba Modal${event}}</h1>`;
    modal.innerHTML += `<div class="w3-modal-content">
      <div class="w3-container">
        <span onclick="document.getElementById("ModalCont").style.display='none'"
        class="w3-button w3-display-topright">&times;</span>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
      </div>`
}
*/
let initializeView = () =>
{
    /*1. Realizar las consultas y/o peticiones al servidor que sean necesarias
    Para poder presentar la informaciÃ²n inicial en la vista.*/
    //requestUsers();
    let response = 
    [
        ["id", "username", "password"],
        [1, "root", "123456"],
        [2, "juan", "re78934"],
        [3, "lorena", "******"],
        [4, "ariel", "aka8932j"],
        [5, "florencia", "jhsqnf6"],
        [6, "nicolas", "99os9si"]
    ];
    document.getElementById("userTable").innerHTML=showUserTable(response);
    showUserTable(response);
    /*2. Invocar las funciones que dibujan la interfaz grÃ¡fica correspondiente a cada regiÃ³n*/
   
    /*3. Preparar toda la asociaciÃ³n de eventos de interacciÃ³n entre el usuario y la interfaz*/

}
/*
let ExpectClick = () =>
{
    let editButton1 = document.getElementById("editUser-1");
    editButton1.addEventListener("click", ShowModal);
}*/
window.addEventListener('DOMContentLoaded', initializeView );
//window.addEventListener('DOMContentLoaded', ExpectClick );

