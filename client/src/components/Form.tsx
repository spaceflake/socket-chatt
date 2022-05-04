import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { ServerToClientEvents, ClientToServerEvents } from '../../../types'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'

interface formProps {
  socket?: Socket<ServerToClientEvents, ClientToServerEvents>
  setIsOnline?: Dispatch<SetStateAction<boolean>>
}
type Inputs = {
  input: string
}

function Form({ socket, setIsOnline }: formProps) {
  const { register, handleSubmit, watch } = useForm<Inputs>()

  // console.log(watch('input'))

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
    if (socket) {
      socket.auth = { nickname: data.input }
      socket.connect()
    }

    setIsOnline && setIsOnline(true)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel htmlFor="input">Enter your nickname, stupid!</FormLabel>
        <Input
          type="text"
          id="input"
          autoComplete="off"
          {...register('input')}
        />
      </FormControl>
      <Button type="submit" w="full" variant="solid">
        Send
      </Button>
    </form>
  )
}

export default Form
