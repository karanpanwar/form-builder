import React from "react";
import {Table, Alert, Form, Button} from "react-bootstrap";
import {connect} from "react-redux";
import { Link } from "react-router-dom";

function GridView(props) {
    return (
        <div className="container">
            {Array.isArray(props.data) && props.data.length > 0 ? (
                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        {props.columns.map((o) => (
                            <th key={o.key}>{o.label}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {props.data &&
                    props.data.map((row, i) => {
                        return (
                            <tr key={i}>
                                {props.columns.map((o, j) => (
                                    !(o.key === 'url') ? <td key={j}>{row[o.key]}</td> :
                                    <td key={j}><Link to={`/form/${row[o.key]}`}>{row[o.key]}</Link></td>
                                ))}
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>
            ) : (
                <Alert variant={"primary"}>No Form created yet.</Alert>
            )}
        </div>
    );
}

export default connect()(GridView);
