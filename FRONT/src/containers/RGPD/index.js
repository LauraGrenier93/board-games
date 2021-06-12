/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
import { connect } from 'react-redux';
import RGPD from 'src/components/RGPD';
import { setMessage } from 'src/actions/user';

const mapStateToProps = (state) => ({
  error: state.user.error,
  message: state.user.message,
});

const mapDispatchToProps = (dispatch) => ({
  setMessage: (message, name) => dispatch(setMessage(message, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RGPD);
