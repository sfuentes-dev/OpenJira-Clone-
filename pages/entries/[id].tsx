import { ChangeEvent, useMemo, useState, useContext } from 'react';
import { GetServerSideProps } from 'next';

import { Layout } from '@/components/layouts';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  capitalize,
  IconButton,
} from '@mui/material';

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import { dbEntries } from '@/database';
import { Entry, EntryStatus } from '../../interfaces';

import { EntriesContext } from '../../context/entries';
import { dateFunctions } from '@/utils';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
  entry: Entry;
}

const EntryPage = ({ entry }: Props) => {
  const { updateEntry } = useContext(EntriesContext);

  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  const isNotValid = useMemo(
    () => inputValue.length <= 0 && touched,
    [inputValue, touched]
  );

  const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) =>
    setInputValue(event.target.value);

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  const onSave = () => {
    if (inputValue.trim().length === 0) return;

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    };

    updateEntry(updatedEntry, true);
  };

  return (
    <Layout title={inputValue.substring(0, 20) + '...'}>
      <Grid container justifyContent='center' sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entry:`}
              subheader={`Created ${dateFunctions.getFormatDistanceToNow(
                entry.createdAt
              )}`}
            />
          </Card>

          <CardContent>
            <TextField
              sx={{ marginTop: 2, marginBottom: 1 }}
              fullWidth
              placeholder='New Entry'
              autoFocus
              multiline
              label='New Entry'
              value={inputValue}
              onChange={onInputValueChanged}
              helperText={isNotValid && 'Entry a new value'}
              onBlur={() => {
                setTouched(true);
              }}
              error={isNotValid}
            />

            <FormControl>
              <FormLabel>Status:</FormLabel>
              <RadioGroup row value={status} onChange={onStatusChanged}>
                {validStatus.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </CardContent>

          <CardActions>
            <Button
              startIcon={<SaveOutlinedIcon />}
              variant='contained'
              fullWidth
              onClick={onSave}
              disabled={inputValue.length <= 0}
            >
              Save
            </Button>
          </CardActions>
        </Grid>

        <IconButton
          sx={{
            position: 'fixed',
            bottom: 30,
            right: 30,
            backgroundColor: 'error.dark',
          }}
        >
          <DeleteForeverOutlinedIcon />
        </IconButton>
      </Grid>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      entry,
    },
  };
};

export default EntryPage;
