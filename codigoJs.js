    //DATOS
const marcas = [
    { id: "0", marca: 'Adidas Boost', precio: 22000, color: "Negro", img:"./Assets/adidasFoto.jpg"},
    { id: "1", marca: 'Nike Air', precio: 21000, color: "Blanco", img:"./Assets/nikeFoto.jpg"},
    { id: "2", marca: 'Puma RS', precio: 19000, color: "Rosa", img:"./Assets/pumaFoto.jpg"},
    { id: "3", marca: 'New Balance 550', precio: 19500, color: "Amarillo", img:"./Assets/newbalanceFoto.jpg"},
    { id: "4", marca: 'Fila Tracker', precio: 18500, color: "Verde", img:"./Assets/filaFoto.jpg"},
    { id: "5", marca: 'Converse Chuck Taylor', precio: 17000, color: "Negro", img:"./Assets/converseFoto.jpg"},
    { id: "6", marca: 'Nike Air Force 1 High', precio: 23000, color: "Blanco", img:"./Assets/nikeFoto2.jpg"},]
    
const usuarios = [
        {nombre:"Ramiro", clave:"12345",status:"admin"},
        {nombre:"Agos", clave:"12345",status:"admin"},
    ]

    // NODOS
    const container = document.getElementById("container")
    const contenedorCarrito = document.getElementById("contenedorCarrito")
    const botonCarrito = document.getElementById("btnCarrito")
    const contenedorLoginRegister = document.getElementById("loginRegister");
    const contenedorLogin = document.getElementById('login');
    const contenedorRegister = document.getElementById("register");
    const inputUsuario = document.getElementById('usuario');
    const inputUsuarioRegister = document.getElementById("usuarioRegister");
    const inputClave = document.getElementById('clave');
    const inputClaveRegister = document.getElementById("claveRegister");
    const inputClaveConfirm = document.getElementById("claveConfirm");
    const btnLogin = document.getElementById('btnLogin');
    const btnRegister = document.getElementById("btnRegister");
    const errorLogin = document.getElementById('errorLogin');
    const errorRegister = document.getElementById("errorRegister");
    const btnCerrar = document.getElementById("btnClose");
    const fondoLogReg = document.getElementById("fondoLogReg");
    const botonCerrarCarrito = document.getElementById('botonCerrarCarrito');
    let carrito = []
    // Logica

    if (!localStorage.getItem('marcas')) localStorage.setItem('marcas', JSON.stringify(marcas));
    if (!localStorage.getItem('usuarios')) localStorage.setItem('usuarios', JSON.stringify(usuarios));

    const renderizarTienda = (objetosMarcas) => {
      container.innerHTML = '';
    
    for (const marca of marcas) {
      const cartaUno = document.createElement("div");
      const botonComprar = document.createElement("button");
      cartaUno.className = "productosCartas__Uno";
      const precio = `<h3>$${marca.precio}</h3>`;
      const img = `<img src=${marca.img}>`;
      botonComprar.className = "btn btn-primary";
      botonComprar.append("Comprar");
      botonComprar.id = `${marca.id}`;
      cartaUno.innerHTML = img;
      cartaUno.innerHTML += `<h2> ${ marca.marca } </h2>`;
      cartaUno.innerHTML += precio;
    
      botonComprar.onclick = () => {
          const productoComprado = marcas.find(marca => marca.id === botonComprar.id);
    
          carrito.push({ nombre: productoComprado.marca, precio: productoComprado.precio });
    
          localStorage.setItem("carrito", JSON.stringify(carrito));
    
          Swal.fire(
            'Confirmado',
            'Agregado al carrito correctamente!',
            'success'
          )

          mostrarCarrito()
        }
    
      container.append(cartaUno)
      cartaUno.append(botonComprar)
    }
    }
    
    const registro = () => { 
      const usuariosLogueados = JSON.parse(localStorage.getItem('usuarios'))
      let busquedaUserLog = usuariosLogueados.find(usuario => usuario.nombre === inputUsuarioRegister.value)

       if (busquedaUserLog != undefined) {
        errorRegister.innerHTML = "";
        errorRegister.append('El usuario ya existe');
      } if (inputClaveRegister.value != inputClaveConfirm.value) {
          errorRegister.innerHTML = "";
          errorRegister.append('Las contraseñas no coinciden');
      } else if (busquedaUserLog === undefined) {
        errorRegister.innerHTML = "";
         Swal.fire(
           'Confirmado',
           '¡Se a registrado correctamente!',
           'success',
           )
           const registroNuevo = usuarios.push ({nombre: inputUsuarioRegister.value, clave: inputClaveRegister.value, status: "comun"});
           localStorage.setItem('usuarios', JSON.stringify(usuarios));
         }
      }


      const validaCampos = () => {
        
        const valorClaveRegister = inputClaveRegister.value

       if (!inputUsuarioRegister.value || !inputClaveRegister.value || !inputClaveConfirm.value) {
        errorRegister.innerHTML = "";
        errorRegister.append('CAMPO VACÍO');
       } else if (valorClaveRegister.length < 5) {
        errorRegister.innerHTML = "";
        errorRegister.append('Debe tener 5 caracteres como mínimo!');
       } else {
         registro()
       }
      }

    btnRegister.onclick = validaCampos;

