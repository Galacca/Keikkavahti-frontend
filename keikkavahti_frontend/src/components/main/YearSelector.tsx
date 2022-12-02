import { Center, Select } from "@chakra-ui/react"
import { Field, FieldProps } from "formik"
import { getCurrentYear, getYears } from "../../utils/DateUtils"

const YearSelector = () => {
    
return (
    <Center>
        <Field>
            {({ field }: FieldProps) => (
        <Select name='year' defaultValue={getCurrentYear(0)} variant={'outline'} borderColor={'teal.400'} maxW={'30%'} _hover={{ bg: 'teal.500', }} onChange={field.onChange}>
            {getYears()}
        </Select>
        )}
        </Field>
    </Center>
)
}

export default YearSelector