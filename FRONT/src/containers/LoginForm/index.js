/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
import { connect } from 'react-redux';
import LoginForm from 'src/components/LoginForm';
import {
  setFieldValue,
  sendLogin,
  logout,
  setError,
  setMessage,
} from 'src/actions/user';

const mapStateToProps = (state) => ({
  pseudo: state.user.pseudo,
  password: state.user.password,
  isLogged: state.user.logged,
  errorpseudo: state.user.errorpseudo,
  errorpassword: state.user.errorpassword,
  errorSendLogin: state.user.errorSendLogin,
  messageLogin: state.user.messageLogin,

});
const mapDispatchToProps = (dispatch) => ({
  changeField: (value, name) => dispatch(setFieldValue(value, name)),
  handleLogin: () => dispatch(sendLogin()),
  handleLogout: () => dispatch(logout()),
  handleBlur: (error, name) => dispatch(setError(error, name)),
  setMessage: (message, name) => dispatch(setMessage(message, name)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
