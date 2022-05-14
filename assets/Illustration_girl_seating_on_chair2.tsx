import React from "react";
import { Box, BoxProps } from "@mui/material";

const GirlOnChairIllustration = ({ ...other }: BoxProps) => {
  return (
    <Box {...other}>
      <svg
        height="203"
        width="140"
        fill="none"
        viewBox="0 0 140 203"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect height="202" width="140" fill="url(#pattern0)" y="0.5" />
        <defs>
          <pattern
            height="1"
            id="pattern0"
            width="1"
            patternContentUnits="objectBoundingBox"
          >
            <image
              height="2367"
              width="1646"
              transform="translate(-0.00167783) scale(0.000609572 0.000422476)"
            />
          </pattern>
          <image
            height="2367"
            id="image0_429_9353"
            width="1646"
          />
        </defs>
      </svg>
    </Box>
  );
};

export default GirlOnChairIllustration;