import { useState, useEffect } from 'react'
import MovieCard from './components/MovieCard'
import Form from './components/Form'
import {
  Flex, Button, Heading,
  SimpleGrid, Stack
} from '@chakra-ui/react';
import './App.css'

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
      rgba(0, 0, 0, 0.5)), url("https://movie-phinf.pstatic.net/20210715_95/1626338192428gTnJl_JPEG/movie_image.jpg")'
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

  async function getMovies() {
    const response = await fetch('http://localhost:5000/movie')
    
    setMovies(await response.json())
  }

  useEffect(()=>{ getMovies() }, [])

  return (
    <Stack spacing='40px'>
      <Header onClick={()=> setShown(!shown)}/>
      { shown && <Form /> }
      <Flex justify='center'>
        <SimpleGrid minChildWidth='280px' width='95%' maxW='1200px' spacing='25px'>
          {
            movies.map((m)=> (
              <MovieCard key={m._id.$oid} movie={m}/>
            ))
          }
        </SimpleGrid>
      </Flex>
    </Stack>
  )
}

export default App
