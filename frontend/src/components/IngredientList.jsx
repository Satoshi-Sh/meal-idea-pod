import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid2,
  IconButton,
  Box,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/HighlightOff";
import { useState } from "react";

const IngredientList = ({ foodItems, setFoodItems }) => {
  const [editMode, setEditMode] = useState(null);

  const removeItem = (id) => {
    setFoodItems(foodItems.filter((item) => item[0] !== id));
  };
  const updateItem = (id, key, value) => {
    setFoodItems(
      foodItems.map((item) =>
        item[0] === id
          ? [
              item[0],
              key === "name" ? value : item[1],
              key === "amount" ? value : item[2],
            ]
          : item
      )
    );
  };

  const isEditing = (id, field) =>
    editMode && editMode.id === id && editMode.field === field;

  return (
    <div className="p-5">
      <h2 className="text-3xl mb-4">Food Ingredients</h2>
      <Grid2>
        {foodItems.map(([id, name, amount]) => (
          <Grid2 xs={12} sm={6} md={4} key={id}>
            <Card variant="outlined">
              <CardHeader
                title={
                  isEditing(id, "name") ? (
                    <TextField
                      variant="standard"
                      value={name}
                      onChange={(e) => updateItem(id, "name", e.target.value)}
                      onBlur={() => setEditMode(null)} // Exit edit mode on blur
                      onKeyDown={(ev) => {
                        if (ev.key === "Enter") {
                          setEditMode(null);
                        }
                      }}
                      autoFocus
                    />
                  ) : (
                    <Typography
                      onClick={() => setEditMode({ id, field: "name" })} // Enter edit mode for name
                      sx={{ cursor: "pointer", fontSize: "1.5rem" }}
                    >
                      {name}
                    </Typography>
                  )
                }
                action={
                  <IconButton onClick={() => removeItem(id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                }
              />
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {isEditing(id, "amount") ? (
                      <TextField
                        variant="standard"
                        value={amount}
                        onChange={(e) =>
                          updateItem(id, "amount", e.target.value)
                        }
                        onBlur={() => setEditMode(null)} // Exit edit mode on blur
                        onKeyDown={(ev) => {
                          if (ev.key === "Enter") {
                            setEditMode(null);
                          }
                        }}
                        autoFocus
                      />
                    ) : (
                      <Typography
                        variant="h6"
                        component="span"
                        onClick={() => setEditMode({ id, field: "amount" })} // Enter edit mode for amount
                        sx={{ margin: "0 8px", cursor: "pointer" }}
                      >
                        {amount}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
};

export default IngredientList;
