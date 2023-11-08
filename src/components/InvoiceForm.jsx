import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import dateFormat from "dateformat";
import dayjs from "dayjs";
import ItemAdder from "./ItemAdder";
import { v4 as uuidv4 } from "uuid";
import PdfContent from "./PdfContent";
import ItemAdderMobile from "./ItemAdderMobile";

const InvoiceForm = () => {
  const [sender, setSender] = useState("Brave plumbing");
  const [senderInfo, setSenderInfo] = useState("");
  const [receiver, setReceiver] = useState("");
  const [receiverInfo, setReceiverInfo] = useState("");
  const [notes, setNotes] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(
    dayjs(dateFormat(new Date(), "yyyy-mm-dd"))
  );
  const [dueDate, setDueDate] = useState(
    dayjs(dateFormat(new Date(), "yyyy-mm-dd"))
  );
  const [taxRate, setTaxRate] = useState(0);
  const [itemRows, setItemRows] = useState([
    { id: uuidv4(), item: "", qty: 0, rate: 0, amt: null },
  ]);

  let subtotal = 0;
  itemRows.forEach((row) => {
    subtotal += row.qty * row.rate;
  });

  let balanceDue = subtotal * (taxRate / 100 + 1);

  function handleFieldChange(index, field, value) {
    const updatedItemRows = [...itemRows];
    updatedItemRows[index][field] = value;
    setItemRows(updatedItemRows);
  }
  function handleAdd() {
    setItemRows([
      ...itemRows,
      { id: uuidv4(), item: "", qty: null, rate: null, amt: null },
    ]);
  }
  function handleDelete(id) {
    setItemRows(itemRows.filter((itemRow) => itemRow.id !== id));
  }
  function handleSubmit(e) {
    e.preventDefault();

    var opt = {
      margin: 0.5,
      filename: `${invoiceNo}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    const element = document.getElementById("container_content");
    html2pdf().set(opt).from(element).save();
  }

  return (
    <Container>
      <Toolbar />
      <Paper
        sx={{
          p: { xs: "0px", md: "40px" },
          boxShadow: {
            xs: "none",
            md: "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
          },
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column-reverse", sm: "row" },
              justifyContent: "space-between",
              gap: "40px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexBasis: { xs: "auto", sm: "400px" },
                gap: "20px",
              }}
            >
              <TextField
                onChange={(e) => {
                  setSender(e.target.value);
                }}
                label="Who is this invoice from"
                variant="outlined"
                required
              />
              <TextField
                label="Sender info"
                variant="outlined"
                onChange={(e) => {
                  setSenderInfo(e.target.value);
                }}
                required
                multiline
                rows={4}
              />
              <Typography>Invoice to</Typography>
              <TextField
                onChange={(e) => {
                  setReceiver(e.target.value);
                }}
                label="Who is this invoice to"
                variant="outlined"
                required
              />
              <TextField
                onChange={(e) => {
                  setReceiverInfo(e.target.value);
                }}
                label="Customer info"
                variant="outlined"
                required
                multiline
                rows={4}
              />
              <Typography>Notes</Typography>
              <TextField
                onChange={(e) => {
                  setNotes(e.target.value);
                }}
                label="Notes"
                variant="outlined"
                required
                multiline
                rows={4}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
                flexBasis: { xs: "auto", sm: "400px" },
                gap: "20px",
              }}
            >
              <Box sx={{ width: "100%" }}>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ marginBottom: "40px" }}
                >
                  INVOICE {invoiceNo}
                </Typography>
                <TextField
                  onChange={(e) => {
                    setInvoiceNo(e.target.value);
                  }}
                  sx={{ width: "100%" }}
                  label="Invoice No"
                  variant="outlined"
                  required
                ></TextField>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Typography>Invoice Date</Typography>
                <DatePicker
                  value={invoiceDate}
                  onChange={(newDate) => setInvoiceDate(newDate)}
                  // disablePast
                  sx={{ width: "100%" }}
                />
              </Box>
              <Box sx={{ width: "100%" }}>
                <Typography>Due Date</Typography>
                <DatePicker
                  value={dueDate}
                  onChange={(newDate) => setDueDate(newDate)}
                  // disablePast
                  sx={{ width: "100%" }}
                />
              </Box>
            </Box>
          </Box>
          <Box>
            <Toolbar />
            <ItemAdder
              itemRows={itemRows}
              subtotal={subtotal}
              taxRate={taxRate}
              handleTaxChange={setTaxRate}
              handleFieldChange={handleFieldChange}
              handleDelete={handleDelete}
              handleAdd={handleAdd}
            />
            <ItemAdderMobile
              itemRows={itemRows}
              subtotal={subtotal}
              taxRate={taxRate}
              handleTaxChange={setTaxRate}
              handleFieldChange={handleFieldChange}
              handleDelete={handleDelete}
              handleAdd={handleAdd}
            />
            <Toolbar />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" type="submit">
              Download Invoice
            </Button>
          </Box>
          <Toolbar />
        </Box>
      </Paper>
      <PdfContent
        sender={sender}
        receiver={receiver}
        itemRows={itemRows}
        subtotal={subtotal}
        invoiceNo={invoiceNo}
        invoiceDate={invoiceDate}
        dueDate={dueDate}
        taxRate={taxRate}
        balanceDue={balanceDue}
        senderInfo={senderInfo}
        receiverInfo={receiverInfo}
        notes={notes}
      />
    </Container>
  );
};

export default InvoiceForm;
