// ✅ SmartWash Admin Dashboard - Updated for business metrics
// Replace your current Index.js page with this one

import { useState } from "react";
import classnames from "classnames";
import Chart from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// SmartWash Charts
import {
  chartOptions,
  parseOptions,
  smartWashChart_Revenue,
  smartWashChart_Orders,
} from "variables/smartwashCharts.js";

import Header from "components/Headers/Header.js";

const Index = () => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartSelectedData, setChartSelectedData] = useState("month");

  if (window.Chart) parseOptions(Chart, chartOptions());

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartSelectedData(index === 1 ? "month" : "week");
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          {/* 🚗 Revenue Chart */}
          <Col xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      SmartWash Overview
                    </h6>
                    <h2 className="text-white mb-0">Monthly Revenue</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span>Month</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          href="#"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span>Week</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Line
                    data={smartWashChart_Revenue[chartSelectedData]}
                    options={smartWashChart_Revenue.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>

          {/* 📊 Orders Chart */}
          <Col xl="4">
            <Card className="shadow">
              <CardHeader>
                <h6 className="text-muted ls-1 mb-1">Machines Usage</h6>
                <h2>Number of wash cycles</h2>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Bar
                    data={smartWashChart_Orders.data}
                    options={smartWashChart_Orders.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* 📋 Latest Reservations */}
        <Row className="mt-5">
          <Col xl="8">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between">
                <h3 className="mb-0">Latest Reservations</h3>
                <Button size="sm" color="primary">
                  See details
                </Button>
              </CardHeader>
              <Table className="table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th>Client</th>
                    <th>Selected Machine</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Aya ben hmida</td>
                    <td>Machine 05</td>
                    <td>
                      <i className="fas fa-check text-success"></i> Completed
                    </td>
                    <td>05 Nov 2025</td>
                  </tr>
                  <tr>
                    <td>Client Test</td>
                    <td>Machine 03</td>
                    <td>
                      <i className="fas fa-spinner text-warning"></i> In
                      Progress
                    </td>
                    <td>06 Nov 2025</td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>

          {/* 🔋 Machine Status */}
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Machine Load</h3>
              </CardHeader>
              <Table responsive>
                <thead className="thead-light">
                  <tr>
                    <th>Machine</th>
                    <th>Usage</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Machine 01</td>
                    <td>90%</td>
                    <td>
                      <Progress value="90" />
                    </td>
                  </tr>
                  <tr>
                    <td>Machine 03</td>
                    <td>65%</td>
                    <td>
                      <Progress value="65" barClassName="bg-gradient-info" />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
