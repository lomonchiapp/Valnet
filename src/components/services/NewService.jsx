import React, {useState} from 'react'
import { Box, FormControl, TextField, Typography, FormHelperText, Button } from '@mui/material'
import { addServiceAndQueue } from '../../hooks/addServiceAndQueue'

const generateQname = (name) => {
  if (typeof name !== 'string' || name.length === 0) {
    return "InvalidName01";
  }
  if (name.length < 2) {
    return name.toUpperCase() + "01";
  }
  return name[0].toUpperCase() + name[name.length - 1].toUpperCase() + "01";
}

export const  NewService = ({setOpen, refresh}) => {
  const [service, setService] = useState({
    name: '',
    description:'',
    isActive: true
  })

  const [queue, setQueue] = useState({
    name: '',
    isMain: false,
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    await addServiceAndQueue(service, queue)
    refresh()
    setOpen(false)
  }   

  return (
    <Box>
        <Typography variant="h4">
            Nuevo Servicio
        </Typography>
        <FormControl fullWidth>
            <TextField
                label="Nombre de Servicio"
                variant="outlined"
                margin="normal"
                value={service.name}
                onChange={(e) => setService({...service, name: e.target.value})}
            />
            <TextField
                label="Descripción"
                variant="outlined"
                margin="normal"
                multiline
                rows={3}
                value={service.description}
                onChange={(e) => setService({...service, description: e.target.value})}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={onSubmit}
            >
                Guardar
            </Button>
        </FormControl>
    </Box>
  )
}
