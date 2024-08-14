import React, { useState, useEffect } from "react";
import {
  Box,
  useTheme,
  Grid,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { NewDialog } from "../../components/NewDialog";
import { useQstate } from "../../hooks/global/useQstate";
import { NewTicket } from "../../components/tickets/NewTIcket";
import { database } from "../../firebase";
import { onSnapshot, collection, getDocs } from "firebase/firestore";

const serviceMapping = {
  1: "Consulta",
  2: "Estudio",
  3: "Vacuna",
  4: "Cirugía",
  5: "Emergencia",
};

export const Tickets = () => {
  const [newTicket, setNewTicket] = useState(false);
  const { tickets, setTickets } = useQstate();
  const [serviceNames, setServiceNames] = useState({});
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const q = collection(database, "tickets");
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTickets(data);
      console.log("Tickets data:", data);
    });
    return unsubscribe;
  }, [database]);

  useEffect(() => {
    const fetchServiceNames = async () => {
      const servicesCollection = collection(database, "services");
      const snapshot = await getDocs(servicesCollection);
      const services = {};
      snapshot.forEach((doc) => {
        services[doc.id] = doc.data().name;
      });
      setServiceNames(services);
    };

    fetchServiceNames();
  }, [database]);

  const styles = {
    page: {
      padding: "40px",
      backgroundColor: colors.background,
    },
    ServicesContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "20px",
    },
    header: {
      mb: 3,
    },
  };

  return (
    <Grid sx={styles.page}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          mb: 4,
        }}
      >
        <Box sx={styles.header}>
          <Typography variant="h1">Tickets / Turnos</Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            style={{
              backgroundColor: colors.primary[400],
              color: colors.gray[100],
            }}
            onClick={() => setNewTicket(true)}
          >
            Nuevo Ticket
          </Button>
          <NewDialog open={newTicket} setOpen={setNewTicket}>
            <NewTicket setOpen={setNewTicket} />
          </NewDialog>
        </Box>
      </Box>
      <Box>
        <DataGrid
          rows={tickets}
          columns={[
            { field: "patientName", headerName: "Nombre", width: 150 },
            {
              field: "service",
              headerName: "Servicio",
              width: 150,
              valueGetter: (params) =>
                serviceNames[params.value] || params.value,
            },
            { field: "ticketCode", headerName: "Fila / Turno", width: 150 },
            {
              field: "date",
              headerName: "Fecha",
              width: 150,
              valueGetter: (params) => {
                const createdAt = params.row.createdAt;
                const date = createdAt?.toDate
                  ? createdAt.toDate()
                  : new Date(createdAt);
                return `${date.getDate()}/${
                  date.getMonth() + 1
                }/${date.getFullYear()}`;
              },
            },
            {
              field: "time",
              headerName: "Hora",
              width: 150,
              valueGetter: (params) => {
                const createdAt = params.row.createdAt;
                const time = createdAt?.toDate
                  ? createdAt.toDate()
                  : new Date(createdAt);
                const hours = time.getHours();
                const minutes = time.getMinutes();
                const seconds = time.getSeconds();
                const ampm = hours >= 12 ? "PM" : "AM";
                const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
                const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
                const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

                return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
              },
            },
            { field: "status", headerName: "Estado", width: 150 },
          ]}
          pageSize={5}
          editMode
          rowsPerPageOptions={[5, 10, 20]}
          GridToolbarComponents={[GridToolbar]}
          sx={{
            height: 400,
            width: "100%",
            backgroundColor: colors.primary[400],
            color: colors.gray[100],
          }}
        />
      </Box>
    </Grid>
  );
};
