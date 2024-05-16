import { useState } from 'react';
import { Header } from './Header';
import * as API from './services/data';
import * as React from 'react';
import {Center,Box,Heading,FormControl,FormLabel,Input,Select} from '@chakra-ui/react'

export function StudentNew() {
    const [student, setStudent] = useState({
        dni: '',
        nombre: '',
        direccion: '',
        edad: '',
        email: '',
        asignatura: '1'
    });

    function handleSubmit(e) {
        e.preventDefault();
        API.createStudent(student).then(result =>
            {
                if (result=="true"){
                    Swal.fire(
                        'Alumno insertado correctamente',
                        'Se ha podido eliminar insertar el alumno correctamente',
                        'success'
                    )
                    document.getElementById("formulario").reset();
                }
                else{
                    Swal.fire(
                        'Error',
                        'No se ha podido eliminar insertar el alumno',
                        'error'
                    )
                    document.getElementById("formulario").reset();
                }
            }
        )
        
    }
   
    return (
        <>
            <Header />
            <Center>
                <Box m='40px' boxShadow='xl' borderRadius='md' width='40%' id='caja'> 
                    <Box textAlign='center'>
                        <Heading>Nuevo alumno</Heading>
                    </Box>
                    <Box p='20px'>
                        <form id='formulario' onSubmit={handleSubmit}>
                            <FormControl mt='3px'>
                                <FormLabel>DNI</FormLabel>
                                <Input required type='text' id='dni' onChange={event => setStudent({ ...student, dni: event.target.value })}/>
                            </FormControl>
                            <FormControl mt='3px'> 
                                <FormLabel>Nombre</FormLabel>
                                <Input type="text" id="nombre" required onChange={event => setStudent({ ...student, nombre: event.target.value })}/><br />
                            </FormControl>
                            <FormControl mt='3px'>
                                <FormLabel>Dirección</FormLabel>
                                <Input type="text" id="direccion" required onChange={event => setStudent({...student, direccion: event.target.value })}/><br />
                            </FormControl>
                            <FormControl mt='3px'>
                                <FormLabel>Edad</FormLabel>
                                <Input type="number" id="edad" required onChange={event => setStudent({ ...student, edad: event.target.value })}/>
                            </FormControl>
                            <FormControl mt='3px'>
                                <FormLabel>Email</FormLabel>
                                <Input type="text" id="email" required onChange={event => setStudent({...student, email: event.target.value })}/>

                            </FormControl>   
                            
                            <FormControl mt='3px'>
                                <FormLabel>Asignatura</FormLabel>
                                <Select id='asignatura' onChange={event => setStudent({ ...student, asignatura: event.target.value })}>
                                    <option value="1">Matemáticas</option>
                                    <option value="2">Informática</option>
                                    <option value="3">Inglés</option>
                                    <option value="4">Literatura</option>
                                    </Select>
                            </FormControl>

                            <FormControl>
                            <Input type="submit" mt= '20px' id='editar' borderColor='teal' value='Nuevo'/>
                            </FormControl>      
                           
                        </form>
                    </Box>
                </Box>
            </Center>
            
        </>
    );
}

