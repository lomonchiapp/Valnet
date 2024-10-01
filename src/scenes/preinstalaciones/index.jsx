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
import { getListInstall } from "../../api/getListInstall";

export const Preinstalaciones = () => {
  const [preinstalls, setPreinstalls] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  useEffect(() => {
    getListInstall()
      .then((data) => {
        if (Array.isArray(data)) {
          setPreinstalls(data);
        } else {
          console.error("Error: Data is not an array", data);
        }
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching installations:", error);
      });
  }, []);

  const customLocaleText = {
    noRowsLabel: 'No hay filas',
    toolbarDensity: 'Densidad',
    toolbarDensityLabel: 'Densidad',
    toolbarDensityCompact: 'Compacto',
    toolbarDensityStandard: 'Estándar',
    toolbarDensityComfortable: 'Cómodo',
    toolbarColumns: 'Columnas',
    toolbarColumnsLabel: 'Seleccionar columnas',
    toolbarFilters: 'Filtros',
    toolbarFiltersLabel: 'Mostrar filtros',
    toolbarFiltersTooltipHide: 'Ocultar filtros',
    toolbarFiltersTooltipShow: 'Mostrar filtros',
    toolbarExport: 'Exportar',
    toolbarExportLabel: 'Exportar',
    toolbarExportCSV: 'Descargar como CSV',
    toolbarExportPrint: 'Imprimir',
    // Pagination labels
    footerRowSelected: (count) => `${count.toLocaleString()} fila(s) seleccionada(s)`,
    footerTotalRows: 'Filas Totales:',
    footerPaginationRowsPerPage: 'Filas por página:',
    footerPaginationLabelDisplayedRows: ({ from, to, count }) =>
      `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`,
  };
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
          <Typography variant="h1">Preinstalaciones</Typography>
        </Box>
      
      </Box>
      <Box>
        <DataGrid
          rows={preinstalls}
          localeText={customLocaleText}
          columns={[
            { field: "cliente", headerName: "Cliente", width: 150 },
            { field: "cedula", headerName: "Cedula", width: 150 },
            { field: "estate", headerName: "Estado", width: 150 },
            { field: "telefono", headerName: "Telefono", width: 150 },
            { field: "movil", headerName: "Movil", width: 150 },
            { field: "fecha_instalacion", headerName: "F. de Instalación", width: 150 },
          ]}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          components={{ Toolbar: GridToolbar }}
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