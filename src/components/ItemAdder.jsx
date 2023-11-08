import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ItemAdder = ({
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
    <TableContainer sx={{ display: { xs: "none", md: "block" } }}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Rate</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {itemRows.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell sx={{ minWidth: "600px" }}>
                <TextField
                  placeholder="Description of service or product..."
                  fullWidth
                  onChange={(e) => {
                    handleFieldChange(index, "item", e.target.value);
                  }}
                  value={itemRows[index]["item"]}
                  size="small"
                ></TextField>
              </TableCell>
              <TableCell align="center" sx={{ minWidth: `80px` }}>
                <TextField
                  type="number"
                  fullWidth
                  size="small"
                  value={itemRows[index]["qty"]}
                  onChange={(e) => {
                    handleFieldChange(index, "qty", e.target.value);
                  }}
                ></TextField>
              </TableCell>
              <TableCell align="center" sx={{ minWidth: `80px` }}>
                <TextField
                  type="number"
                  size="small"
                  value={itemRows[index]["rate"]}
                  onChange={(e) => {
                    handleFieldChange(index, "rate", e.target.value);
                  }}
                ></TextField>
              </TableCell>
              <TableCell align="center" size="small" sx={{ minWidth: `80px` }}>
                {ccyFormat(row.qty * row.rate)}
              </TableCell>
              <TableCell>
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    handleDelete(row.id);
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2} align="left">
              Subtotal
            </TableCell>
            <TableCell align="center">{ccyFormat(subtotal)}</TableCell>
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell>
              <TextField
                value={taxRate}
                size="small"
                onChange={(e) => handleTaxChange(e.target.value)}
              />
            </TableCell>
            <TableCell align="center">
              {ccyFormat(subtotal * (taxRate / 100))}
            </TableCell>
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="center">
              {ccyFormat(subtotal * (taxRate / 100 + 1))}
            </TableCell>
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell sx={{ border: "none" }} />
            <TableCell colSpan={3} align="right" sx={{ border: "none" }}>
              <Button variant="contained" onClick={handleAdd}>
                Add Item
              </Button>
            </TableCell>
            <TableCell sx={{ border: "none" }} />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemAdder;
