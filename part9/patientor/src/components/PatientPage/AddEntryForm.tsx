import { Box, Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import patientService from '../../services/patients';
import { useParams } from 'react-router-dom';
import { NewEntryFormValues, Patient } from '../../types';

const AddEntryForm: React.FC<{
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
}> = ({ setPatient }) => {
  const [formData, setFormData] = useState({
    description: '',
    date: '',
    specialist: '',
    healthCheckRating: 0,
    diagnosisCodes: '',
  });

  const [message, setMessage] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const clearFields = () => {
    setFormData({
      description: '',
      date: '',
      specialist: '',
      healthCheckRating: 0,
      diagnosisCodes: '',
    });
    setMessage(null);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!id) {
      setMessage('No patient id found');
      return;
    }

    const healthCheckRatingNumber = Number(
      formData.healthCheckRating
    );
    if (
      isNaN(healthCheckRatingNumber) ||
      healthCheckRatingNumber < 0 ||
      healthCheckRatingNumber > 3
    ) {
      setMessage(
        'HealthCheck rating must be a number between 0 and 3'
      );
      return;
    }

    const newEntry: NewEntryFormValues = {
      description: formData.description,
      date: formData.date,
      specialist: formData.specialist,
      healthCheckRating: healthCheckRatingNumber,
      diagnosisCodes: formData.diagnosisCodes.split(','),
      type: 'HealthCheck',
    };

    try {
      await patientService.createNewEntry(id, newEntry);
      const updatedPatient = await patientService.getById(id);
      setPatient(updatedPatient);
      clearFields();
      setMessage('Entry added successfully');
    } catch (error) {
      setMessage('Failed to add entry. Check your input information');
      console.error('Error: ', error);
    }
  };

  return (
    <Box
      sx={{ border: '1px dashed', p: 1, mt: 1 }}
      component='form'
      onSubmit={handleSubmit}
    >
      {message && (
        <Box
          sx={{
            color: message.includes('Failed') ? 'red' : 'green',
            mb: 2,
          }}
        >
          {message}
        </Box>
      )}
      <h2>New HealthCheck entry</h2>
      <Box
        display='flex'
        flexDirection='column'
        gap={2}
      >
        <TextField
          name='description'
          label='Description'
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin='normal'
          required
          data-name='Description'
        />

        <TextField
          name='date'
          label='Date'
          value={formData.date}
          onChange={handleChange}
          fullWidth
          margin='normal'
          type='date'
          required
          InputLabelProps={{ shrink: true }}
          data-name='Date'
        />

        <TextField
          name='specialist'
          label='Specialist'
          value={formData.specialist}
          onChange={handleChange}
          fullWidth
          margin='normal'
          required
          data-name='Specialist'
        />

        <TextField
          name='healthCheckRating'
          label='Healthcheck rating'
          value={formData.healthCheckRating}
          onChange={handleChange}
          fullWidth
          margin='normal'
          type='number'
          required
          inputProps={{ min: 0, max: 3 }}
          data-name='Healthcheck rating'
        />

        <TextField
          name='diagnosisCodes'
          label='Diagnoses codes'
          value={formData.diagnosisCodes}
          onChange={handleChange}
          fullWidth
          margin='normal'
          placeholder='e.g. A12, B34, C56'
          data-name='Diagnoses Codes'
        />
      </Box>

      <Grid
        container
        justifyContent='space-between'
      >
        <Grid item>
          <Button
            color='error'
            variant='contained'
            type='button'
            onClick={clearFields}
          >
            Cancel
          </Button>
        </Grid>
        <Grid
          item
          sx={{ float: 'inline-end' }}
        >
          <Button
            variant='contained'
            sx={{ backgroundColor: 'lightgray', color: 'black' }}
            type='submit'
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddEntryForm;
