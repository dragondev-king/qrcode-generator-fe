import { Card } from "@material-ui/core"

const QRDisplayer = ({imageURL}) => {
  return (
    <>
      <Card>
        <img src={imageURL ? imageURL : ''} alt=""/>
      </Card>
    </>
  )
}

export default QRDisplayer
