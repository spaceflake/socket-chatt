import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { ServerToClientEvents, ClientToServerEvents } from '../../../types'
import { useForm, SubmitHandler } from 'react-hook-form'

interface formProps {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>
  active: Dispatch<SetStateAction<boolean>>
}
type Inputs = {
  input: string
}

function Form(props: formProps) {
  const socket = props.socket
  const active = props.active

  const { register, handleSubmit, watch } = useForm<Inputs>()

  // console.log(watch('input'))

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
    socket.auth = { nickname: data.input }
    socket.connect()

    active(true)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="form">
      <input type="text" id="input" autoComplete="off" {...register('input')} />
      <button type="submit">Send</button>
    </form>
  )
}

export default Form
