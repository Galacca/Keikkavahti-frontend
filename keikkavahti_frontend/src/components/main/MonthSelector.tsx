import { Center, Select } from "@chakra-ui/react"
import { Field, FieldProps } from "formik"
import { getCurrentMonthNumeric, getFinnishMonths } from "../../utils/DateUtils"

const MonthSelector = () => {
    
return (
    <Center>
        <Field>
            {({ field }: FieldProps) => (
        <Select name='month' mb={2} defaultValue={getCurrentMonthNumeric()} variant={'outline'} borderColor={'teal.400'} maxW={'30%'} _hover={{ bg: 'teal.500', }} onChange={field.onChange}>
            {getFinnishMonths()}
        </Select>
        )}
        </Field>
    </Center>
)
}

export default MonthSelector