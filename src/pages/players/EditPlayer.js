import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "../../components/Menu";

const EditPlayer = () => {
  const { player } = useParams();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [height, setHeight] = useState("");
  const [position, setPosition] = useState("");
  const [validationError, setValidationError] = useState({});

  const getPlayers = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/players/${player}`)
      .then((res) => {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setHeight(res.data.height);
        setPosition(res.data.position);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPlayers();
  }, []);

  const updatePlayer = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("height", height);
    formData.append("position", position);

    await axios
      .post(`http://127.0.0.1:8000/api/players/${player}`, formData)
      .then(() => {
        navigate("/clubs");
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        }
      });
  };

  return (
    <div>
      <Menu />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Modifier un player</h4>
                <hr />
                <div className="form-wrapper">
                  {Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {Object.entries(validationError).map(
                              ([key, value]) => (
                                <li key={key}>{value}</li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  <Form onSubmit={updatePlayer}>
                    <Row>
                      <Col>
                        <Form.Group controlId="firstName">
                          <Form.Label>Prénom</Form.Label>
                          <Form.Control
                            type="text"
                            value={firstName}
                            onChange={(event) =>
                              setFirstName(event.target.value)
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="lastName">
                          <Form.Label>Nom</Form.Label>
                          <Form.Control
                            type="text"
                            value={lastName}
                            onChange={(event) =>
                              setLastName(event.target.value)
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="height">
                          <Form.Label>Taille</Form.Label>
                          <Form.Control
                            type="text"
                            value={height}
                            onChange={(event) => setHeight(event.target.value)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="position">
                          <Form.Label>Position</Form.Label>
                          <Form.Control
                            type="text"
                            value={position}
                            onChange={(event) =>
                              setPosition(event.target.value)
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button
                      variant="primary"
                      className="mt-2"
                      size="lg"
                      block="block"
                      type="submit"
                    >
                      Editer
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPlayer;
