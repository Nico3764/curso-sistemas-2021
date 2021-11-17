

let userModule =
{

    read : (data) =>
    {
        data ={};
        data.auth=auth.getAuthData();
        console.log(data.auth);
        let connection = new XMLHttpRequest();

        connection.open('POST', '../Backend/user/read.php');

        connection.addEventListener('loadend', event =>{ userModule.processServerResponse(event, 'read') });
        connection.send(JSON.stringify(data));
    },

    create : (data) =>
    {
        data.auth=auth.getAuthData();
        data.hash= auth.hashCode(data.username+data.password);
        let connection = new XMLHttpRequest();

        connection.open('POST', '../Backend/user/create.php');

        connection.addEventListener('loadend', event =>{ userModule.processServerResponse(event, 'create') } );
        connection.send( JSON.stringify(data) );
    },

    edit : ( data ) =>
    {
        data.auth=auth.getAuthData();
        data.hash= auth.hashCode(data.username+data.password);
        let connection = new XMLHttpRequest();

        connection.open('POST', '../Backend/user/edit.php');

        connection.addEventListener('loadend', event =>{ userModule.processServerResponse(event, 'edit') } );
        connection.send( JSON.stringify(data) );
    },

    remove : (data) =>
    {
        data.auth=auth.getAuthData();
        let connection = new XMLHttpRequest();

        connection.open('POST', '../Backend/user/remove.php');

        connection.addEventListener('loadend', event =>{ userModule.processServerResponse(event, 'remove') } );
        connection.send( JSON.stringify(data) );
    },    

    HTMLUserTable : ( data ) =>
    {
        let HTMLCode = `<table class="w3-table-all w3-centered w3-margin-top izq" style='width:60%'>`


        HTMLCode += `<tr>
                            <td class='w3-center'>ID</td>
                            <td class='w3-center'>USERNAME</td>
                            <td class='w3-center'>PASSWORD</td>
                            <td class='w3-center'>SESSION-Key</td>
                            <td class='w3-center'>Hash-Key</td>
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
                            <button name="remove" class="w3-button w3-red w3-round-large">Borrar</button>
                        </td>`;

            HTMLCode += `</tr>` ;                                   
        }                       
                            
        HTMLCode += `</table>`;
        HTMLCode += `<div class="w3-container w3-margin-top izq" style="width:60%">
                        <div class="w3-half">
                            <button name="create" class="w3-button w3-theme w3-round-large w3-left">NEW USER</button>
                        </div>
                        <div class="w3-half">
                            <button name="logout" class="w3-button w3-grey w3-round-large w3-right">LOGOUT</button>
                        </div>
                     </div>`
        return HTMLCode;
    },

    HTMLCreateFormUserDialog : () =>
    {
        let HTMLCode =
            ` <div class="w3-container w3-card-4 w3-light-grey w3-padding-16">           
                <h2 class="w3-center" style='font-weight: bold'>NUEVO USUARIO</h2>
                <div class="w3-half">
                    <label>Name*</label><br>
                    <input id ='username' class="w3-input w3-border w3-round-large w3-text-grey" type="text" placeholder="Enter Username" name="usrname" required><br>
                </div>
                <div class="w3-half">
                    <label>Password*</label><br>
                    <input id ='password' class="w3-input w3-border w3-round-large w3-text-grey" type="text"  placeholder="enter new password" name="pass" required><br>
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
    },

    HTMLEditFormUserDialog : (id) =>
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
    },

    HTMLRemoveFormUserDialog : (id) =>
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
    },

    processActionButtonClickEvents : (event) =>
    {
        let element = event.target;//me trae el elemento que generó el evento.
        let actionName = element.name;//me trae el atributo 'name' del elemento que generó el evento.
        let elementId = element.parentElement.parentElement.id;//me trae el id de la fila.

        switch (actionName)
        {
            case 'create':
                let createDialog = userModule.HTMLCreateFormUserDialog(); //la función HTMLCreateFormUserDialog() devuelve un objet con el html de la ventana modal y los valores de user y pass.
                console.log('create request action for new server id');
                showModalDialog(createDialog, userModule.create, null ); //llama a la función que muestra/oculta la ventana modal y le envía por parametros la vble createDialog y la función create.
            break;

            case 'edit':
                let editDialog = userModule.HTMLEditFormUserDialog(elementId);
                console.log('edit request action for data id='+elementId);
                showModalDialog(editDialog, userModule.edit, null ); //llama a la función que muestra/oculta la ventana modal y le envía por parametros la vble createDialog y la función edit.
            break;

            case 'remove':
                let removeDialog = userModule.HTMLRemoveFormUserDialog(elementId);
                console.log('remove request action for data id='+elementId);
                showModalDialog(removeDialog, userModule.remove, null ); //llama a la función que muestra/oculta la ventana modal y le envía por parametros la vble createDialog y la función remove.
            break;

            case 'logout':
                alert('Logout request action'); 
                let viewElement = document.getElementById('modalDialogView');
                viewElement.innerHTML = '';
                auth.logout(auth.getAuthData());             
            break;

            default:
        }
    },


    UpdateView : (data) =>
    {
        
        let viewElement = document.getElementById('modalDialogView');
        viewElement.removeEventListener('click', userModule.processActionButtonClickEvents);
        console.log(data);
        //Insert HTML Code inside Element
        if ( Array.isArray(data) )
            viewElement.innerHTML = userModule.HTMLUserTable( data ); //Inserta el codigo HTML genegado por la función HTMLUserTable a la que le paso por parámetro la tabla (data). 
        else
            viewElement.innerHTML = userModule.HTMLUserTable( [] )

        viewElement.addEventListener('click', userModule.processActionButtonClickEvents ); //asocia el detector de eventos (addEventListener al evento'click') sobre el objeto viewElement
                                                                                //que esta sociado (document.getElementById("userTable")) al elemento con id ="userTable      
    },                                                                           //disparando la función processActionButtonClickEvents. 

                                                                                    
    processServerResponse : (event, name) =>
    {
        if ( event.currentTarget.status == 200 )
        {

        
            switch (name)
            {
                case 'read':

                    let serverResponse = event.currentTarget.responseText; //event.currentTarget trae el elemento que generó el evento, en este caso el objeto de la conexion.
                                                                   //event.currentTarget.responseText trae la respuesta del servidor en formato texto (JSON en este caso).
                    data = JSON.parse(serverResponse);//Desserealiza la respuesta del servidor(JSON-->Array en este caso) y la asigna a la vble data.
                
                    userModule.UpdateView(data);
                break;
                case 'create':
                    userModule.UpdateView(data);
                    userModule.read();
                break;
                case 'edit':
                    userModule.UpdateView(data);
                    userModule.read();
                break;
                case 'remove':
                    userModule.UpdateView(data);
                    userModule.read();
                break;               

                default:
            }
        }
        else
        {
            alert("Hubo errores al procesar la solicitud.");
        }
    }    
}
