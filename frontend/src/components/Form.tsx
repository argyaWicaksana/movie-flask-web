import {
    FormControl, FormLabel, Input,
    Select, Flex, Stack,
    Button, ButtonGroup
} from "@chakra-ui/react";

export default function Form() {
    return (
        <Flex justify='center'>
            <Stack width='95%' maxW='500px'
                borderWidth='1px' borderColor='blackAlpha.300'
                shadow='sm' p='30px'
                gap='10px'
            >
                <FormControl>
                    <FormLabel>Movie URL</FormLabel>
                    <Input type='text' />
                </FormControl>
                <FormControl>
                    <FormLabel>Rating</FormLabel>
                    <Select placeholder="Select a rating">
                        <option value="1">⭐</option>
                        <option value="2">⭐⭐</option>
                        <option value="3">⭐⭐⭐</option>
                        <option value="4">⭐⭐⭐⭐</option>
                        <option value="5">⭐⭐⭐⭐⭐</option>
                    </Select>
                </FormControl>
                <ButtonGroup colorScheme='blue'>
                    <Button type="submit">Submit</Button>
                    <Button variant='ghost'>Cancel</Button>
                </ButtonGroup>
            </Stack>
        </Flex>
    )
}