const login = () => {

    const usuarioLogueado = usuarios.find(usuario => usuario.nombre === inputUsuario.value)
  
    if (!usuarioLogueado) {
      errorLogin.innerHTML = ""
      Swal.fire(
        'Error!',
        'El usuario es incorrecto!',
        'error'
      )
    } else {
  
      if (usuarioLogueado.clave === inputClave.value) {
        
        loginCorrecto(usuarioLogueado);
        Toastify({
          text: "Login Correcto!",
          className: "info",
          style: {
            background: "green",
          }
        }).showToast();
  
      } else {
        errorLogin.innerHTML = ""
        errorLogin.append('La clave ingresada es incorrecta');
        Swal.fire(
          'Error!',
          'La clave es incorrecta!',
          'error'
        )
  
      }
  
    }
  
  }

  const loginAdmin = () => {
    container.classList.remove("hidden");
      botonCarrito.classList.remove('hidden');
  }
  const loginUser = () => {
      container.classList.remove("hidden");
      botonCarrito.classList.remove('hidden');
  }

  const loginCorrecto = (usuario) => {
    
    errorLogin.classList.add('hidden')
    renderizarTienda(JSON.parse(localStorage.getItem('marcas')))
    contenedorLogin.classList.add('hidden');
    contenedorRegister.classList.add("hidden");
    contenedorLoginRegister.classList.add("hidden");
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
  
    usuario.tipo === 'admin' ? loginAdmin() : loginUser();
  
  }

btnLogin.onclick = login;

if(localStorage.getItem('usuarioLogueado')) loginCorrecto(JSON.parse(localStorage.getItem('usuarioLogueado')))

const mostrarCarrito = ()=> {
      contenedorCarrito.innerHTML = "";
      for (const marca of carrito) {
        const nombreMarca = `<h5>${marca.nombre}</h5>`;
        const precioMarca = `<h5>${marca.precio}</h5>`;
        contenedorCarrito.innerHTML += nombreMarca;
        contenedorCarrito.innerHTML += precioMarca;
      }
      const total = carrito.reduce ((acumulador,marca) => acumulador + marca.precio,0);
      const totalTexto = `<h4>Total Compra : ${total}</h4>`;
      contenedorCarrito.innerHTML += totalTexto;
      contenedorCarrito.append(botonCerrarCarrito);
      contenedorCarrito.classList.remove('hidden');
}

cerrarCarrito = () => {
  contenedorCarrito.classList.add('hidden');
}

botonCerrarCarrito.onclick = cerrarCarrito;
botonCarrito.onclick = mostrarCarrito;

