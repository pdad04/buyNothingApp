import Alert from "react-bootstrap/Alert";

const Alerts = (alerts) => {
  if(alerts.length > 0 && alerts !== undefined) {
    alerts.map(alert => <Alert variant="danger">{alert.message}</Alert> )
  }else{
    return null
  }
}

export default Alerts;