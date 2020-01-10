import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( ( theme: Theme ) => ( {
  formControl: {
    margin: theme.spacing( 1 ),
    maxWidth: '50%',
  },
  datepicker: {
    maxWidth: '50%',
  },
  button: {
    'margin': theme.spacing( 1 ),
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
} ) );

export default useStyles;
