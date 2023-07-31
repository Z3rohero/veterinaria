import React,{useEffect, useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../functions';

const Historia = () => {
    const url='https://cliente-api-3zzhc.ondigitalocean.app/api/historias';
    const [products,setProducts]= useState([]);
    const [id,setId]= useState('');
    const [temperatura,setTemperatura]= useState('');
    const [operation,setOperation]= useState(1);
    const [peso,setPeso]= useState('');
    const [observacion,setObservacion]= useState('');

    const [frecuencia_cardiaca,setFrecuencia_cardiaca]= useState('');
    const [cliente_id,setCliente_id]= useState('');
    const [mascota_id,setMascota_id]= useState('');


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
      
    const openModal = (op,id, temperatura,peso,observacion,frecuencia_cardiaca,cliente_id,mascota_id) =>{
        setId('');
        setTemperatura('');
        setPeso('');
        setObservacion('');
        setFrecuencia_cardiaca('');
        setMascota_id('');
        setCliente_id('');
        setOperation(op);
        if(op === 1){
            setTitle('Registrar historial');
        }
        else if(op === 2){
            setTitle('Editar historial');
            setId(id);
            setTemperatura(temperatura);
            setPeso(peso);
            setObservacion(observacion);
            setFrecuencia_cardiaca(frecuencia_cardiaca);
            setMascota_id(mascota_id);
            setCliente_id(cliente_id);
        }
        window.setTimeout(function(){
            document.getElementById('nombre').focus();
        },500);
    }

    const validar = () => {
        var parametros;
        var metodo;


        if (temperatura.trim()  === " " || peso.trim() === " " || observacion.trim() === " " || cliente_id.trim() === " " || mascota_id.trim() === " " || frecuencia_cardiaca.trim() === " ") 
        {
            show_alerta('Escribe el nombre del his, la descripción del producto y el precio del producto', 'warning');
        }
        else{
            if(operation === 1){
                parametros= {temperatura:temperatura.trim(),
                    mascota_id:mascota_id.trim(),  
                    peso: peso.trim(),
                    observacion:observacion.trim(),
                    frecuencia_cardiaca:frecuencia_cardiaca.trim()
                };
                metodo= 'POST';
            envarSolicitud(metodo,parametros);

            }
            else{
                parametros={id:id,
                      temperatura:temperatura.trim(),
                        mascota_id:mascota_id.trim(),  
                        peso: peso.trim(),
                        cliente_id:cliente_id.trim(),
                        observacion:observacion.trim(),
                        frecuencia_cardiaca:frecuencia_cardiaca.trim()
                        
                    };
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
          show_alerta('El historial fue eliminado', 'success');
          getProducts();
        } catch (error) {
          show_alerta('Error en la solicitud', 'error');
          console.error(error);
        }
      };
      
    const deleteProduct= (id,nombre) =>{
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title:'¿Seguro de eliminar  este codigo de historia '+nombre+' ?',
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
                <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                    <div className='table-responsive'>
                        <table className='table   table-bordered'>
                            <thead>
                                <tr><th>#</th><th>Codigo Historia</th> <th>Temperatura</th><th>peso</th><th>frecuencia_cardiaca</th><th>observacion</th><th>Codigo cliente</th><th>Codigo mascota</th><th></th></tr>
                            </thead>

                            <tbody className='table-group-divider'>
                                {products.map( (product,i)=>(
                                    <tr key={product.id}>
                                        <td>{(i+1)}</td>
                                        <td>{product.id}</td>
                                        <td>{product.temperatura}</td>
                                        <td>{product.peso}</td>
                                        <td>{product.frecuencia_cardiaca}</td>
                                        <td>{product.observacion}</td>
                                        <td>{product.cliente_id}</td>
                                        <td>{product.mascota_id}</td>
                                        <td>

                                            <button onClick={() => openModal(2,product.id,product.temperatura,product.peso,product.observacion,product.frecuencia_cardiaca
                                                ,product.cliente_id,product.mascota_id
                                                )}
                                                 className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                                                <i className='fa-solid fa-edit'></i>
                                            </button>
                                            &nbsp; 
                                            <button onClick={()=>deleteProduct(product.id,product.id)} className='btn btn-danger'>
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
        <div className='row mt-3'>
                <div className='col-md-4 offset-md-4'>
                    <div className='d-grid mx-auto'>
                        <button onClick={()=> openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                            <i className='fa-solid fa-circle-plus'></i> Añadir una historia clinica veterinaria
                        </button>
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
                            <input type='text' id='nombre' className='form-control' placeholder='Temperatura' value={temperatura}
                            onChange={(e)=> setTemperatura(e.target.value)}></input>
                        </div>
                         <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-otter'></i></span>
                            <input type='text' id='nombre' className='form-control' placeholder='Peso' value={peso}
                            onChange={(e)=> setPeso(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-otter'></i></span>
                            <input type='text' id='observacion' className='form-control' placeholder='observacion' value={observacion}
                            onChange={(e)=> setObservacion(e.target.value)}></input>
                        </div>
                         <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-heart'></i></span>
                            <input type='text' id='nombre' className='form-control' placeholder='frecuencia cardiaca' value={frecuencia_cardiaca}
                            onChange={(e)=> setFrecuencia_cardiaca(e.target.value)}></input>
                        </div>
                        

                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-user-secret'></i></span>
                            <input type='text' id='documento' className='form-control' placeholder='codigo cliente' value={cliente_id}
                            onChange={(e)=> setCliente_id(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-otter'></i></span>
                            <input type='text' id='sexo' className='form-control' placeholder='codigo mascota' value={mascota_id}
                            onChange={(e)=> setMascota_id(e.target.value)}></input>
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

export default Historia