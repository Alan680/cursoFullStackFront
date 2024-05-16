import { useState, useEffect } from "react";
import * as API from './services/data';
import {Link} from 'react-router-dom';
import {Box,TableContainer,Table,Thead,Tr,Th,Tbody,Td} from "@chakra-ui/react";
import * as React from 'react';
import {FaEdit,FaRegStickyNote,FaTrashAlt} from "react-icons/fa";


export function StudentList() {
    const usuario = sessionStorage.getItem("usuario");
    const [students, setStudents] = useState([]);

    useEffect(() => {
        API.getStudents(usuario).then(setStudents);
    }, [usuario]); // Se ejecuta solo cuando cambia 'usuario'

    function deleteStudent(id) {

        API.deleteStudent(id).then(result => {
            if (result=="true"){
                Swal.fire(
                    'Alumno Eliminado',
                    'Se ha podido eliminar el alumno correctamente',
                    'success'
                )
            }
            else{   Swal.fire(
                'Error',
                'No se ha podido eliminar el alumno',
                'error'
            )}
        });
    }


    return (
        <>
            <Box m='50px'>
                <TableContainer>
                    <Table size='md' variant='striped' colorSchema='gray'>
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>DNI</Th>
                                <Th>Nombre</Th>
                                <Th>Dirección</Th>
                                <Th>Edad</Th>
                                <Th>Email</Th>
                                <Th>Acciones</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {students?.map(student => (
                                <Tr key={student.id}>
                                    <Td>{student.id}</Td>
                                    <Td>{student.dni}</Td>
                                    <Td>{student.nombre}</Td>
                                    <Td>{student.direccion}</Td>
                                    <Td>{student.edad}</Td>
                                    <Td>{student.email}</Td>
                                    <Td><Link to={'/student/'+student.id}><FaEdit /></Link></Td>
                                    <Td><Link to={'/student/califications/' + student.matriculaId}><FaRegStickyNote /></Link></Td>
                                    <Td cursor='pointer' onClick={()=>deleteStudent(student.id)}><FaTrashAlt /></Td>

                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
}
