/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
/* eslint-disable import/no-unresolved */
import { connect } from 'react-redux';
import SignInForm from 'src/components/SignInForm';
import {
  setFieldValue,
  sendSignInForm,
  logout,
  setError,
} from 'src/actions/user';

const mapStateToProps = (state) => ({
  firstName: state.user.firstName,
  lastName: state.user.lastName,
  pseudo: state.user.pseudo,
  emailAddress: state.user.emailAddress,
  passwordConfirm: state.user.passwordConfirm,
  password: state.user.password,
  signIn: state.user.signIn,
  errorfirstName: state.user.errorfirstName,
  errorlastName: state.user.errorlastName,
  errorpseudo: state.user.errorpseudo,
  erroremailAddress: state.user.erroremailAddress,
  errorpasswordConfirm: state.user.errorpasswordConfirm,
  errorpassword: state.user.errorpassword,
  errorSendSignIn: state.user.errorSendSignIn,
  errorSubmitSignInform: state.user.errorSubmitSignInform,
});
const mapDispatchToProps = (dispatch) => ({
  changeField: (value, name) => dispatch(setFieldValue(value, name)),
  handleSignInForm: () => dispatch(sendSignInForm()),
  handleLogout: () => dispatch(logout()),
  handleBlur: (error, name) => dispatch(setError(error, name)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
