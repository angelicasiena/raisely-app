import React from "react";
import { Box } from "../styled-tags/index";
import { SignupMessage } from "../types/index";

const colors = {
  success: {
    backgroundColor: "#ceead5",
    color: "#154d21",
  },
  error: {
    backgroundColor: "#f7d1d5",
    color: "#671a21",
  },
};

export const MessageBox: React.FC<SignupMessage> = (
  messageData: SignupMessage
) => {
  return (
    <Box p={2}
      bg={colors[messageData.status]?.backgroundColor}
      color={colors[messageData.status]?.color}
    >
      {messageData.message}
    </Box>
  );
};
