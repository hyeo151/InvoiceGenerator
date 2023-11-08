import "../PdfContent.css";

const PdfContent = ({
  sender,
  receiver,
  itemRows,
  subtotal,
  invoiceNo,
  invoiceDate,
  dueDate,
  taxRate,
  balanceDue,
  senderInfo,
  receiverInfo,
  notes,
}) => {
  function ccyFormat(num) {
    if (num === null) {
      console.log("value null");
      return;
    }
    console.log(num);
    console.log("formatting");
    return `${num.toFixed(2)}`;
  }
  return (
    <div className="container_select" id="container_select">
      <div className="container_content" id="container_content">
        <div className="invoice">
          <div className="first-row">
            <div className="sender">
              <div className="business-logo">
                <span>BRAVE</span>
                <br />
                PLUMBING
              </div>
              <div className="business-name">
                <h2>{sender}</h2>
              </div>
              <div className="address">
                <ul>
                  {senderInfo.split("\n").map((item, index) => {
                    return <li key={index}>{item}</li>;
                  })}
                </ul>
              </div>
            </div>
            <div className="invoice-detail">
              <div className="invoice-number">
                <h4>Invoice #</h4>
                <p>{invoiceNo}</p>
              </div>
              <div className="invoice-date">
                <h4>Invoice Date</h4>
                <p>{invoiceDate.format("YYYY-MM-DD")}</p>
              </div>
              <div className="invoice-due">
                <h4>Invoice Due Date</h4>
                <p>{dueDate.format("YYYY-MM-DD")}</p>
              </div>
              <div className="invoice-due">
                <h4>Balance Due</h4>
                <p>${ccyFormat(balanceDue)}</p>
              </div>
            </div>
          </div>
          <div className="line" />
          <div className="receiver">
            <p>Bill To</p>
            <div className="business-name">
              <h2>{receiver}</h2>
            </div>
            <div className="address">
              <ul>
                {receiverInfo.split("\n").map((item, index) => {
                  return <li key={index}>{item}</li>;
                })}
              </ul>
            </div>
          </div>
          <table className="work-list">
            <tbody>
              <tr>
                <th className="table-description">DESCRIPTION</th>
                <th className="table-rate">RATE</th>
                <th className="table-qty">QTY</th>
                <th className="table-amount">AMOUNT</th>
              </tr>
              {itemRows.map((row) => (
                <tr key={row.id}>
                  <td>{row.item}</td>
                  <td>{row.rate}</td>
                  <td>{row.qty}</td>
                  <td>{ccyFormat(row.qty * row.rate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="work-calculation-wrapper">
            <table className="work-calculation">
              <tbody>
                <tr>
                  <th>SUBTOTAL</th>
                  <td>${ccyFormat(subtotal)}</td>
                </tr>
                <tr>
                  <th>TAX ({taxRate}%)</th>
                  <td>${ccyFormat(subtotal * (taxRate / 100))}</td>
                </tr>
                <tr>
                  <th>TOTAL</th>
                  <td>${ccyFormat(balanceDue)}</td>
                </tr>
                <tr>
                  <th>BALANCE DUE</th>
                  <td>${ccyFormat(balanceDue)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {notes !== "" && (
            <div className="notes">
              <h3>Notes</h3>
              {notes.split("\n").map((note) => (
                <p>{note}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PdfContent;
