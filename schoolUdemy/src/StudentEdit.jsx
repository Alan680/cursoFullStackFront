import { useParams } from "react-router-dom";
import { Header } from "./Header";
import { useEffect,useState } from "react";
import * as API from "./services/data";
import * as React from "react";
import {Center, Box, Heading, FormControl, FormLabel, Input} from '@chakra-ui/react'

export function StudentEdit(){
    
    let params = useParams();
   
    const [student,setStudent] = useState([]);

    useEffect(()=>{
        API.getStudentDetails(params.studentId).then(setStudent);
    },[])

    function handleSubmit(e) {
        e.preventDefault();
       API.editStudent(student).then(result => {
        if (result == "true") {
            Swal.fire(
                'Alumno modificado',
                'Se ha modificado un Alumno correctamente',
                'success'
            )
       } 
       else {
        Swal.fire(
            'Error',
            'No se ha podido editar el alumno correctamente',
            'error'
        )
        }
        });
       
    }
    return(
        <>
           <Header/>
           <Center>
                <Box m='40px' boxShadow='xl' borderRadius='md' width='40%' id='caja'>
                    <Box textAlign='center'>
                        <Heading>Editar alumno</Heading>
                    </Box>

                
                    <Box p='20px'>
                        <form id="formulario" onSubmit={handleSubmit}>
                            <FormControl mt='3px'>
                                <FormLabel>DNI</FormLabel>
                                <Input type="text" id="dni" required disabled value = {student.dni}/> <br />
                            </FormControl>
                            <FormControl mt='3px'>
                                <FormLabel>Nombre</FormLabel>
                                <Input type="text" id="nombre" required value = {student.nombre} onChange={event => setStudent({...student, nombre:event.target.value})}/> 
                            </FormControl>
                            <FormControl mt='3px'>
                                <FormLabel>Dirección</FormLabel>
                                <Input type="text" id="direccion" required  value = {student.direccion} onChange={event => setStudent({...student, direccion:event.target.value})} />
                            </FormControl>
                            <FormControl mt='3px'>
                                <FormLabel>Edad</FormLabel>
                                <Input type="number" id="edad" required  value = {student.edad} onChange={event => setStudent({...student, edad:event.target.value})}/>
                            </FormControl>
                            <FormControl mt='3px'>
                                <FormLabel>Email</FormLabel>
                                <Input type="text" id="email" required  value = {student.email} onChange={event => setStudent({...student, email:event.target.value})}/>
                            </FormControl>
                            <FormControl>
                                <Input type="submit" mt='20px' id='editar' borderColor='teal' value='Editar'/> 
                            </FormControl>
                                    
                                
                        </form>
                    </Box>
                </Box>
 
            </Center>
        </>
    )
}