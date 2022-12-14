import React from "react";
import QRCode from "qrcode";
import {Box, BoxProps} from "@chakra-ui/core";

//import {download} from "~/utils/download";

interface Props extends BoxProps {
  text: string;
}

const QrCode: React.FC<Props> = ({text, ...props}) => {
  // Create a ref to store canvas
  const canvas = React.useRef<HTMLCanvasElement>();

  /*function handleDownload() {
    // Convert string to svg
    QRCode.toString(text, {version: 5})
      // Save it
      .then((file) => download(`qr.svg`, file));
  }*/

  React.useEffect(() => {
    // Set qr on canvas
    QRCode.toCanvas(canvas.current, text, {width: 315, version: 5});
  }, [text]);

  return <Box ref={canvas} as="canvas" cursor="pointer" {...props} />;
};

export default QrCode;
