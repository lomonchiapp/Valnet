import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  TextField,
  Typography,
  FormHelperText,
  MenuItem,
  Button,
  Select,
} from "@mui/material";
import { addServiceAndQueue } from "../../hooks/addServiceAndQueue";
import { serverTimestamp } from "firebase/firestore";
import { useServiceState } from "../../hooks/global/useServiceState";
import { useQstate } from "../../hooks/global/useQstate";
import {
  getDocs,
  doc,
  setDoc,
  collection,
  query,
  where,
} from "firebase/firestore";
import { database } from "../../firebase";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { newTicket } from "../../hooks/tickets/newTicket";

export const NewTicket = ({ setOpen, refresh }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const styles = {
    tktTxtLbl: {
      fontSize: "1rem",

      marginBottom: "10px",
    },
    ticketText: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.primary[100],
    },
    tktContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      border: `1px solid ${colors.primary[400]}`,
      backgroundColor: colors.gray[900],
      borderRadius: "5px",
      margin: "20px 0",
    },
  };

  const [ticket, setTicket] = useState({
    patientName: "",
    service: "",
    status: "Pendiente",
    ticketCode: "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    //Generate random alphanumeric string for ticket number:
    //number:
  });
  const { services, fetchServices, queues } = useServiceState();
  const { selectedQ, setSelectedQ } = useQstate();
  const generatedTicket = `${selectedQ?.name} - ${selectedQ?.count
    ?.toString()
    .padStart(2, "0")}`;

  const onSubmit = async (e) => {
    e.preventDefault();

    await newTicket(ticket, selectedQ);
    setOpen(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);
  useEffect(() => {
    setTicket({
      ...ticket,
      ticketCode: generatedTicket,
    });
  }, [selectedQ]);

  useEffect(() => {
    if (selectedQ) {
      setTicket({
        ...ticket,
        queue: selectedQ.id,
        ticketCode: generatedTicket,
      });
    }
    }, [selectedQ]);

  const findQueue = async (serviceId) => {
    try {
      const q = query(
        collection(database, "queues"),
        where("service", "==", serviceId)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setSelectedQ(doc.data());
        console.log("Queue:", doc.data());
      });
    } catch (error) {
      console.error("Error fetching queue:", error);
    }
  };
  const handleServiceChange = (e) => {
    const serviceId = e.target.value;
    const queueId = selectedQ ? selectedQ.id : null;
    setTicket({...ticket,
      service: serviceId,
      queue: queueId,
    });

    findQueue(serviceId);
  };

  return (
    <Box>
      <Typography variant="h4">Nuevo Ticket</Typography>
      <FormControl fullWidth>
        <TextField
          label="Nombre de Paciente"
          variant="outlined"
          margin="normal"
          value={ticket.patientName}
          onChange={(e) =>
            setTicket({ ...ticket, patientName: e.target.value })
          }
        />
        <Select
          label="Servicio"
          variant="outlined"
          margin="normal"
          value={ticket.service}
          onChange={handleServiceChange}
        >
          {services.map((service, index) => (
            <MenuItem key={index} value={service.id}>
              {service.name}
            </MenuItem>
          ))}
        </Select>
        <Box sx={styles.tktContainer}>
          <Typography sx={styles.tktTxtLbl}>Ticket #:</Typography>
          <Typography sx={styles.ticketText}>{generatedTicket}</Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          size="large"
          disabled={!selectedQ}
          onClick={onSubmit}
        >
          Crear
        </Button>
      </FormControl>
    </Box>
  );
};
