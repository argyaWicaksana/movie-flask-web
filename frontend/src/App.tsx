import { useState, useEffect } from 'react'
import MovieCard from './components/MovieCard'
import Form from './components/Form'
import {
  Flex, Button, Heading,
  SimpleGrid, Stack, Alert,
  AlertIcon, useDisclosure
} from '@chakra-ui/react';
import './App.css'

interface AlertData {
  show: boolean,
  msg: string,
  status: 'success' | 'error'
}

function Header(props: any) {
  const buttonHover = {
    color: 'black',
    border: 'solid 1px black',
    bgColor: 'white'
  }
  return (
    <Flex flexDir='column'
      justify='center'
      align='center'
      height={250}
      color='white'
      bgImg='linear-gradient(0deg, rgba(0, 0, 0, 0.5), 
      rgba(0, 0, 0, 0.5)), url("../public/images/bg-header.jpg")'
      bgPos='center'
      bgSize='cover'
      gap={5}
    >
      <Heading as='h1' fontFamily="'Quicksand', sans-serif">My Favorite Movies</Heading>
      <Button onClick={props.onClick} px={12} py={6} borderRadius='3xl' variant='outline' _hover={buttonHover}>Save movie</Button>
    </Flex>
  )
}

function App() {
  const [shown, setShown] = useState<boolean>(false)
  const [movies, setMovies] = useState([{
    _id: { $oid: '' }
  }])
  const [alert, setAlert] = useState<AlertData>({
    show: false,
    msg: '',
    status: 'error'
  })

  function changeAlert(data: Omit<AlertData, 'show'>) {
    setAlert({
      ...data,
      show: true
    })

    setTimeout(() => {
      setAlert({
        show: false,
        msg: '',
        status: 'error'
      })
    }, 3000);
  }

  async function getMovies() {
    try {
      const response = await fetch('http://localhost:5000/movie')

      setMovies(await response.json())
    } catch (error: any) {
      console.log(error.message)
    }
  }

  useEffect(() => { getMovies() }, [])

  return (
    <Stack spacing='40px'>
      {
        alert.show &&
        <Alert zIndex={'overlay'} position='fixed' status={alert.status}>
          <AlertIcon />
          {alert.msg}
        </Alert>
      }
      <Header onClick={() => setShown(!shown)} />
      {shown && <Form onCancel={() => setShown(false)} reload={getMovies} changeAlert={changeAlert} />}
      <Flex justify='center'>
        <SimpleGrid minChildWidth='280px' width='95%' maxW='1200px' spacing='25px'>
          {
            movies.map((m) => (
              <MovieCard key={m._id.$oid} movie={m} reload={getMovies} changeAlert={changeAlert} />
            ))
          }
        </SimpleGrid>
      </Flex>
    </Stack>
  )
}

export default App
