import { makeStyles } from "@material-ui/styles";
export default makeStyles(() => ({
    paper: {
      padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100px',
    },
    loading: {
      height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center',
    },
    mapContainer: {
      height: '85vh', width: '100%',
    },
    markerContainer: {
      position: 'absolute', transform: 'translate(-50%, -50%)', zIndex: 1, '&:hover': { zIndex: 2 },
    },
    pointer: {
      cursor: 'pointer',
    },
  }));