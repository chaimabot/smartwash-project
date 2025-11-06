/*!
=========================================================
* SmartWash Admin - Profile Page
=========================================================
*/

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

// ✅ SmartWash admin header
import Header from "components/Headers/Header";

const Profile = () => {
  return (
    <>
      <Header />

      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Account (Manager Profile)</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      size="sm"
                      onClick={(e) => e.preventDefault()}
                    >
                      Edit Profile
                    </Button>
                  </Col>
                </Row>
              </CardHeader>

              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Manager Information
                  </h6>

                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-full-name"
                          >
                            Full Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-full-name"
                            placeholder="Ex: Ahmed Ben Ali"
                            type="text"
                          />
                        </FormGroup>
                      </Col>

                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="admin@smartwash.tn"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-phone"
                          >
                            Phone Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-phone"
                            placeholder="+216 50 000 000"
                            type="text"
                          />
                        </FormGroup>
                      </Col>

                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-role"
                          >
                            Role
                          </label>
                          <Input
                            disabled
                            className="form-control-alternative"
                            id="input-role"
                            value="Administrator / SmartWash Manager"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>

                  <Button color="success" size="md">
                    Save changes
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
