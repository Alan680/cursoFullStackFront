import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import * as API from "./services/data";
import { Header } from "./Header";
import * as React from "react";
import {Box, Center, Badge, TableContainer,Table,Tr,Thead,Th,Tbody,Td,Input} from '@chakra-ui/react';
import { FaCheck, FaTrashAlt} from "react-icons/fa";

export function StudentCalifications(){
    let params = useParams();
    const matriculaId = params.matriculaId;
    const [calificaciones, setCalificaciones] = useState([]);
    const [calificacion, setCalificacion] = useState([]);

    useEffect(()=>{
        API.getCalificaciones(params.matriculaId).then(setCalificaciones);
    });

    let total = 0;
    calificaciones?.map(calificacion => (
        total = total + (calificacion.nota * calificacion.porcentaje)/100
    ));

    function createCalificacion(){
        let descrField = document.getElementById('descripcion');
        let notaField = document.getElementById('nota');
        let porcentajeField = document.getElementById('porcentaje');
        
        let valid = descrField.value.trim() !== "" && notaField.value.trim() !== "" && porcentajeField.value.trim() !== "";
        if (valid){
            API.createCalificacion(calificacion,matriculaId).then(result =>{
                if (result == "true"){
                    Swal.fire(
                        'Calificacion añadida',
                        'Has añadido una calificacion de forma sastifactoria',
                        'success'
                    )
                    document.getElementById("descripcion").value="";
                    document.getElementById("nota").value="";
                    document.getElementById("porcentaje").value="";
                } else{
                    Swal.fire(
                        'Error',
                        'No se ha podido añadir la calificación',
                        'error'
                    )
                }
            })
        }
    }

    function deleteCalificacion(id){
        API.deleteCalificacion(id).then(result =>{
            if (result == "true"){
                Swal.fire(
                    'Calificacion eliminada',
                    'Has eliminado una calificacion de forma sastifactoria',
                   'success'
                )
            } else{
                Swal.fire(
                    'Error',
                    'No se ha podido eliminar la calificación',
                    'error'
                )
            }
        })

    }
    return(
        
        <>
            <Header/>
            <Box m='100px'>
                <TableContainer>
                    <Table size='md'>
                        <Thead>
                                <Tr>
                                    <Th>Descripción</Th>
                                    <Th>Nota</Th>
                                    <Th>Ponderación</Th>
                                    <Th></Th>
                                </Tr>
                        </Thead>

                    </Table>
                    <Table>
                        
                        <Tbody>
                            {
                                calificaciones?.map(calificacion =>(
                                    <Tr>
                                        <Td>{calificacion.nota}</Td>
                                        <Td>{calificacion.porcentaje}%</Td>
                                        <Td><FaTrashAlt cursor='pointer' id='delete' onClick={()=> deleteCalificacion(calificacion.id)}/></Td>
                                        <Td>{calificacion.descripcion}</Td>

                                    </Tr>
                                ))
                            }
                            <Tr>
                                <Td><Input type="text" id='descripcion' placeholder="Descripción" onChange={event => setCalificacion({...calificacion, descripcion: event.target.value})}/></Td>
                                <Td><Input type="number" id="nota" placeholder="Nota" onChange={event => setCalificacion({...calificacion, nota: event.target.value})}/></Td>
                                <Td><Input type="number" id="porcentaje" placeholder="Ponderación" onChange={event => setCalificacion({...calificacion, porcentaje: event.target.value})}/></Td>
                                <Td><FaCheck  cursor='pointer' id="nueva" onClick={()=>createCalificacion()}/></Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
                <Center>
                    <Box mt='10px' fontSize='lg'>Nota total:
                     <Badge ml='5px' vartian='outline' colorScheme='green'>
                        {total}
                     </Badge>
                     
                    </Box>
                    
                </Center>
            </Box>
       
        </>

    )

}