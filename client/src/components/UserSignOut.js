import {withRouter} from 'react-router-dom'

const SignOut = (props) => {
  props.signOut()
  props.history.push("/signin")
  return null;
}

export default withRouter(SignOut)