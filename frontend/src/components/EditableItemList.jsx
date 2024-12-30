import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  TextField,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

const EditableItemList = ({
  setFoodItems,
  initialItems,
  setCapturedItems,
  setOpen,
}) => {
  const [items, setItems] = useState(initialItems);
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSave = (id) => {
    setEditingId(null);
    // Optionally persist changes here (e.g., API call)
  };

  const handleChange = (id, field, value) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item[0] === id) {
          // Compare the 'id' (item[0]) of each item
          if (field === "name") {
            return [item[0], value, item[2]]; // Update the 'name' (item[1])
          } else if (field === "amount") {
            return [item[0], item[1], value]; // Update the 'amount' (item[2])
          }
        }
        return item; // Return unchanged item if id doesn't match
      })
    );
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item[0] !== id));
  };
  const handleAddAll = () => {
    setFoodItems((prevItems) => {
      const updatedItems = [...prevItems, ...items];
      return updatedItems.sort((a, b) => a[1].localeCompare(b[1]));
    });
    setOpen(true);
    setItems([]);
    setCapturedItems([]);
  };

  const handleCancel = () => {
    setItems([]);
    setCapturedItems([]);
  };

  return (
    <>
      {items.length > 0 ? (
        <>
          <List>
            {items.map(([id, name, amount]) => (
              <ListItem key={id} divider>
                {editingId === id ? (
                  <>
                    <TextField
                      value={name}
                      onChange={(e) => handleChange(id, "name", e.target.value)}
                      variant="standard"
                      sx={{ mr: 2 }}
                    />
                    <TextField
                      value={amount}
                      onChange={(e) =>
                        handleChange(id, "amount", e.target.value)
                      }
                      variant="standard"
                      sx={{ mr: 2 }}
                    />
                    <IconButton
                      edge="end"
                      onClick={() => handleSave(id)}
                      aria-label="save"
                    >
                      <SaveIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <ListItemText
                      primary={name}
                      secondary={amount}
                      sx={{ flexGrow: 1, mr: 2 }}
                    />
                    <Box>
                      <IconButton
                        onClick={() => handleEdit(id)}
                        aria-label="edit"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(id)}
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </>
                )}
              </ListItem>
            ))}
          </List>
          <Box
            sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}
          >
            <Button variant="outlined" onClick={handleAddAll}>
              Add All
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Box>
        </>
      ) : null}
    </>
  );
};

export default EditableItemList;
