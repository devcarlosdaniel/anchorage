import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Badge, Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Accordion } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { BiArrowBack } from "react-icons/bi";

import api from "../../app/services/api";

import { Temperature } from "../../app/components/VitalSigns/Temperature";
import { AttendanceColor } from "../../app/enums/AttendanceColor";
import { AttendanceStatus } from "../../app/enums/AttendanceStatus";
import { RespirationFrequency } from "../../app/components/VitalSigns/RespirationFrequency";
import { BloodPressure } from "../../app/components/VitalSigns/BloodPressure";

export function Attendance() {
    const [patient, setPatient] = useState({} as Patient);
    const { id } = useParams();
    const navigate = useNavigate();

    async function getPatientDataForAttendance() {
        try {
            const response = await api.get(`/show-patient/${id}`);

            setPatient(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPatientDataForAttendance();
    }, [id]);

    return (
        <Container className="my-4 attendance-body">
            <Row className="mb-3">
                <Col md={3}>
                    <Button
                        variant="danger"
                        onClick={() => { navigate("/") }}
                        title="Voltar para a página inicial"
                        className="d-flex justify-content-start align-items-center gap-2"
                    >
                        <BiArrowBack /> Voltar
                    </Button>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={10}>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col md="auto">
                                    <img
                                        src={`http://localhost:8000/storage/${patient.image}`}
                                        alt={patient.fullname}
                                        width="80"
                                        height="80"
                                        className="rounded-3"
                                    />
                                </Col>

                                <Col md={8}>
                                    <div className="d-flex flex-column fw-bolder fs-6">
                                        <label className="gap-3">
                                            {patient.fullname} <Badge pill bg="danger">INFECTADO</Badge>
                                        </label>
                                        <label className="text-secondary">{patient.cpf}</label>
                                        <label className="text-secondary">{dayjs(patient.birthdate).format("DD/MM/YYYY")}</label>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={10}>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Últimos antedimentos</Accordion.Header>

                            <Accordion.Body>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>DATA</th>
                                            <th>STATUS</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {patient.all_attendances?.map((attendance: any) => (
                                            <tr key={attendance.id}>
                                                <td>{dayjs(attendance.created_at).format("DD/MM/YYYY")}</td>
                                                <td>
                                                    <Badge
                                                        pill
                                                        bg={`${AttendanceColor[attendance.status] ?? 'dark'}`}
                                                    >
                                                        {AttendanceStatus[attendance.status]}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={10}>
                    <Card>
                        <Card.Body className="pt-9 pb-3">
                            <Row>
                                <Col md={6}>
                                    <Temperature
                                        onChange={(value) => console.log(value.target.value)}
                                    />
                                </Col>

                                <Col md={6}>
                                    <RespirationFrequency />
                                </Col>
                            </Row>

                            <Row>
                                <Col md={12}>
                                    
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Container>
    );
}