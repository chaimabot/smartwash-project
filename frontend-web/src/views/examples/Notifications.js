/*!
=========================================================
* Notifications Page
=========================================================
*/

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  Button,
  Table,
  Container,
  Row,
  Badge,
} from "reactstrap";

import Header from "components/Headers/Header.js";

const Notifications = () => {
  // Fake notifications (use backend data later)
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New booking created", date: "2025-11-06", read: false },
    { id: 2, title: "Payment received", date: "2025-11-06", read: false },
    { id: 3, title: "System update completed", date: "2025-11-05", read: true },
  ]);

  // ✅ Mark one notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // ✅ Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <>
      <Header />

      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Notifications</h3>
                <Button color="primary" size="sm" onClick={markAllAsRead}>
                  Mark all as read
                </Button>
              </CardHeader>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Message</th>
                    <th scope="col">Date</th>
                    <th scope="col">Status</th>
                    <th scope="col" className="text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {notifications.map((notif) => (
                    <tr key={notif.id}>
                      <th scope="row">{notif.title}</th>
                      <td>{notif.date}</td>
                      <td>
                        {notif.read ? (
                          <Badge color="success" className="badge-dot">
                            <i className="bg-success" /> Read
                          </Badge>
                        ) : (
                          <Badge color="warning" className="badge-dot">
                            <i className="bg-warning" /> New
                          </Badge>
                        )}
                      </td>
                      <td className="text-right">
                        {!notif.read && (
                          <Button
                            color="secondary"
                            size="sm"
                            onClick={() => markAsRead(notif.id)}
                          >
                            Mark as read
                          </Button>
                        )}
                      </td>
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

export default Notifications;
