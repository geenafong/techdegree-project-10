import {withRouter} from 'react-router-dom'

const SignOut = (props) => {
  props.signOut()
  props.history.push("/")
}

export default withRouter(SignOut)