"use client";
import { useState } from "react";
import Link from "next/link";
import { AxiosError } from "axios";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface EntityListProps<T> {
  entityName: string;
  entityNameSingular: string;
  getItems: () => Promise<T[]>;
  deleteItem: (id: number) => Promise<T>;
  columns: GridColDef[];
}

export default function EntityList<T>({
  entityName,
  entityNameSingular,
  getItems,
  deleteItem,
  columns,
}: EntityListProps<T>) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [serverSideErrors, setServerSideErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [entityName] });
      setIsSubmitting(false);
      handleClose();
    },
    onError: (error) => {
      setIsSubmitting(false);
      setServerSideErrors(
        error instanceof AxiosError ? error.response?.data?.errorMessage : []
      );
    },
  });

  const handleClickOpen = (id: number) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const handleDelete = () => {
    if (selectedId !== null) {
      deleteMutation.mutate(selectedId);
      setIsSubmitting(true);
      setServerSideErrors([]);
    }
  };

  const {
    data: items,
    error,
    isError,
    isLoading,
  } = useQuery<T[]>({
    queryKey: [entityName],
    queryFn: getItems,
  });

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>An error has occurred: {error.message}</Typography>;
  }

  return (
    <>
      {serverSideErrors.map((error, index) => (
        <Alert
          key={index}
          severity="error"
          sx={{ width: "100%", marginBottom: 2 }}
        >
          {error}
        </Alert>
      ))}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4" sx={{textTransform: "capitalize"}}>{entityName} List</Typography>
        <Link href={`/${entityName}/create`}>
          <Button
            variant="contained"
            color="primary"
            sx={{ display: "inline-flex", gap: 1, alignItems: "center" }}
          >
            <AddIcon />
            Create
          </Button>
        </Link>
      </Box>
        <DataGrid
          rows={items || []}
          columns={[
            ...columns,
            {
              field: "actions",
              headerName: "Actions",
              flex: 1,
              minWidth: 240,
              sortable: false,
              filterable: false,
              renderCell: (params) => (
                <Box
                  sx={{
                    display: "inline-flex",
                    gap: 1,
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Link href={`/${entityName}/update/${params.row.id}`}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ display: "inline-flex", gap: 1, alignItems: "center" }}
                    >
                      <EditIcon fontSize="small" />
                      Update
                    </Button>
                  </Link>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{ display: "inline-flex", gap: 1, alignItems: "center" }}
                    onClick={() => handleClickOpen(params.row.id)}
                  >
                    <DeleteIcon fontSize="small" />
                    Delete
                  </Button>
                </Box>
              ),
            },
          ]}
          getRowId={(row) => row.id}
          rowSelection={false}
        />

      {/* Delete Confirmation Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete {entityNameSingular}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this {entityNameSingular}? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Deleting..." : "Yes, Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
