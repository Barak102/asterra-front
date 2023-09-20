import { useCallback, useContext, useEffect, useState } from 'react';
import PageTitle from '../components/PageTitle/PageTitle/PageTitle';
import { getUrl } from '../utilities/url-utils';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { AlertContext } from '../components/AlertContext/AlertContext';

const AddHobbiePage = () => {
  const [newHobbieData, setNewHobbieData] = useState<any>({ user_id: '' });
  const [usersData, setUsersData] = useState<any[]>([]);
  const [isInit, setIsInit] = useState<boolean>(false);
  const {alertMessage} = useContext(AlertContext);

  const onSaveClickHandler = async () => {
    if (newHobbieData.user_id && newHobbieData.hobbie) {
      try {
        await axios.post(`${getUrl()}/api/users/${newHobbieData.user_id}/hobbies`, newHobbieData);
        onResetClickHandler();
        alertMessage("Hobbies successfully saved")
      } catch (err) {
        console.error(err);
        alertMessage("There was an error adding a  new hobbie", "error")
      }
    }
  };

  const getUsersData = async () => {
    try {
      const { data } = await axios.get(`${getUrl()}/api/users?extended=0`);
      setUsersData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!isInit) {
      setIsInit(true);
      getUsersData();
    }
  }, [isInit]);

  const onResetClickHandler = () => {
    setNewHobbieData({});
  };

  const getFieldValue = (field: string) => {
    if (newHobbieData && newHobbieData[field]) {
      return newHobbieData[field];
    }
    return '';
  };

  const memoizedGetValue = useCallback(getFieldValue, [newHobbieData]);

  const setFieldHandler = (field: string, value: any) => {
    setNewHobbieData((u: any) => {
      const currentUser: any = { ...u };
      currentUser[field] = value;
      return currentUser;
    });
  };

  return (
    <Container>
      <PageTitle>Add Hobbie</PageTitle>
      <Container className="form-container">
        <Box>
          <Box className="field" sx={{ 'margin-top': '30px' }}>
            <FormControl>
              <InputLabel id="user-id">User</InputLabel>
              <Select
                sx={{ minWidth: '220px' }}
                size="medium"
                labelId="user-id"
                id="user-id-select"
                value={memoizedGetValue('user_id')}
                onChange={(e: SelectChangeEvent) => {
                  setFieldHandler('user_id', e.target.value);
                }}
                label="user-id"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {usersData.map((u) => (
                  <MenuItem key={u.id} value={u.id}>
                    {u.firstName} {u.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box className="field">
            <TextField
              id="hobbie"
              label="Hobbie"
              variant="outlined"
              value={memoizedGetValue('hobbie')}
              onChange={(e) => setFieldHandler('hobbie', e.currentTarget.value)}
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
export default AddHobbiePage;
