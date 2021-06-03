import React, { Fragment, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Row, Col } from 'react-bootstrap'
import { MDBDataTable } from 'mdbreact'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers, deleteUser, clearErrors } from '../../actions/userActions'
import { USER_DELETE_RESET } from '../../constants/userConstants'

import Loader from '../../components/Loader'
import Sidebar from './Sidebar'
import MetaData from '../../components/MetaData'


const UserList = ({history}) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, users } = useSelector(state => state.userList);
    const { isDeleted } = useSelector(state => state.user);


    useEffect(() => {
        dispatch(listUsers());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('User deleted successfully');
            history.push('/admin/users');
            dispatch({ type: USER_DELETE_RESET })
        }

    }, [dispatch, alert, error, isDeleted, history]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteUser(id))
        }
    }

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'User ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Admin',
                    field: 'admin',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        };

        users.forEach(user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                admin: user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  ),

                actions: <Fragment>

                    <LinkContainer to={`/admin/user/${user._id}`}>
                        <Button variant='info' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                        </Button>
                    </LinkContainer>
                   <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </Fragment>
            })
        })

        return data;
    }

    

    return (
        <Fragment>
            <MetaData title={'All Users'} />
            
            <Row>
                <Col md={2}>
                    <Sidebar />
                </Col>

                <Col md={10}>
                    <Fragment>
                        <h1 className="my-3">All Users</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setUsers()}
                                className="px-3"
                                bordered
                                striped
                                hover
                                responsive
                            />
                        )}

                    </Fragment>
                </Col>
            </Row>

        </Fragment>
    )
}

export default UserList
