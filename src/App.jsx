import "./App.css";
import Appbar from "./components/Appbar";
import InvoiceForm from "./components/InvoiceForm";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Appbar />
        <InvoiceForm />
      </LocalizationProvider>
    </>
  );
}

export default App;
