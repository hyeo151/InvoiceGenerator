import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ItemAdderMobile = ({
  itemRows,
  handleFieldChange,
  handleDelete,
  handleAdd,
  handleTaxChange,
  subtotal,
  taxRate,
}) => {
  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }
  return (
    <Container sx={{ display: { md: "none" }, padding: { xs: "0px" } }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Work Items
      </Typography>

      {itemRows.map((row, index) => (
        <Box
          key={row.id}
          sx={{ borderBottom: "1px solid #c4c4c4", pb: "15px", mb: "10px" }}
        >
          <TextField
            fullWidth
            label="Item"
            sx={{ mb: "20px" }}
            onChange={(e) => {
              handleFieldChange(index, "item", e.target.value);
            }}
            value={itemRows[index]["item"]}
          />
          <Box sx={{ display: "flex" }}>
            <TextField
              label="qty"
              sx={{ width: "100px", mr: "10px" }}
              type="number"
              onChange={(e) => {
                handleFieldChange(index, "qty", e.target.value);
              }}
            />
            <TextField
              label="rate"
              sx={{ width: "100px", mr: "20px" }}
              type="number"
              onChange={(e) => {
                handleFieldChange(index, "rate", e.target.value);
              }}
            />
            <Typography
              sx={{
                display: "inline-block",
                mt: "15px",
              }}
            >
              Amount: {ccyFormat(row.qty * row.rate)}
            </Typography>
            <IconButton
              aria-label="delete"
              sx={{ ml: "auto" }}
              onClick={() => {
                handleDelete(row.id);
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      ))}
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button variant="contained" onClick={handleAdd}>
          Add Item
        </Button>
      </Box>
      <Box
        sx={{
          width: "200px",
          ml: "auto",
          mt: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Typography>Subtotal: {ccyFormat(subtotal)}</Typography>
        <TextField
          value={taxRate}
          label="Tax Rate"
          size="small"
          onChange={(e) => handleTaxChange(e.target.value)}
        />
        <Typography>Tax: {ccyFormat(subtotal * (taxRate / 100))}</Typography>
        <Typography>
          Total: {ccyFormat(subtotal * (taxRate / 100 + 1))}
        </Typography>
      </Box>
    </Container>
  );
};

export default ItemAdderMobile;
