// src/components/Sidebar.js
import React from 'react';
import { ListGroup, Accordion } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Sidebar = () => {
    return (
        <div id="sidebar" className="d-flex flex-column vh-100">
            <div className="p-3">
                <h4>Print Shop Management</h4>
            </div>
            <Accordion defaultActiveKey={"0"}>
                <Accordion.Item eventKey='0'>
                    <Accordion.Header>Management</Accordion.Header>
                    <Accordion.Body>
                    <ListGroup variant="flush">
                <LinkContainer to="/orders">
                    <ListGroup.Item>Orders</ListGroup.Item>
                </LinkContainer>
                <LinkContainer to="/customers">
                    <ListGroup.Item>Customers</ListGroup.Item>
                </LinkContainer>
                <LinkContainer to="/suppliers">
                    <ListGroup.Item>Suppliers</ListGroup.Item>
                </LinkContainer>
                <LinkContainer to="/categories">
                    <ListGroup.Item>Categories</ListGroup.Item>
                </LinkContainer>
                <LinkContainer to="/inventory-items">
                    <ListGroup.Item>Inventory</ListGroup.Item>
                </LinkContainer>
                <LinkContainer to="/production-tasks">
                    <ListGroup.Item>Production Tasks</ListGroup.Item>
                </LinkContainer>
                <LinkContainer to="/task-assignments">
                    <ListGroup.Item>Task Assignments</ListGroup.Item>
                </LinkContainer>
                <LinkContainer to="/production-files">
                    <ListGroup.Item>Production Files</ListGroup.Item>
                </LinkContainer>
                <LinkContainer to="/services">
                    <ListGroup.Item>Services</ListGroup.Item>
                </LinkContainer>
                <LinkContainer to="/pricing-matrices">
                    <ListGroup.Item>Pricing Matrices</ListGroup.Item>
                </LinkContainer>
                <LinkContainer to="/quotes">
                    <ListGroup.Item>Quotes</ListGroup.Item>
                </LinkContainer>
                <LinkContainer to="/sales-notes">
                    <ListGroup.Item>Sales Notes</ListGroup.Item>
                </LinkContainer>
                <LinkContainer to="/follow-up-reminders">
                    <ListGroup.Item>Follow-Up Reminders</ListGroup.Item>
                </LinkContainer>
                <LinkContainer to="/sales-pipeline">
                    <ListGroup.Item>Sales Pipeline</ListGroup.Item>
                </LinkContainer>
            </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

export default Sidebar;
