/* eslint-disable linebreak-style */
import { connect } from 'react-redux';
import Profil from 'src/components/Profil';

const mapStateToProps = (state) => ({
  firstName: state.user.firstName,
  lastName: state.user.lastName,
  pseudo: state.user.pseudo,
  emailAddress: state.user.emailAddress,
  role: state.user.role,
  error: state.user.error,
});

// const mapDispatchToProps = {};
export default connect(mapStateToProps, null)(Profil);
