import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const IngredientList = ({ foodItems }) => {
  return (
    <div className="p-5">
      <h2 className="text-3xl mb-4">Food Ingredients</h2>
      <List
        sx={{
          width: "80%",
          margin: "0 auto",
          minWidth: 280,
          bgcolor: "background.paper",
        }}
      >
        {foodItems.map(([foodItem, amount], index) => (
          <ListItem key={index}>
            <ListItemText primary={`${foodItem} (${amount})`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default IngredientList;
