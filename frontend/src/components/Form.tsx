import {
    FormControl, FormLabel, Input,
    Select, Flex, Stack,
    Button, ButtonGroup, Textarea
} from "@chakra-ui/react";
import { useState } from "react"

export default function Form({ reload, onCancel }: any) {
    const [data, setData] = useState({
        url: '',
        rating: '',
        comment: ''
    })

    const handleChange = (field: 'url' | 'rating' | 'comment', e: any) => {
        setData({
            ...data,
            [field]: e.target.value
        })
    }

    async function saveMovie(e: any) {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:5000/movie', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    url: data.url,
                    rating: data.rating,
                    comment: data.comment
                })
            })
            const resp: { msg: string } = await response.json()
            console.log(resp)
        } catch (error) {
            console.log(error)
        }

        reload()
    }

    return (
        <Flex justify='center'>
            <Stack as='form' width='95%' maxW='500px'
                borderWidth='1px' borderColor='blackAlpha.300'
                shadow='sm' p='30px'
                gap='10px'
                onSubmit={saveMovie}
            >
                <FormControl>
                    <FormLabel>Movie URL</FormLabel>
                    <Input type='text' value={data.url} onChange={(e) => handleChange('url', e)} />
                </FormControl>
                <FormControl>
                    <FormLabel>Rating</FormLabel>
                    <Select value={data.rating} placeholder="Select a rating" onChange={(e) => handleChange('rating', e)}>
                        <option value='1'>⭐</option>
                        <option value='2'>⭐⭐</option>
                        <option value='3'>⭐⭐⭐</option>
                        <option value='4'>⭐⭐⭐⭐</option>
                        <option value='5'>⭐⭐⭐⭐⭐</option>
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>Comment</FormLabel>
                    <Textarea
                        placeholder="Write your comment here ^^"
                        value={data.comment}
                        onChange={(e) => handleChange('comment', e)}
                    />
                </FormControl>
                <ButtonGroup>
                    <Button type="submit" bgColor='black' _hover={{ color: 'whiteAlpha.800' }} color='white'>Submit</Button>
                    <Button onClick={onCancel} variant='ghost'>Cancel</Button>
                </ButtonGroup>
            </Stack>
        </Flex>
    )
}