import Alert from "react-bootstrap/Alert";

const Alerts = (props) => {
  return(
    props.errors.map((alert,idx) => <Alert variant="danger" dismissible onClose={() => props.handleError({}) } key={idx}>{alert.msg}</Alert>)
  )
}

export default Alerts;