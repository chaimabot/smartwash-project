import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Row,
  Button,
  Badge,
} from "reactstrap";
import Header from "components/Headers/Header.js";

const Payments = () => {
  const [payments, setPayments] = useState([
    {
      id: 1,
      client: "Aya B.",
      amount: "25 TND",
      date: "2025-11-06",
      status: "success",
    },
    {
      id: 2,
      client: "Ali K.",
      amount: "40 TND",
      date: "2025-11-05",
      status: "pending",
    },
    {
      id: 3,
      client: "Samar H.",
      amount: "18 TND",
      date: "2025-11-05",
      status: "failed",
    },
  ]);

  const renderStatusBadge = (status) => {
    switch (status) {
      case "success":
        return (
          <Badge color="success" className="badge-dot">
            <i className="bg-success" /> Paid
          </Badge>
        );
      case "pending":
        return (
          <Badge color="warning" className="badge-dot">
            <i className="bg-warning" /> Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge color="danger" className="badge-dot">
            <i className="bg-danger" /> Failed
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Payments / Transactions</h3>
              </CardHeader>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Client</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Date</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id}>
                      <th scope="row">{payment.client}</th>
                      <td>{payment.amount}</td>
                      <td>{payment.date}</td>
                      <td>{renderStatusBadge(payment.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <CardFooter></CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Payments;
