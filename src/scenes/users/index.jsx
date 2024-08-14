// React imports
import React, { useState, useEffect } from "react"
// MUI imports
import {
  Box,
  useTheme,
  Grid,
  Typography,
  Button,
} from "@mui/material";
// MUI X Data Grid imports
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// Theme Imports
import { tokens } from "../../theme";
import { NewDialog } from "../../components/NewDialog";
import { database } from "../../firebase";
import { onSnapshot, collection, getDocs } from "firebase/firestore";
import { PlusCircle } from "@phosphor-icons/react";

export const Users = () => {
  const [newUser, setNewUser] = useState(false);
  const [users, setUsers] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const q = collection(database, "users");
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(data);
      console.log("Users data:", data);
    });
    return unsubscribe;
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
          <Typography variant="h1">Usuarios / Accesos</Typography>
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
           <PlusCircle/>  Nuevo Usuario
          </Button>
          <NewDialog open={newTicket} setOpen={setNewTicket}>
            <NewTicket setOpen={setNewTicket} />
          </NewDialog>
        </Box>
      </Box>
      <Box>
        <DataGrid
          rows={users}
          columns={[
            { field: "user", headerName: "Usuario", width: 150 },
            { field: "name", headerName: "Nombre", width: 150 },
            { field: "email", headerName: "Correo Electronico", width: 150 },
            { field: "department", headerName: "Departamento", width: 150 },
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
