import React, {useState} from 'react';
import { Card, Table , Button, Modal, Form  } from 'react-bootstrap';
import { useQuery } from 'react-query';
import '../../App.css';
import { get_request, post_request } from '../../setting/axios';
import { GrUpdate, GrBasket, GrConfigure } from "react-icons/gr";
import useInputs from '../../hooks/useInputs';

const LayoutComponent = () => {

    const [show, setShow] = useState(false);
    const [deleteModleshow, setDeleteModleshow] = useState(false);
    const [newModleshow, setnewModleshow] = useState(false);
    const [userId, setUserId] = useState(0);
    const {value, onChange} = useInputs(null);
    const handleClose = () => setShow(false);
    const handleDeleteClose = () => setDeleteModleshow(false);
    const handleNewUserClose = () => setnewModleshow(false);

    const handleShow = (id) => {
        setShow(true);
        setUserId(id);
    }

    const handleDeleteShow = (id) => {
        setDeleteModleshow(true);
        setUserId(id);
    }

    const handleNewUserShow = () => {
        setnewModleshow(true);
    }

    const GetUserData = async () => {
        const response = await (get_request ('user/all'));
        return response.data.data;
    }

    const onUpdateUsers = async () => {
        let uri = 'user/update/' + userId + '/' + value.firstName;
        await (post_request(uri, ''));
        setShow(false);
        window.location.reload();
    }

    const onCreateUser = async () => {
        const payload = {
            "first_name": value.firstName,
            "last_name": value.lastname,
            "age": value.age,
            "dob": value.dob,
            "email": value.email
        }
        await (post_request('user/create', payload));
        setShow(false);
        window.location.reload();
    }

    const onDeleteUser = async () => {
        let uri = 'user/delete/' + userId;
        await (post_request(uri, ''));
        setShow(false);
        window.location.reload();
    }

    const handleChange = (event) => {
        onChange(event);
    }

    /**User Query */
    const { isLoading, error, data } = useQuery('UserData', GetUserData);
    //const { isLoadingUp, errorUp, dataUp } = useQuery('UpdateUserData', onUpdateUsers);

    if( isLoading){
        return <div>fetch user data...</div>
    }

  return (
    <div className="wapper">
        <Card style={{ width: '80vw' }}>
            <Card.Body>
                <Card.Title>SuperLoop User Details</Card.Title>
                
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>age</th>
                        <th>dob</th>
                        <th>email</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { data.map((user) => (
                        <tr key={user.id} >
                            <td>{user.id}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.age}</td>
                            <td>{user.dob}</td>
                            <td>{user.email}</td>
                            <td>
                            <Button variant="primary" className="button_margin" size="sm" onClick={() => {handleNewUserShow()}}><GrUpdate /></Button>
                            <Button variant="warning" className="button_margin" size="sm" onClick={() => {handleShow(user.id)}}><GrConfigure /></Button>
                            <Button variant="danger" className="button_margin" size="sm" onClick={() => {handleDeleteShow(user.id)}}><GrBasket /></Button>
                            </td>
                        </tr>                        
                        )) }
                    </tbody>
                    </Table>
            </Card.Body>
        </Card>
            {/** User Update Model */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control placeholder="First Name" name="firstName" onChange={handleChange} value={value === undefined ? '' : value.firstName} />
                </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => {onUpdateUsers()}}>
                    Update Changes
                </Button>
                </Modal.Footer>
            </Modal>
            {/**End User Update Model */}
            {/** User Delete Model */}
            <Modal show={deleteModleshow} onHide={handleDeleteClose}>
                <Modal.Header closeButton>
                <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group className="mb-3">
                        <p>Are You Sure want to delete this user?</p>
                </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleDeleteClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={() => {onDeleteUser()}}>
                    Delete User
                </Button>
                </Modal.Footer>
            </Modal>
            {/**End User Update Model */}
            {/** New User Add Model */}
            <Modal show={newModleshow} onHide={handleNewUserClose}>
                <Modal.Header closeButton>
                <Modal.Title>Create New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control placeholder="First Name" name="firstName" require onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control placeholder="Last Name" name="lastname" require onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Age</Form.Label>
                    <Form.Control placeholder="Age" name="age" type="number" require onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Data Of Birth</Form.Label>
                    <Form.Control placeholder="Data Of Birth" name="dob" require type="date" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control placeholder="Email" name="email" require onChange={handleChange} />
                </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleNewUserClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => {onCreateUser()}}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
            {/**End User Update Model */}
    </div>
  )
}

export default LayoutComponent