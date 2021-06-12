/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
import { connect } from 'react-redux';
import Header from 'src/components/Header';
import { sendDisconnect } from 'src/actions/user';

const mapStateToProps = (state) => ({
  isLogged: state.user.logged,
});
const mapDispatchToProps = (dispatch) => ({
  sendDisconnect: () => dispatch(sendDisconnect()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
