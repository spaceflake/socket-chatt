import { Dispatch, SetStateAction, useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import { SocketContext } from "../context/socketContext";

interface formProps {
  setWritingMessage: Dispatch<SetStateAction<boolean>>;
  writingMessage: boolean;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
}
type Inputs = {
  input: string;
};

function ChatForm({ setWritingMessage, message, setMessage }: formProps) {

  const { register, handleSubmit, watch, reset } = useForm<Inputs>();
  const { socket, nickname, joinedRoom } = useContext(SocketContext);

  if (setWritingMessage) {
    if (watch("input")) {
      setWritingMessage(true);
      console.log("test random");
    }
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("test 1");
    setMessage(data.input);

    if (!message.length) {
      console.log("För kort meddelande");
      return;
    }

    console.log("test 2");
    socket.emit("message", message, joinedRoom);
    setWritingMessage(false);
    setMessage("");
    reset();

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <InputGroup>
          <Input
            type="text"
            id="input"
            autoComplete="off"
            {...register("input")}
          />
          <InputRightElement
            w="fit-content"
            bg="rgba(255, 255, 255, 0.3)"
          >
              <Button type="submit">Send</Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      
    </form>
  );
}

export default ChatForm;
