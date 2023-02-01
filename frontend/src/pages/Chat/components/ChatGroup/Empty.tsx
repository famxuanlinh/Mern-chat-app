import { Box } from '@chakra-ui/react'
import React from 'react'

const Empty = () => {
  return (
    <Box minHeight={"220px"} display="flex" justifyContent={"center"} alignItems="center">No selected user yet!</Box>
  )
}

export default Empty