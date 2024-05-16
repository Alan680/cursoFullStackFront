import { useState } from 'react';
import * as API from './services/data';
import imagen from './assets/login.png';
import { useNavigate } from 'react-router-dom';
import {Box, FormControl, Heading,Input,FormLabel, Center, Image} from "@chakra-ui/react";
import * as React from 'react';


export function Login() {
  const [teacher, setTeacher] = useState({ usuario:'', password:'' });

    const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    
    const response = await API.login(teacher.usuario, teacher.password);
  
    // Verifica la respuesta de la API según lo esperado
    if (response.length != 0) {
      sessionStorage.setItem("usuario",response);
      navigate('/dashboard');
    } else {
      Swal.fire(
        'Error',
        'Credenciales invalidas',
        'error'
      );
    }
  }
  

  return (
    <>
      <Box mt='30px'>
        <Center>
          <Image mt='3px' src={imagen} width='150px' height='150px'/>
        </Center>
        <Center>
         <Box m='2%' boxShadow='xl' borderRadius='md' width='40%' id='caja'>
           <Box textAlign='center'>
             <Heading>Iniciar Sesión</Heading>
           </Box>  
           <Box p='20px'>
            <form id='formulario' onSubmit={handleSubmit}>
             <FormControl mt='3px'>
               <FormLabel>Usuario</FormLabel>
               <Input required type='text' id='usuario' onChange={(event) => setTeacher({ ...teacher, usuario:event.target.value })}/>
             </FormControl>
             <FormControl mt='3px'>
               <FormLabel>Contraseña</FormLabel>
               <Input required type='password' id='pass' onChange={(event) => setTeacher({...teacher, password:event.target.value })}/>
             </FormControl>
             <FormControl mt='3px'>
               <Input type = 'submit' mt= '3px' id='enviar' borderColor='teal' value='Iniciar Sesion' />
             </FormControl>
            </form>
           </Box>
         </Box>
        </Center>
      </Box>
    </>
  );
}
