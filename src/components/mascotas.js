import React,{useEffect, useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../functions';

const Mascotas = () => {
//const url='http://api-products.run/index.php';
const url='https://cliente-api-3zzhc.ondigitalocean.app/api/mascotas';
const [products,setProducts]= useState([]);
const [id,setId]= useState('');
const [nombre,setNombre]= useState('');
const [operation,setOperation]= useState(1);
//const [description,setDescription]= useState('');
const [raza,setRaza]= useState('');
//const [documento,setDocumento]= useState('');
const [sexo,setSexo]= useState('');
const [Codigo_cliente, setCodigo_cliente]= useState('1');
const [title,setTitle]= useState('');


useEffect( ()=>{
getProducts();
},[]);

const getProducts = async () => {
try {
const response = await axios.get(url);
setProducts(response.data);
console.log(response.data);
} catch (error) {
console.error('Error fetching products:', error);
}
};
const openModal = (op,id, nombre, raza, sexo, Codigo_cliente) =>{
setId('');
setNombre('');
setRaza('');
setSexo('');
setCodigo_cliente(''); 

setOperation(op);
if(op === 1){
setTitle('Registrar Mascota');
}
else if(op === 2){
setTitle('Editar Producto');
setId(id);
setNombre(nombre);
setRaza(raza);
setSexo(sexo);
setCodigo_cliente(Codigo_cliente); 

}
window.setTimeout(function(){
document.getElementById('nombre').focus();
},500);
}
const validar = () => {
var parametros;
var metodo;
if(nombre.trim() === ''){
show_alerta('Escribe el nombre del producto','warning');
}
else if(raza.trim() === ''){
show_alerta('Escribe la descripción del producto','warning');
}
else if(sexo.trim() === ''){
show_alerta('Escribe el precio del producto','warning');
}
else if(Codigo_cliente === ''){
show_alerta('Escribe la descripción del producto','warning');
}

else{
if(operation === 1){
parametros= {nombre:nombre.trim(),raza: raza.trim(),Sexo:sexo, Codigo_cliente:parseInt(Codigo_cliente) };
console.log(parametros);
metodo= 'POST';
envarSolicitud(metodo,parametros,id);

}
else{
parametros={id:id,nombre:nombre.trim(),raza: raza.trim(),Sexo:sexo, Codigo_cliente:parseInt(Codigo_cliente)};
metodo= 'PUT';
envarSolicitud(metodo,parametros,id);

}
}
}

const envarSolicitud = async (metodo, parametros, id = null) => {
try {
let response;
if (metodo === 'PUT') {
response = await axios.put(`${url}/${id}`, parametros);
} else if (metodo === 'POST') {
response = await axios.post(url, parametros);
} else {
throw new Error('Método HTTP no válido');
}
const tipo = response.data[0];
const msj = response.data[1];
show_alerta(msj, tipo);
if (tipo === 'success') {
document.getElementById('btnCerrar').click();
getProducts();
}
} catch (error) {
show_alerta('Error en la solicitud', 'error');
console.error(error);
}
};




const envarSolicitud_delete = async (metodo, id) => {
try {
await axios.delete(`${url}/${id}`);
show_alerta('El producto fue eliminado', 'success');
getProducts();
} catch (error) {
show_alerta('Error en la solicitud', 'error');
console.error(error);
}
};
const deleteProduct= (id,nombre) =>{
const MySwal = withReactContent(Swal);
MySwal.fire({
title:'¿Seguro de eliminar el producto '+nombre+' ?',
icon: 'question',text:'No se podrá dar marcha atrás',
showCancelButton:true,confirmButtonText:'Si, eliminar',cancelButtonText:'Cancelar'
}).then((result) =>{
if(result.isConfirmed){
setId(id);
envarSolicitud_delete('DELETE', id);
}
else{
show_alerta('El producto NO fue eliminado','info');
}
});
}

return (
<div className='App'>
<div className='container-fluid'>
<div className='row mt-3'>
<div className='col-md-4 offset-md-4'>
<div className='d-grid mx-auto'>
<button onClick={()=> openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalProducts'>
<i className='fa-solid fa-circle-plus'></i> Añadir
</button>
</div>
</div>
</div>
<div className='row mt-3'>
<div className='col-12 col-lg-8 offset-0 offset-lg-2'>
<div className='table-responsive'>
<table className='table table-bordered'>
<thead>
<tr><th>#</th><th>Nombre</th><th>Raza</th><th>Sexo</th><th>Codigo cliente</th><th></th></tr>
</thead>
<tbody className='table-group-divider'>

{products.map( (product,i)=>(
<tr key={product.id}>
<td>{(i+1)}</td>
<td>{product.nombre}</td>
<td>{product.raza}</td>
<td>{product.Sexo}</td>
<td>{product.Codigo_cliente}</td>

<td>
<button onClick={() => openModal(2,product.id,product.nombre,product.raza,product.Sexo, product.Codigo_cliente)}
className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalProducts'>
<i className='fa-solid fa-edit'></i>
</button>
&nbsp; 
<button onClick={()=>deleteProduct(product.id,product.nombre)} className='btn btn-danger'>
<i className='fa-solid fa-trash'></i>
</button>
</td>
</tr>
))
}
</tbody>
</table>
</div>
</div>
</div>
</div>
<div id='modalProducts' className='modal fade' aria-hidden='true'>
<div className='modal-dialog'>
<div className='modal-content'>
<div className='modal-header'>
<label className='h5'>{title}</label>
<button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
</div>
<div className='modal-body'>
<input type='hidden' id='id'></input>
<div className='input-group mb-3'>
<span className='input-group-text'><i className='fa-solid fa-otter'></i></span>
<input type='text' id='nombre' className='form-control' placeholder='Nombre' value={nombre}
onChange={(e)=> setNombre(e.target.value)}></input>
</div>
<div className='input-group mb-3'>
<span className='input-group-text'><i className='fa-solid fa-otter'></i></span>
<input type='text' id='raza' className='form-control' placeholder='raza' value={raza}
onChange={(e)=> setRaza(e.target.value)}></input>
</div>
<div className='input-group mb-3'>
<span className='input-group-text'><i className='fa-solid fa-otter'></i></span>
<input type='text' id='Sexo' className='form-control' placeholder='Sexo' value={sexo}
onChange={(e)=> setSexo(e.target.value)}></input>
</div>

<div className='input-group mb-3'>
<span className='input-group-text'><i className='fa-solid fa-otter'></i></span>
<input type='text' id='Codigo_cliente' className='form-control' placeholder='Codigo Cliente' value={Codigo_cliente}
onChange={(e)=> setCodigo_cliente(e.target.value)}></input>
</div>

<div className='d-grid col-6 mx-auto'>
<button onClick={() => validar()} className='btn btn-success'>
<i className='fa-solid fa-floppy-disk'></i> Guardar
</button>
</div>
</div>
<div className='modal-footer'>
<button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
</div>
</div>
</div>
</div>
</div>
)
}

export default Mascotas