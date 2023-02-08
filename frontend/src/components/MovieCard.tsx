import {
  Image, Card, CardBody,
  CardFooter, Stack, Heading,
  Text, Button, ButtonGroup
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { useState } from 'react'
import ModalForm from './ModalForm'

interface Movie {
  _id: { $oid: '' },
  image: string,
  title: string,
  desc: string,
  rating: 1 | 2 | 3 | 4 | 5,
  comment: string
}

export default function MovieCard(props: any) {
  const movie: Movie = props.movie
  const movieId: string = movie._id.$oid
  const [linesShowed, setLinesShowed] = useState<3 | undefined>(3)

  const onMoreOrLess = () => {
    if (linesShowed) setLinesShowed(undefined)
    else setLinesShowed(3)
  }

  async function deleteMovie() {
    try {
      const rawResp = await fetch('http://localhost:5000/movie/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: movieId
        })
      })
      const response = await rawResp.json()
      props.changeAlert({
        ...response,
        status: 'success'
      })
    } catch (error: any) {
      props.changeAlert({
        msg: error.message,
        status: 'error'
      })
    }

    props.reload()
  }

  return (
    <Card maxW='sm' _hover={{ shadow: 'xl' }} borderWidth='1px' borderColor='blackAlpha.300'>
      <CardBody>
        <Image src={movie.image}
          alt='Movie Image' borderRadius='lg' />
        <Stack mt='5' spacing={6}>
          <Heading size='md'>{movie.title}</Heading>
          <div>
            <Text noOfLines={linesShowed}>{movie.desc}</Text>
            <Button onClick={onMoreOrLess} variant='link' colorScheme='blue'>
              {linesShowed ? 'Read more' : 'Show less'}
            </Button>
          </div>
          <Stack>
            <Text>{'⭐'.repeat(movie.rating)}</Text>
            <Text color='gray.500'>{movie.comment}</Text>
          </Stack>
        </Stack>
      </CardBody>
      <CardFooter>
        <ButtonGroup>
          <ModalForm changeAlert={props.changeAlert} reload={props.reload} colorScheme='blue' dataMovie={movie}><EditIcon /></ModalForm>
          <Button colorScheme='red' onClick={deleteMovie}><DeleteIcon /></Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}