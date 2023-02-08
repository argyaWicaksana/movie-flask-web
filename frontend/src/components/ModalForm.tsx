import {
    Modal, ModalOverlay, ModalContent,
    ModalHeader, ModalBody, ModalCloseButton,
    ModalFooter, FormControl, FormLabel,
    Textarea, Button, Select,
    useDisclosure
} from "@chakra-ui/react"
import React from 'react'

interface Movie {
  _id: { $oid: '' },
  rating: 1 | 2 | 3 | 4 | 5,
  comment: string
}

export default function ModalForm({ children, colorScheme, dataMovie, reload, changeAlert }: any) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [data, setData] = React.useState<Movie>(dataMovie)

    const handleChangeRating = (e: any) => {
        setData({
            ...data,
            rating: e.target.value
        })
    }

    const handleChangeComment = (e: any) => {
        setData({
            ...data,
            comment: e.target.value
        })
    }

    async function updateMovie(e: any) {
        e.preventDefault()
        try {
            const rawResp = await fetch('http://localhost:5000/movie/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: data._id.$oid,
                    rating: data.rating,
                    comment: data.comment
                })
            })
            const response = await rawResp.json()
            changeAlert({
                ...response,
                status: 'success'
            })
        } catch (error: any) {
            changeAlert({
                msg: error.message,
                status: 'error'
            })
        }

        reload()
    }

    return (
        <>
            <Button onClick={onOpen} colorScheme={colorScheme}>{children}</Button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent as='form' onSubmit={updateMovie}>
                    <ModalHeader>Update Form</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Rating</FormLabel>
                            <Select value={data.rating} onChange={handleChangeRating}>
                                <option value={1}>⭐</option>
                                <option value={2}>⭐⭐</option>
                                <option value={3}>⭐⭐⭐</option>
                                <option value={4}>⭐⭐⭐⭐</option>
                                <option value={5}>⭐⭐⭐⭐⭐</option>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Comment</FormLabel>
                            <Textarea value={data.comment} onChange={handleChangeComment}></Textarea>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter gap='10px'>
                        <Button onClick={onClose} type="submit" bgColor='black' _hover={{ color: 'whiteAlpha.800' }} color='white'>Submit</Button>
                        <Button variant='ghost' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>

            </Modal>
        </>
    )
}