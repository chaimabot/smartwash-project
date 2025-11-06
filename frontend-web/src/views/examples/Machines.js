import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Table,
  Badge,
  Container,
  Row,
} from "reactstrap";
import Header from "components/Headers/Header.js";

const Machines = () => {
  const [machines, setMachines] = useState([
    { id: "M01", name: "Machine 1", status: "Available", maintenance: false },
    { id: "M02", name: "Machine 2", status: "Busy", maintenance: false },
    { id: "M03", name: "Machine 3", status: "Offline", maintenance: true },
  ]);

  const toggleMaintenance = (id) => {
    setMachines(
      machines.map((m) =>
        m.id === id ? { ...m, maintenance: !m.maintenance } : m
      )
    );
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Machines Management</h3>
              </CardHeader>

              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th>ID</th>
                      <th>Machine Name</th>
                      <th>Status</th>
                      <th>Maintenance</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {machines.map((machine) => (
                      <tr key={machine.id}>
                        <td>{machine.id}</td>
                        <td>{machine.name}</td>
                        <td>
                          <Badge
                            color={
                              machine.status === "Available"
                                ? "success"
                                : machine.status === "Busy"
                                ? "warning"
                                : "danger"
                            }
                          >
                            {machine.status}
                          </Badge>
                        </td>
                        <td>
                          {machine.maintenance ? (
                            <Badge color="danger">ON</Badge>
                          ) : (
                            <Badge color="success">OFF</Badge>
                          )}
                        </td>
                        <td>
                          <Button
                            color={machine.maintenance ? "success" : "danger"}
                            size="sm"
                            onClick={() => toggleMaintenance(machine.id)}
                          >
                            {machine.maintenance ? "Disable" : "Enable"}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Machines;
