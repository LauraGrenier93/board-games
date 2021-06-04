import { connect } from 'react-redux';
import Gardiens from 'src/components/Gardiens';
import { setMessage } from 'src/actions/user'; 

const mapStateToProps = (state) => ({
    error: state.user.error,
    message: state.user.message,
  });

const mapDispatchToProps = (dispatch) => ({
  setMessage:(message, name)=> dispatch(setMessage(message, name)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Gardiens);
