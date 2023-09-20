import { Box, Button, Container, TextField } from '@mui/material';
import PageTitle from '../components/PageTitle/PageTitle/PageTitle';
import { useCallback, useState, useContext } from 'react';
import axios from "axios";
import { getUrl } from '../utilities/url-utils';
import { AlertContext } from '../components/AlertContext/AlertContext';

const CreateUserPage = () => {
  const [userData, setUserData] = useState<any>({});
  const { alertMessage, isOpen } = useContext(AlertContext);

  const onSaveClickHandler = async () => {
    try {
       await axios.post(`${getUrl()}/api/users`, userData);
        onResetClickHandler();
        alertMessage("Success the user added to the system");
    }
    catch(err) {
      console.error(err);
      alertMessage("There was an error saving a new user", "error")
    }
  };

  const onResetClickHandler = () => {
    setUserData({});
  };

  const getFieldValue = (field: string) => {
    if (userData && userData[field]) {
      return userData[field];
    }
    return '';
  };

  const memoizedGetValue = useCallback(getFieldValue, [userData]);

  const changeTextHandler = (field: string, value: any) => {
    setUserData((u: any) => {
      const currentUser: any = { ...u };
      currentUser[field] = value;
      return currentUser;
    });
  };

  return (
    <Container>
      <PageTitle>  
       Craete User Page 
      </PageTitle>
      <Container className="form-container">
        <Box>
          <Box className="field">
            <TextField
              id="firstName"
              label="First Name"
              variant="outlined"
              value={memoizedGetValue('firstName')}
              onChange={(e) =>
                changeTextHandler('firstName', e.currentTarget.value)
              }
            />
          </Box>
          <Box className="field">
            <TextField
              id="lastName"
              label="Last Name"
              variant="outlined"
              value={memoizedGetValue('lastName')}
              onChange={(e) =>
                changeTextHandler('lastName', e.currentTarget.value)
              }
            />
          </Box>
          <Box className="field">
            <TextField
              id="address"
              label="Address"
              variant="outlined"
              value={memoizedGetValue('address')}
              onChange={(e) =>
                changeTextHandler('address', e.currentTarget.value)
              }
            />
          </Box>
          <Box className="field">
            <TextField
              id="phone"
              label="Phone Number"
              variant="outlined"
              value={memoizedGetValue('phone')}
              onChange={(e) =>
                changeTextHandler('phone', e.currentTarget.value)
              }
            />
          </Box>
          <Box className="field f-flex">
            <Box className="form-button">
              <Button variant="outlined" onClick={onResetClickHandler}>
                Reset
              </Button>
            </Box>
            <Box className="form-button">
              <Button variant="contained" onClick={onSaveClickHandler}>
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};
export default CreateUserPage;
