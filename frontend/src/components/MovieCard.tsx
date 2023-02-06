import {
  Image, Card, CardBody,
  CardFooter, Stack, Heading,
  Text, Button, ButtonGroup
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

interface Movie {
  image: string,
  title: string,
  desc: string,
  rating: 1 | 2 | 3 | 4 | 5,
  comment: string
}

export default function MovieCard(props: any) {
  const movie: Movie = props.movie

  return (
    <Card maxW='sm' _hover={{ shadow: 'xl' }} borderWidth='1px' borderColor='blackAlpha.300'>
      <CardBody>
        <Image src={movie.image}
          alt='Test' borderRadius='lg' />
        <Stack mt='5' spacing={6}>
          <Heading size='md'>{movie.title}</Heading>
          <Text noOfLines={3}>{movie.desc}</Text>
          <Stack>
            <Text>{'⭐'.repeat(movie.rating)}</Text>
            <Text color='gray.500'>{movie.comment}</Text>
          </Stack>
        </Stack>
      </CardBody>
      <CardFooter>
        <ButtonGroup>
          <Button colorScheme='blue'><EditIcon /></Button>
          <Button colorScheme='red'><DeleteIcon /></Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}