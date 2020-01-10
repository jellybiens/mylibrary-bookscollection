import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( ( theme ) => ( {
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabs: {
  },
  search: {
    'width': '25%',
    'position': 'relative',
    'borderRadius': theme.shape.borderRadius,
    'backgroundColor': fade( theme.palette.common.white, 0.15 ),
    '&:hover': {
      backgroundColor: fade( theme.palette.common.white, 0.25 ),
    },
  },
  searchIcon: {
    width: theme.spacing( 7 ),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing( 1, 1, 1, 7 ),
    transition: theme.transitions.create( 'width' ),
    [theme.breakpoints.up( 'xs' )]: {
      'width': 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  buttonSearch: {
    'margin': theme.spacing( 1 ),
  },
} ) );

export default useStyles;
