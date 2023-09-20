import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import PageTitle from '../components/PageTitle/PageTitle/PageTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { getUrl } from '../utilities/url-utils';
import {
  AlertContext,
  AlertProvider,
} from '../components/AlertContext/AlertContext';

const HomePage = () => {
  const [usersData, setUsersData] = useState<any[]>([]);
  const [isInit, setIsInit] = useState<boolean>(false);
  const { alertMessage } = useContext(AlertContext);

  const getUsersData = async () => {
    try {
      const { data } = await axios.get(`${getUrl()}/api/users?extended=1`);
      setUsersData(data);
    } catch (err) {
      console.log(err);
      alertMessage("There was an error fetching all the users and their hobbies", "error")
    }
  };

  useEffect(() => {
    if (!isInit) {
      setIsInit(true);
      getUsersData();
    }
  }, [isInit]);

  const deleteHandler = async (id: string): Promise<void> => {
    try {
      await axios.delete(`${getUrl()}/api/users/${id}`);
      alertMessage('User Deleted successfully');
      await getUsersData();
    } catch (err) {
      alertMessage("There was an error deleting user & his hobbies", "error")
      console.log(err);
    }
  };

  return (
    <Container>
      <PageTitle>Home Page</PageTitle>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Firstname</TableCell>
              <TableCell align="left">Lastname</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">Phone Number</TableCell>
              <TableCell align="left">Hobbies</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersData.map((row: any) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">{row.firstName}</TableCell>
                <TableCell align="left">{row.lastName}</TableCell>
                <TableCell align="left">{row.address}</TableCell>
                <TableCell align="left">{row.phone}</TableCell>
                <TableCell align="left">{row.hobbies}</TableCell>
                <TableCell align="left">
                  <Button onClick={(e) => deleteHandler(row.id)}>
                    <DeleteIcon></DeleteIcon>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
export default HomePage;
